import type { AttendanceStatusType, MeetingStatusType } from '$lib/core/constants/status';

export interface MeetingAttendee {
	userId: string;
	name: string;
	status: AttendanceStatusType;
}

export interface Meeting {
	id: string;
	title: string;
	description: string;
	date: Date;
	startTime: Date;
	endTime: Date;
	location: string;
	organizer: string;
	status: MeetingStatusType;
	agenda: string[];
	attendees: MeetingAttendee[];
}

export interface AttendanceConfirmation {
	meetingId: string;
	status: AttendanceStatusType;
	note?: string;
}
