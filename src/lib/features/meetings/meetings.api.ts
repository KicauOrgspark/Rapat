import { mockMeetings } from '$lib/core/mock/data';
import type { Meeting } from './meetings.types';
import type { AttendanceStatusType, MeetingStatusType } from '$lib/core/constants/status';

export async function getMeetings(filter?: MeetingStatusType | 'semua'): Promise<Meeting[]> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	if (!filter || filter === 'semua') {
		return [...mockMeetings].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	}

	return mockMeetings
		.filter((m) => m.status === filter)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getMeetingById(id: string): Promise<Meeting | null> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	return mockMeetings.find((m) => m.id === id) || null;
}

export async function confirmAttendance(
	meetingId: string,
	status: AttendanceStatusType,
	note?: string
): Promise<{ success: boolean }> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	void note;

	// Update mock data in-memory
	const meeting = mockMeetings.find((m) => m.id === meetingId);
	if (meeting) {
		const attendee = meeting.attendees.find((a) => a.userId === 'usr_001');
		if (attendee) {
			attendee.status = status;
		}
	}

	return { success: true };
}
