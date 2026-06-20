<script lang="ts">
	import type { MeetingNote } from '../notes.types';
	import { formatFullDate } from '$lib/core/utils/date';
	import { truncate } from '$lib/core/utils/format';
	import { FileText, User } from 'lucide-svelte';

	interface Props {
		notes: MeetingNote[];
		onSelect: (note: MeetingNote) => void;
	}

	let { notes, onSelect }: Props = $props();
</script>

<div class="space-y-3">
	{#each notes as note, i (note.id)}
		<button
			class="w-full rounded-lg border border-hairline bg-surface-card p-4 text-left transition-colors hover:bg-surface-soft animate-slide-up"
			style="animation-delay: {i * 50}ms; animation-fill-mode: both;"
			onclick={() => onSelect(note)}
		>
			<div class="flex items-start gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-soft">
					<FileText class="h-5 w-5 text-primary" />
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="text-title-sm text-ink line-clamp-2">{note.meetingTitle}</h3>
					<div class="mt-1.5 flex items-center gap-3 text-body-sm text-muted">
						<span>{formatFullDate(note.date)}</span>
						<span class="flex items-center gap-1">
							<User class="h-3.5 w-3.5" />
							{note.author}
						</span>
					</div>
					<p class="mt-2 text-body-sm text-muted line-clamp-2">
						{truncate(note.content.replace(/\*\*/g, '').replace(/\n/g, ' '), 100)}
					</p>
				</div>
			</div>
		</button>
	{/each}
</div>
