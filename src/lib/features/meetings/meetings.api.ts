import { http } from '$lib/core/api/http';
import type { Meeting, MeetingAttendee } from './meetings.types';
import type { AttendanceStatusType, MeetingStatusType } from '$lib/core/constants/status';

function mapBackendMeeting(backendMeeting: any): Meeting {
	let status: MeetingStatusType = 'mendatang';
	if (backendMeeting.status === 'berlangsung') {
		status = 'berlangsung';
	} else if (backendMeeting.status === 'selesai') {
		status = 'selesai';
	} else if (backendMeeting.status === 'dibatalkan') {
		status = 'dibatalkan';
	}

	const attendees: MeetingAttendee[] = (backendMeeting.peserta || []).map((p: any) => {
		const user = p.user || {};
		let status: AttendanceStatusType = 'belum_konfirmasi';
		if (p.status_kehadiran === 'hadir' || p.hadir) {
			status = 'hadir';
		} else if (p.status_kehadiran === 'izin') {
			status = 'izin';
		} else if (p.status_kehadiran === 'sakit') {
			status = 'sakit';
		} else if (p.status_kehadiran === 'tidak_hadir') {
			status = 'tidak_hadir';
		}
		
		return {
			userId: user.id ? String(user.id) : String(p.id),
			name: user.name || `Peserta ${p.id}`,
			status
		};
	});

	// Handle agenda: if not provided or empty, create a simple list from description
	let agendaList: string[] = [];
	if (backendMeeting.agenda && Array.isArray(backendMeeting.agenda)) {
		agendaList = backendMeeting.agenda;
	} else if (backendMeeting.deskripsi) {
		agendaList = [backendMeeting.deskripsi];
	} else {
		agendaList = ['Pembahasan Rapat'];
	}

	return {
		id: String(backendMeeting.id),
		title: backendMeeting.judul,
		description: backendMeeting.deskripsi || '',
		date: new Date(backendMeeting.waktu_mulai),
		startTime: new Date(backendMeeting.waktu_mulai),
		endTime: new Date(backendMeeting.waktu_selesai),
		location: backendMeeting.lokasi || 'Tidak Ada Lokasi',
		organizer: backendMeeting.dibuat_oleh?.name || 'Admin',
		status,
		agenda: agendaList,
		attendees
	};
}

export async function getMeetings(filter?: 'mendatang' | 'selesai' | 'semua'): Promise<Meeting[]> {
	try {
		const response = await http.get('/rapat');
		const backendMeetings = response.data?.data || [];
		const mappedMeetings = backendMeetings.map(mapBackendMeeting);

		if (filter === 'mendatang') {
			return mappedMeetings
				.filter((m: Meeting) => m.status === 'mendatang' || m.status === 'berlangsung')
				.sort((a: Meeting, b: Meeting) => b.date.getTime() - a.date.getTime());
		}

		if (filter === 'selesai') {
			return mappedMeetings
				.filter((m: Meeting) => m.status === 'selesai')
				.sort((a: Meeting, b: Meeting) => b.date.getTime() - a.date.getTime());
		}

		return mappedMeetings.sort(
			(a: Meeting, b: Meeting) => b.date.getTime() - a.date.getTime()
		);
	} catch (error) {
		console.error('Error fetching meetings:', error);
		return [];
	}
}

export async function getMeetingById(id: string): Promise<Meeting | null> {
	try {
		const [meetingRes, participantsRes] = await Promise.all([
			http.get(`/rapat/${id}`),
			http.get(`/rapat/${id}/peserta`).catch(() => ({ data: { data: [] } }))
		]);

		const backendMeeting = meetingRes.data?.data;
		if (!backendMeeting) return null;

		backendMeeting.peserta = participantsRes.data?.data || [];
		return mapBackendMeeting(backendMeeting);
	} catch (error) {
		console.error(`Error fetching meeting ${id}:`, error);
		return null;
	}
}

function getSessionUserId(): number | null {
	try {
		const stored = localStorage.getItem('edurapat_session');
		if (!stored) return null;
		const user = JSON.parse(stored);
		return user?.id ?? null;
	} catch {
		return null;
	}
}

async function updateAttendanceStatus(
	meetingId: string,
	userId: number,
	status: AttendanceStatusType
): Promise<{ success: boolean }> {
	await http.patch(`/rapat/${meetingId}/peserta/status`, {
		user_id: userId,
		status
	});
	return { success: true };
}

export async function confirmAttendance(
	meetingId: string,
	status: AttendanceStatusType,
	note?: string
): Promise<{ success: boolean }> {
	void note;
	try {
		if (status === 'hadir') {
			await http.post(`/rapat/${meetingId}/join`);
			return { success: true };
		}

		const userId = getSessionUserId();
		if (!userId) return { success: false };
		return await updateAttendanceStatus(meetingId, userId, status);
	} catch (error) {
		console.error('Error confirming attendance, trying fallback:', error);
		try {
			const userId = getSessionUserId();
			if (!userId) return { success: false };
			return await updateAttendanceStatus(meetingId, userId, status);
		} catch (fallbackError) {
			console.error('Fallback attendance confirmation failed:', fallbackError);
		}
		return { success: false };
	}
}


