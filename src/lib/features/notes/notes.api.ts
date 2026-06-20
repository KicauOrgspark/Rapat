import { mockNotes } from '$lib/core/mock/data';
import type { MeetingNote } from './notes.types';

export async function getNotes(): Promise<MeetingNote[]> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return [...mockNotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNoteById(id: string): Promise<MeetingNote | null> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	return mockNotes.find((n) => n.id === id) || null;
}
