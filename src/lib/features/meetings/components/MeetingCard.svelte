<script lang="ts">
	import type { Meeting } from '../meetings.types';
	import { cn } from '$lib/core/utils/helpers';
	import { formatShortDate, formatTime } from '$lib/core/utils/date';
	import { meetingStatusLabels, meetingStatusColors } from '$lib/core/constants/status';
	import { MapPin, Clock, CalendarDays } from 'lucide-svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	interface Props {
		meeting: Meeting;
		index?: number;
	}

	let { meeting, index = 0 }: Props = $props();

	const badgeVariant = $derived(
		meeting.status === 'mendatang'
			? 'coral'
			: meeting.status === 'selesai'
				? 'default'
				: meeting.status === 'berlangsung'
					? 'info'
					: 'error'
	);
</script>

<a
	href="/meetings/{meeting.id}"
	class="block rounded-lg border border-hairline bg-surface-card transition-colors hover:bg-surface-soft animate-slide-up"
	style="animation-delay: {index * 50}ms; animation-fill-mode: both;"
>
	<div class="flex overflow-hidden">
		<!-- Color accent bar -->
		<div
			class={cn('w-1 shrink-0', meeting.status === 'mendatang' ? 'bg-primary' : 'bg-muted-soft')}
		></div>

		<div class="flex-1 p-4">
			<div class="flex items-start justify-between gap-3">
				<h3 class="flex-1 text-title-sm text-ink line-clamp-2">{meeting.title}</h3>
				<Badge variant={badgeVariant}>
					{meetingStatusLabels[meeting.status]}
				</Badge>
			</div>

			<div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-body-sm text-muted">
				<span class="flex items-center gap-1.5">
					<CalendarDays class="h-3.5 w-3.5" />
					{formatShortDate(meeting.date)}
				</span>
				<span class="flex items-center gap-1.5">
					<Clock class="h-3.5 w-3.5" />
					{formatTime(meeting.startTime)}
				</span>
				<span class="flex items-center gap-1.5">
					<MapPin class="h-3.5 w-3.5" />
					<span class="truncate">{meeting.location}</span>
				</span>
			</div>
		</div>
	</div>
</a>
