<script lang="ts">
	import type { MeetingNote } from '../notes.types';
	import { formatFullDate } from '$lib/core/utils/date';
	import { User, CalendarDays, ArrowLeft } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		note: MeetingNote;
		onBack: () => void;
	}

	let { note, onBack }: Props = $props();

	// Parse content into lines for rendering
	function parseContent(content: string): { type: 'heading' | 'text' | 'list'; text: string }[] {
		const lines = content.split('\n');
		const result: { type: 'heading' | 'text' | 'list'; text: string }[] = [];

		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed) continue;

			if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
				result.push({ type: 'heading', text: trimmed.replace(/\*\*/g, '') });
			} else if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
				result.push({ type: 'list', text: trimmed.slice(2) });
			} else if (/^\d+\.\s/.test(trimmed)) {
				result.push({ type: 'list', text: trimmed });
			} else {
				result.push({ type: 'text', text: trimmed.replace(/\*\*/g, '') });
			}
		}

		return result;
	}

	const contentLines = $derived(parseContent(note.content));
</script>

<div class="animate-fade-in">
	<!-- Back button -->
	<div class="sticky top-14 z-30 border-b border-hairline bg-canvas/95 backdrop-blur-sm px-4 py-3">
		<Button variant="ghost" size="sm" onclick={onBack}>
			<ArrowLeft class="h-4 w-4" />
			Kembali
		</Button>
	</div>

	<div class="px-4 py-6">
		<!-- Header -->
		<h1 class="font-display text-display-sm text-ink">{note.meetingTitle}</h1>

		<!-- Meta info -->
		<div class="mt-4 flex flex-wrap items-center gap-4 rounded-lg bg-surface-card p-4">
			<div class="flex items-center gap-2 text-body-sm text-muted">
				<CalendarDays class="h-4 w-4 text-primary" />
				<span>{formatFullDate(note.date)}</span>
			</div>
			<div class="flex items-center gap-2 text-body-sm text-muted">
				<User class="h-4 w-4 text-primary" />
				<span>{note.author}</span>
			</div>
		</div>

		<!-- Content -->
		<div class="mt-6 rounded-lg bg-surface-card p-5">
			<div class="space-y-2 text-body-md text-body">
				{#each contentLines as line (line.text)}
					{#if line.type === 'heading'}
						<h3 class="pt-3 text-title-sm text-ink font-medium">{line.text}</h3>
					{:else if line.type === 'list'}
						<p class="pl-4 text-body-md text-body">{line.text}</p>
					{:else}
						<p class="text-body-md text-body leading-relaxed">{line.text}</p>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Read-only notice -->
		<p class="mt-6 text-center text-caption text-muted-soft">
			Notulen ini bersifat read-only dan dikelola oleh admin sekolah.
		</p>
	</div>
</div>
