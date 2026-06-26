<script lang="ts">
	import type { User } from '$lib/core/auth/auth.types';
	import { authStore } from '$lib/core/auth/auth.store.svelte';
	import { LogOut, User as UserIcon } from 'lucide-svelte';

	interface Props {
		user: User;
		onClose: () => void;
	}

	let { user, onClose }: Props = $props();

	function handleLogout() {
		authStore.logout();
		onClose();
		window.location.href = '/login';
	}

	function handleProfile() {
		onClose();
		window.location.href = '/profile';
	}
</script>

<div
	class="absolute right-0 top-full mt-2 w-64 rounded-lg border border-hairline bg-surface-card shadow-lg animate-slide-up z-20"
>
	<div class="border-b border-hairline p-4">
		<p class="text-title-sm text-ink">{user.title ? (user.title === 'Ibu' ? 'Bu ' : 'Pak ') : ''}{user.name}</p>
		<p class="mt-0.5 text-body-sm text-muted truncate">{user.nomor_induk || user.nig || ''}</p>
	</div>

	<div class="p-2">
		<button
			class="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-body-sm text-body hover:bg-surface-soft transition-colors min-h-[44px]"
			onclick={handleProfile}
		>
			<UserIcon class="h-4 w-4 text-muted" />
			<span>Profil Saya</span>
		</button>
		<button
			class="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-body-sm text-error hover:bg-surface-soft transition-colors min-h-[44px]"
			onclick={handleLogout}
		>
			<LogOut class="h-4 w-4" />
			<span>Keluar</span>
		</button>
	</div>
</div>
