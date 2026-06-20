<script lang="ts">
	import { onMount } from 'svelte';
	import type { MeetingNote } from '$lib/features/notes/notes.types';
	import { getNotes } from '$lib/features/notes/notes.api';
	import NotesList from '$lib/features/notes/components/NotesList.svelte';
	import NotesViewer from '$lib/features/notes/components/NotesViewer.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import { FileText } from 'lucide-svelte';

	let notes = $state<MeetingNote[]>([]);
	let selectedNote = $state<MeetingNote | null>(null);
	let isLoading = $state(true);

	onMount(async () => {
		notes = await getNotes();
		isLoading = false;
	});

	function selectNote(note: MeetingNote) {
		selectedNote = note;
	}

	function goBack() {
		selectedNote = null;
	}
</script>

<div class="animate-fade-in">
	{#if selectedNote}
		<NotesViewer note={selectedNote} onBack={goBack} />
	{:else}
		<div class="px-4 py-6">
			<h1 class="font-display text-display-sm text-ink">Notulen Rapat</h1>
		</div>

		<div class="px-4 pb-4">
			{#if isLoading}
				<LoadingSpinner class="py-20" />
			{:else if notes.length === 0}
				<EmptyState
					icon={FileText}
					title="Belum ada notulen"
					description="Notulen rapat yang sudah selesai akan muncul di sini."
				/>
			{:else}
				<NotesList {notes} onSelect={selectNote} />
			{/if}
		</div>
	{/if}
</div>
