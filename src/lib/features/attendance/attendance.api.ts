import { getMeetings } from '$lib/features/meetings/meetings.api';
import type { CalendarDay, AttendanceStats } from './attendance.types';
import type { AttendanceStatusType } from '$lib/core/constants/status';
import {
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	getDay,
	isSameMonth,
	isSameDay,
	addMonths
} from 'date-fns';

function getCurrentUserId(): number | null {
	if (typeof window === 'undefined') return null;
	const stored = localStorage.getItem('edurapat_session');
	if (!stored) return null;
	try {
		const user = JSON.parse(stored);
		return user?.id;
	} catch {
		return null;
	}
}

export async function getAttendanceByMonth(year: number, month: number): Promise<CalendarDay[]> {
	const targetDate = new Date(year, month, 1);
	const start = startOfMonth(targetDate);
	const end = endOfMonth(targetDate);

	// Adjust to start from Monday
	const startDay = getDay(start);
	const adjustedStart = startDay === 0 ? new Date(start.getTime() - 6 * 86400000) : start;

	const days = eachDayOfInterval({ start: adjustedStart, end });

	const userId = getCurrentUserId();
	if (!userId) {
		return days.map((date) => ({
			date,
			status: undefined,
			isCurrentMonth: isSameMonth(date, targetDate)
		}));
	}

	const meetings = await getMeetings('selesai');

	return days.map((date) => {
		const dayMeetings = meetings.filter((m) => isSameDay(m.date, date));
		let status: AttendanceStatusType | undefined = undefined;

		for (const m of dayMeetings) {
			const attendee = m.attendees.find((a) => String(a.userId) === String(userId));
			if (attendee) {
				if (!status || attendee.status === 'hadir') {
					status = attendee.status;
				}
			}
		}

		return {
			date,
			status,
			isCurrentMonth: isSameMonth(date, targetDate)
		};
	});
}

export async function getAttendanceStats(): Promise<AttendanceStats> {
	const userId = getCurrentUserId();
	if (!userId) {
		return {
			totalMeetings: 0,
			hadir: 0,
			izin: 0,
			sakit: 0,
			tidakHadir: 0,
			percentage: 0
		};
	}

	const meetings = await getMeetings('selesai');
	
	let total = 0;
	let hadir = 0;
	let izin = 0;
	let sakit = 0;
	let tidakHadir = 0;

	for (const m of meetings) {
		const attendee = m.attendees.find((a) => String(a.userId) === String(userId));
		if (attendee) {
			total++;
			if (attendee.status === 'hadir') {
				hadir++;
			} else if (attendee.status === 'izin') {
				izin++;
			} else if (attendee.status === 'sakit') {
				sakit++;
			} else if (attendee.status === 'tidak_hadir') {
				tidakHadir++;
			}
		}
	}

	const percentage = total > 0 ? Math.round((hadir / total) * 100) : 0;

	return {
		totalMeetings: total,
		hadir,
		izin,
		sakit,
		tidakHadir,
		percentage
	};
}

export { addMonths };

