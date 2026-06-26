<script lang="ts">
	import { onMount } from 'svelte';
	import { getHomeData } from '$lib/features/home/home.api';
	import type { Meeting } from '$lib/features/meetings/meetings.types';
	import GreetingCard from '$lib/features/home/components/GreetingCard.svelte';
	import TodayMeetingCard from '$lib/features/home/components/TodayMeetingCard.svelte';
	import UpcomingList from '$lib/features/home/components/UpcomingList.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';

	let todayMeeting = $state<Meeting | null>(null);
	let upcomingMeetings = $state<Meeting[]>([]);
	let isLoading = $state(true);

	onMount(async () => {
		try {
			const data = await getHomeData();
			todayMeeting = data.todayMeeting;
			upcomingMeetings = data.upcomingMeetings;
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="animate-fade-in">
	<GreetingCard />

	{#if isLoading}
		<LoadingSpinner class="py-12" />
	{:else}
		<div class="mt-6">
			<TodayMeetingCard meeting={todayMeeting} />
		</div>

		<div class="mt-8">
			<UpcomingList meetings={upcomingMeetings} />
		</div>
	{/if}
</div>
