import type { AttendanceStatusType } from '$lib/core/constants/status';

export interface AttendanceRecord {
	date: Date;
	meetingId: string;
	meetingTitle: string;
	status: AttendanceStatusType;
}

export interface AttendanceStats {
	totalMeetings: number;
	hadir: number;
	izin: number;
	sakit: number;
	tidakHadir: number;
	percentage: number;
}

export interface CalendarDay {
	date: Date;
	status?: AttendanceStatusType;
	isCurrentMonth: boolean;
}
