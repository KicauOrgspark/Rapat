<script lang="ts">
	import { onMount } from 'svelte';
	import { getHomeData } from '$lib/features/home/home.api';
	import type { Meeting } from '$lib/features/meetings/meetings.types';
	import GreetingCard from '$lib/features/home/components/GreetingCard.svelte';
	import TodayMeetingCard from '$lib/features/home/components/TodayMeetingCard.svelte';
	import UpcomingList from '$lib/features/home/components/UpcomingList.svelte';

	let todayMeeting = $state<Meeting | null>(null);
	let upcomingMeetings = $state<Meeting[]>([]);

	onMount(() => {
		const data = getHomeData();
		todayMeeting = data.todayMeeting;
		upcomingMeetings = data.upcomingMeetings;
	});
</script>

<div class="animate-fade-in">
	<GreetingCard />

	<div class="mt-6">
		<TodayMeetingCard meeting={todayMeeting} />
	</div>

	<div class="mt-8">
		<UpcomingList meetings={upcomingMeetings} />
	</div>
</div>
