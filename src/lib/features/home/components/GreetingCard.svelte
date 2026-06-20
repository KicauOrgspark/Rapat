<script lang="ts">
	import { authStore } from '$lib/core/auth/auth.store.svelte';
	import { formatDate, getGreeting } from '$lib/core/utils/date';
	import { formatName } from '$lib/core/utils/format';

	const greeting = getGreeting();
	const currentDate = formatDate(new Date());

	const displayName = $derived(
		authStore.currentUser
			? formatName(authStore.currentUser.title, authStore.currentUser.name.split(',')[0])
			: ''
	);
</script>

<div
	class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-canvas to-surface-soft px-4 py-8"
>
	<!-- Decorative background element -->
	<div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5"></div>
	<div class="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/3"></div>

	<div class="relative animate-fade-in">
		<p class="text-body-sm text-muted">Hari ini</p>
		<h1 class="mt-1 font-display text-display-md text-ink">
			{greeting}, {displayName}
		</h1>
		<p class="mt-2 text-body-sm text-body capitalize">{currentDate}</p>
	</div>
</div>
