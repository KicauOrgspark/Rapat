<script lang="ts">
	import { authStore } from '$lib/core/auth/auth.store.svelte';
	import { getInitials } from '$lib/core/utils/format';
	import UserMenu from './UserMenu.svelte';

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	const initials = $derived(authStore.currentUser ? getInitials(authStore.currentUser.name) : '');
</script>

<header class="sticky top-0 z-40 h-14 border-b border-hairline bg-canvas">
	<div class="flex h-full items-center justify-between px-4">
		<a href="/" class="font-display text-title-lg text-ink"> EduRapat </a>

		{#if authStore.currentUser}
			<div class="relative">
				<button
					class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-on-primary transition-transform hover:scale-105 min-h-[44px] min-w-[44px]"
					onclick={toggleMenu}
					aria-label="Menu profil"
				>
					{initials}
				</button>

				{#if menuOpen}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div class="fixed inset-0 z-10" onclick={closeMenu}></div>
					<UserMenu user={authStore.currentUser} onClose={closeMenu} />
				{/if}
			</div>
		{/if}
	</div>
</header>
