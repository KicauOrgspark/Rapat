<script lang="ts">
	import { cn } from '$lib/core/utils/helpers';

	interface Tab {
		label: string;
		value: string;
	}

	interface Props {
		tabs: Tab[];
		activeTab: string;
		onTabChange: (value: string) => void;
		class?: string;
	}

	let { tabs, activeTab = $bindable(), onTabChange, class: className }: Props = $props();
</script>

<div class={cn('flex gap-1 rounded-lg bg-surface-soft p-1', className)} role="tablist">
	{#each tabs as tab}
		<button
			role="tab"
			aria-selected={activeTab === tab.value}
			class={cn(
				'flex-1 rounded-md px-4 py-2.5 text-nav-link transition-all duration-150 min-h-[44px]',
				activeTab === tab.value
					? 'bg-surface-card text-ink shadow-sm font-medium'
					: 'text-muted hover:text-body-strong'
			)}
			onclick={() => onTabChange(tab.value)}
		>
			{tab.label}
		</button>
	{/each}
</div>
