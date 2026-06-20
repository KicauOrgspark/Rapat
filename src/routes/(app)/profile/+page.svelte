<script lang="ts">
	import { authStore } from '$lib/core/auth/auth.store.svelte';
	import { getInitials } from '$lib/core/utils/format';
	import { goto } from '$app/navigation';
	import { Hash, Phone, BookOpen, User as UserIcon, LogOut, Info } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const user = $derived(authStore.currentUser);
	const initials = $derived(user ? getInitials(user.name) : '');

	function handleLogout() {
		authStore.logout();
		goto('/login');
	}
</script>

<div class="animate-fade-in">
	<div class="px-4 py-6">
		<h1 class="font-display text-display-sm text-ink">Profil Saya</h1>
	</div>

	{#if user}
		<div class="px-4 space-y-6 pb-4">
			<!-- Avatar & Name -->
			<div class="flex flex-col items-center text-center">
				<div
					class="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-medium text-on-primary"
				>
					{initials}
				</div>
				<h2 class="mt-4 text-title-lg text-ink">
					{user.title === 'Ibu' ? 'Ibu' : 'Bapak'}
					{user.name}
				</h2>
			</div>

			<!-- Info Cards -->
			<div class="rounded-lg border border-hairline bg-surface-card">
				<div class="flex items-center gap-3 border-b border-hairline px-4 py-3.5">
					<Hash class="h-5 w-5 text-primary shrink-0" />
					<div>
						<p class="text-caption text-muted">NIG</p>
						<p class="text-body-md text-ink">{user.nig}</p>
					</div>
				</div>

				<div class="flex items-center gap-3 border-b border-hairline px-4 py-3.5">
					<Phone class="h-5 w-5 text-primary shrink-0" />
					<div>
						<p class="text-caption text-muted">No. HP</p>
						<p class="text-body-md text-ink">{user.phone}</p>
					</div>
				</div>

				<div class="flex items-center gap-3 border-b border-hairline px-4 py-3.5">
					<BookOpen class="h-5 w-5 text-primary shrink-0" />
					<div>
						<p class="text-caption text-muted">Mata Pelajaran</p>
						<p class="text-body-md text-ink">{user.subjects.join(', ')}</p>
					</div>
				</div>

				<div class="flex items-center gap-3 px-4 py-3.5">
					<UserIcon class="h-5 w-5 text-primary shrink-0" />
					<div>
						<p class="text-caption text-muted">ID Pengguna</p>
						<p class="text-body-md text-ink">{user.id}</p>
					</div>
				</div>
			</div>

			<!-- Admin notice -->
			<div class="flex items-start gap-3 rounded-lg bg-surface-soft p-4">
				<Info class="h-5 w-5 text-muted shrink-0 mt-0.5" />
				<p class="text-body-sm text-muted">
					Data profil ini dikelola oleh admin sekolah. Jika ada perubahan data, silakan hubungi
					admin.
				</p>
			</div>

			<!-- Logout -->
			<Button variant="secondary" fullWidth onclick={handleLogout}>
				<LogOut class="h-4 w-4" />
				Keluar
			</Button>
		</div>
	{/if}
</div>
