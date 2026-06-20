<script lang="ts">
	import type { Meeting } from '$lib/features/meetings/meetings.types';
	import { formatShortDate, formatTime } from '$lib/core/utils/date';
	import { MapPin, Clock, ArrowRight, CalendarDays } from 'lucide-svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';

	interface Props {
		meetings: Meeting[];
	}

	let { meetings }: Props = $props();
</script>

<div class="px-4">
	<div class="flex items-center justify-between">
		<h2 class="text-title-lg text-ink">Rapat Mendatang</h2>
		{#if meetings.length > 0}
			<a href="/meetings" class="flex items-center gap-1 text-body-sm text-primary hover:underline">
				Lihat Semua
				<ArrowRight class="h-3.5 w-3.5" />
			</a>
		{/if}
	</div>

	{#if meetings.length > 0}
		<div class="mt-4 space-y-3">
			{#each meetings as meeting, i}
				<a
					href="/meetings/{meeting.id}"
					class="block rounded-lg border border-hairline bg-surface-card p-4 transition-colors hover:bg-surface-soft animate-slide-up"
					style="animation-delay: {i * 50}ms; animation-fill-mode: both;"
				>
					<div class="flex items-start justify-between gap-3">
						<div class="flex-1 min-w-0">
							<h3 class="text-title-sm text-ink truncate">{meeting.title}</h3>
							<div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-muted">
								<span class="flex items-center gap-1">
									<CalendarDays class="h-3.5 w-3.5" />
									{formatShortDate(meeting.date)}
								</span>
								<span class="flex items-center gap-1">
									<Clock class="h-3.5 w-3.5" />
									{formatTime(meeting.startTime)}
								</span>
								<span class="flex items-center gap-1">
									<MapPin class="h-3.5 w-3.5" />
									<span class="truncate">{meeting.location}</span>
								</span>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<EmptyState
			icon={CalendarDays}
			title="Belum ada rapat mendatang"
			description="Rapat yang dijadwalkan akan muncul di sini."
		/>
	{/if}
</div>
