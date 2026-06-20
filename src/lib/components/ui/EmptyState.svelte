<script lang="ts">
	import { cn } from '$lib/core/utils/helpers';
	import Button from './Button.svelte';

	interface Props {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: any;
		title: string;
		description?: string;
		actionLabel?: string;
		onAction?: () => void;
		class?: string;
	}

	let {
		icon: IconComponent,
		title,
		description,
		actionLabel,
		onAction,
		class: className
	}: Props = $props();
</script>

<div class={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
	{#if IconComponent}
		<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-card">
			<IconComponent class="h-8 w-8 text-muted-soft" />
		</div>
	{/if}
	<h3 class="text-title-md text-ink">{title}</h3>
	{#if description}
		<p class="mt-2 max-w-xs text-body-sm text-muted">{description}</p>
	{/if}
	{#if actionLabel}
		<Button class="mt-6" onclick={onAction}>
			{actionLabel}
		</Button>
	{/if}
</div>
