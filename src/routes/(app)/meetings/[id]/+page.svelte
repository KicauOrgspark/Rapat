<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getMeetingById } from '$lib/features/meetings/meetings.api';
	import type { Meeting } from '$lib/features/meetings/meetings.types';
	import MeetingDetail from '$lib/features/meetings/components/MeetingDetail.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { ArrowLeft, CalendarX } from 'lucide-svelte';

	let meeting = $state<Meeting | null>(null);
	let isLoading = $state(true);

	const meetingId = $derived(page.params.id);

	onMount(async () => {
		if (meetingId) {
			meeting = await getMeetingById(meetingId);
		}
		isLoading = false;
	});
</script>

<div class="animate-fade-in">
	<!-- Back button -->
	<div class="sticky top-14 z-30 border-b border-hairline bg-canvas/95 backdrop-blur-sm px-4 py-3">
		<Button variant="ghost" size="sm" onclick={() => goto('/meetings')}>
			<ArrowLeft class="h-4 w-4" />
			Kembali
		</Button>
	</div>

	{#if isLoading}
		<LoadingSpinner class="py-20" />
	{:else if !meeting}
		<EmptyState
			icon={CalendarX}
			title="Rapat tidak ditemukan"
			description="Rapat yang Anda cari tidak ada atau telah dihapus."
			actionLabel="Kembali ke Daftar Rapat"
			onAction={() => goto('/meetings')}
		/>
	{:else}
		<MeetingDetail {meeting} />
	{/if}
</div>
