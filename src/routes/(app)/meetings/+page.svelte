<script lang="ts">
	import { onMount } from 'svelte';
	import { meetingsStore } from '$lib/features/meetings/meetings.store.svelte';
	import MeetingFilterTabs from '$lib/features/meetings/components/MeetingFilterTabs.svelte';
	import MeetingCard from '$lib/features/meetings/components/MeetingCard.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import { Calendar, CalendarX } from 'lucide-svelte';

	onMount(() => {
		meetingsStore.load(meetingsStore.activeFilter);
	});

	function handleTabChange(value: string) {
		meetingsStore.setFilter(value as 'mendatang' | 'selesai' | 'semua');
	}

	const emptyTitle = $derived(
		meetingsStore.activeFilter === 'mendatang'
			? 'Belum ada rapat mendatang'
			: meetingsStore.activeFilter === 'selesai'
				? 'Belum ada rapat selesai'
				: 'Belum ada rapat'
	);

	const emptyDescription = $derived(
		meetingsStore.activeFilter === 'mendatang'
			? 'Rapat yang dijadwalkan akan muncul di sini.'
			: 'Riwayat rapat yang sudah selesai akan muncul di sini.'
	);
</script>

<div class="animate-fade-in">
	<div class="px-4 py-6">
		<h1 class="font-display text-display-sm text-ink">Rapat Saya</h1>
	</div>

	<div class="px-4">
		<MeetingFilterTabs activeTab={meetingsStore.activeFilter} onTabChange={handleTabChange} />
	</div>

	<div class="mt-4 px-4 pb-4">
		{#if meetingsStore.isLoading}
			<LoadingSpinner class="py-12" />
		{:else if meetingsStore.meetings.length === 0}
			<EmptyState
				icon={meetingsStore.activeFilter === 'mendatang' ? Calendar : CalendarX}
				title={emptyTitle}
				description={emptyDescription}
			/>
		{:else}
			<div class="space-y-3">
				{#each meetingsStore.meetings as meeting, i}
					<MeetingCard {meeting} index={i} />
				{/each}
			</div>
		{/if}
	</div>
</div>
