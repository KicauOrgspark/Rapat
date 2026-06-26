import { getMeetings } from '$lib/features/meetings/meetings.api';
import { isToday, isUpcoming } from '$lib/core/utils/date';
import type { Meeting } from '$lib/features/meetings/meetings.types';
import type { User } from '$lib/core/auth/auth.types';

export async function getHomeData(): Promise<{
	user: User | null;
	todayMeeting: Meeting | null;
	upcomingMeetings: Meeting[];
}> {
	let user = null;
	try {
		const stored = localStorage.getItem('edurapat_session');
		user = stored ? JSON.parse(stored) : null;
	} catch {
		user = null;
	}
	
	const allMeetings = await getMeetings('semua');
	
	const todayMeetings = allMeetings.filter((m) => isToday(m.date));
	const upcomingMeetings = allMeetings
		.filter((m) => isUpcoming(m.date) && !isToday(m.date))
		.sort((a, b) => a.date.getTime() - b.date.getTime())
		.slice(0, 3);

	return {
		user,
		todayMeeting: todayMeetings[0] || null,
		upcomingMeetings
	};
}

