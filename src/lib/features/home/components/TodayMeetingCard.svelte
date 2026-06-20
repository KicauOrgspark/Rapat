<script lang="ts">
	import type { Meeting } from '$lib/features/meetings/meetings.types';
	import { authStore } from '$lib/core/auth/auth.store.svelte';
	import { formatTimeRange } from '$lib/core/utils/date';
	import { formatName } from '$lib/core/utils/format';
	import { Calendar, MapPin, Clock, Users } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';

	interface Props {
		meeting: Meeting | null;
	}

	let { meeting }: Props = $props();

	const displayName = $derived(
		authStore.currentUser
			? formatName(authStore.currentUser.title, authStore.currentUser.name.split(',')[0])
			: ''
	);

	function viewDetail() {
		if (meeting) {
			goto(`/meetings/${meeting.id}`);
		}
	}
</script>

<div class="px-4">
	{#if meeting}
		<div class="rounded-lg bg-surface-dark p-5 text-on-dark">
			<div class="flex items-start justify-between gap-4">
				<div class="flex-1">
					<span
						class="inline-block rounded-pill bg-primary/20 px-2.5 py-0.5 text-caption text-primary"
					>
						Hari ini
					</span>
					<h2 class="mt-3 font-display text-title-lg text-on-dark">
						{meeting.title}
					</h2>
				</div>
			</div>

			<div class="mt-4 space-y-2">
				<div class="flex items-center gap-2 text-body-sm text-on-dark-soft">
					<Clock class="h-4 w-4" />
					<span>{formatTimeRange(meeting.startTime, meeting.endTime)}</span>
				</div>
				<div class="flex items-center gap-2 text-body-sm text-on-dark-soft">
					<MapPin class="h-4 w-4" />
					<span>{meeting.location}</span>
				</div>
				<div class="flex items-center gap-2 text-body-sm text-on-dark-soft">
					<Users class="h-4 w-4" />
					<span>{meeting.attendees.length} peserta diundang</span>
				</div>
			</div>

			<Button class="mt-5 w-full" onclick={viewDetail}>Lihat Detail Rapat</Button>
		</div>
	{:else}
		<div class="rounded-lg bg-surface-card p-6 text-center">
			<Calendar class="mx-auto h-10 w-10 text-muted-soft" />
			<p class="mt-3 text-title-md text-ink">Tidak ada rapat hari ini</p>
			<p class="mt-1 text-body-sm text-muted">Nikmati hari Anda, {displayName}!</p>
		</div>
	{/if}
</div>
