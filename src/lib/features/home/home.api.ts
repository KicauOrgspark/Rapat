import { mockMeetings, mockUser } from '$lib/core/mock/data';
import { isToday, isUpcoming } from '$lib/core/utils/date';

export function getHomeData() {
	const todayMeetings = mockMeetings.filter((m) => isToday(m.date));
	const upcomingMeetings = mockMeetings
		.filter((m) => isUpcoming(m.date) && !isToday(m.date))
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.slice(0, 3);

	return {
		user: mockUser,
		todayMeeting: todayMeetings[0] || null,
		upcomingMeetings
	};
}
