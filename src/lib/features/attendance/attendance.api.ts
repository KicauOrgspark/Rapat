import { mockAttendanceRecords, mockAttendanceStats } from '$lib/core/mock/data';
import type { CalendarDay, AttendanceStats } from './attendance.types';
import {
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	getDay,
	isSameMonth,
	isSameDay,
	addMonths
} from 'date-fns';

export async function getAttendanceByMonth(year: number, month: number): Promise<CalendarDay[]> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const targetDate = new Date(year, month, 1);
	const start = startOfMonth(targetDate);
	const end = endOfMonth(targetDate);

	// Adjust to start from Monday
	const startDay = getDay(start);
	const adjustedStart = startDay === 0 ? new Date(start.getTime() - 6 * 86400000) : start;

	const days = eachDayOfInterval({ start: adjustedStart, end });

	return days.map((date) => {
		const record = mockAttendanceRecords.find((r) => isSameDay(new Date(r.date), date));
		return {
			date,
			status: record?.status,
			isCurrentMonth: isSameMonth(date, targetDate)
		};
	});
}

export async function getAttendanceStats(): Promise<AttendanceStats> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	return { ...mockAttendanceStats };
}

export { addMonths };
