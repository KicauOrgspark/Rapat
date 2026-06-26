<script lang="ts">
	import { authStore } from '$lib/core/auth/auth.store.svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import { Hash, Lock, AlertCircle } from 'lucide-svelte';

	let nomorInduk = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);

	// Redirect if already logged in
	if (authStore.isAuthenticated) {
		window.location.href = '/';
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		const result = await authStore.login(nomorInduk, password);

		if (result.success) {
			goto('/');
		} else {
			error = result.error || 'Nomor Induk atau password salah';
			isLoading = false;
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-canvas px-4">
	<div class="w-full max-w-sm">
		<!-- Logo/Wordmark -->
		<div class="mb-8 text-center">
			<h1 class="font-display text-display-sm text-ink">EduRapat</h1>
			<p class="mt-2 text-body-sm text-muted">Masuk untuk melanjutkan</p>
		</div>

		<!-- Login Form -->
		<form onsubmit={handleSubmit} class="space-y-4">
			{#if error}
				<div
					class="flex items-center gap-2 rounded-md bg-error/10 px-4 py-3 text-body-sm text-error"
				>
					<AlertCircle class="h-4 w-4 shrink-0" />
					<span>{error}</span>
				</div>
			{/if}

			<div>
				<label for="nomorInduk" class="mb-1.5 block text-body-sm font-medium text-ink"> Nomor Induk </label>
				<div class="relative">
					<Hash class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
					<input
						id="nomorInduk"
						type="text"
						bind:value={nomorInduk}
						required
						placeholder="Masukkan Nomor Induk"
						class="w-full rounded-md border border-hairline bg-canvas py-3 pl-10 pr-4 text-body-md text-ink placeholder:text-muted-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
					/>
				</div>
			</div>

			<div>
				<label for="password" class="mb-1.5 block text-body-sm font-medium text-ink">
					Password
				</label>
				<div class="relative">
					<Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						placeholder="Masukkan password"
						class="w-full rounded-md border border-hairline bg-canvas py-3 pl-10 pr-4 text-body-md text-ink placeholder:text-muted-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
					/>
				</div>
			</div>

			<Button type="submit" fullWidth loading={isLoading} disabled={isLoading}>
				{#if isLoading}
					<LoadingSpinner size="sm" class="mr-2" />
				{/if}
				Masuk
			</Button>
		</form>

		<!-- Demo credentials hint -->
		<div class="mt-6 rounded-md bg-surface-card p-4 text-center">
			<p class="text-caption text-muted">
				<strong class="text-ink">Demo:</strong><br />
				12345678<br />
				password
			</p>
		</div>
	</div>
</div>

