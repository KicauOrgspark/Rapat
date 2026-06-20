<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/core/auth/auth.store.svelte';
	import AppShell from '$lib/components/layout/AppShell.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';

	let { children } = $props();
	let isChecking = $state(true);

	onMount(() => {
		authStore.checkSession();
		if (!authStore.isAuthenticated) {
			window.location.href = '/login';
			return;
		}
		isChecking = false;
	});
</script>

{#if isChecking}
	<div class="flex min-h-screen items-center justify-center bg-canvas">
		<LoadingSpinner size="lg" />
	</div>
{:else if authStore.isAuthenticated}
	<AppShell>
		{@render children()}
	</AppShell>
{/if}
