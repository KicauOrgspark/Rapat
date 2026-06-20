import type { CalendarDay, AttendanceStats } from './attendance.types';
import { getAttendanceByMonth, getAttendanceStats } from './attendance.api';

let calendarDays = $state<CalendarDay[]>([]);
let stats = $state<AttendanceStats | null>(null);
let currentMonth = $state(new Date());
let isLoading = $state(false);

export const attendanceStore = {
	get calendarDays() {
		return calendarDays;
	},
	get stats() {
		return stats;
	},
	get currentMonth() {
		return currentMonth;
	},
	get isLoading() {
		return isLoading;
	},

	async load() {
		isLoading = true;
		try {
			const [days, statsData] = await Promise.all([
				getAttendanceByMonth(currentMonth.getFullYear(), currentMonth.getMonth()),
				getAttendanceStats()
			]);
			calendarDays = days;
			stats = statsData;
		} finally {
			isLoading = false;
		}
	},

	setMonth(date: Date) {
		currentMonth = date;
		this.load();
	}
};
