<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/core/utils/helpers';
	import { Home, Calendar, CheckCircle2, FileText } from 'lucide-svelte';

	const navItems = [
		{ label: 'Beranda', href: '/', icon: Home, pattern: /^\/$/ },
		{ label: 'Rapat', href: '/meetings', icon: Calendar, pattern: /^\/meetings/ },
		{ label: 'Absensi', href: '/attendance', icon: CheckCircle2, pattern: /^\/attendance/ },
		{ label: 'Notulen', href: '/notes', icon: FileText, pattern: /^\/notes/ }
	];

	const currentPath = $derived(page.url.pathname);

	function isActive(pattern: RegExp): boolean {
		return pattern.test(currentPath);
	}
</script>

<nav
	class="fixed bottom-0 left-0 right-0 z-40 border-t border-hairline bg-canvas pb-[env(safe-area-inset-bottom)]"
>
	<div class="flex h-16 items-center justify-around">
		{#each navItems as item}
			{@const Icon = item.icon}
			{@const active = isActive(item.pattern)}
			<a
				href={item.href}
				class={cn(
					'flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors min-h-[44px] min-w-[44px]',
					active ? 'text-primary' : 'text-muted'
				)}
			>
				<Icon class="h-5 w-5" />
				<span class="text-[11px] font-medium leading-none">{item.label}</span>
			</a>
		{/each}
	</div>
</nav>
