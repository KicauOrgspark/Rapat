import { http } from '$lib/core/api/http';
import { getMeetings, getMeetingById } from '$lib/features/meetings/meetings.api';
import type { MeetingNote } from './notes.types';

export async function getNotes(): Promise<MeetingNote[]> {
	try {
		const meetings = await getMeetings('semua');
		
		const notesPromises = meetings.map(async (m): Promise<MeetingNote | null> => {
			try {
				const res = await http.get(`/rapat/${m.id}/notulen`);
				const data = res.data?.data;
				if (!data || !data.isi_notulen) return null;
				
				return {
					id: `note_${m.id}`,
					meetingId: m.id,
					meetingTitle: m.title,
					date: m.date,
					content: data.isi_notulen,
					author: m.organizer
				};
			} catch {
				return null;
			}
		});

		const results = await Promise.all(notesPromises);
		return results
			.filter((n): n is MeetingNote => n !== null)
			.sort((a, b) => b.date.getTime() - a.date.getTime());
	} catch (error) {
		console.error('Error fetching notes:', error);
		return [];
	}
}

export async function getNoteById(id: string): Promise<MeetingNote | null> {
	try {
		const meetingId = id.startsWith('note_') ? id.replace('note_', '') : id;
		const [meeting, notulenRes] = await Promise.all([
			getMeetingById(meetingId),
			http.get(`/rapat/${meetingId}/notulen`)
		]);
		
		const data = notulenRes.data?.data;
		if (!meeting || !data) return null;
		
		return {
			id: `note_${meetingId}`,
			meetingId: meeting.id,
			meetingTitle: meeting.title,
			date: meeting.date,
			content: data.isi_notulen || 'Belum ada isi notulen.',
			author: meeting.organizer
		};
	} catch (error) {
		console.error(`Error fetching note by id ${id}:`, error);
		return null;
	}
}

