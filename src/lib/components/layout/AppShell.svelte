<script lang="ts">
	import Navbar from './Navbar.svelte';
	import BottomNav from './BottomNav.svelte';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-screen bg-canvas">
	<Navbar />
	<main class="pb-20">
		{@render children()}
	</main>
	<BottomNav />
</div>
