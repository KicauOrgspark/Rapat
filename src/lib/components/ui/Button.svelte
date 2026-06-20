<script lang="ts">
	import { cn } from '$lib/core/utils/helpers';
	import { Loader2 } from 'lucide-svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		fullWidth?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (e: MouseEvent) => void;
		children: import('svelte').Snippet;
		class?: string;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		fullWidth = false,
		type = 'button',
		onclick,
		children,
		class: className
	}: Props = $props();

	const variantClasses: Record<string, string> = {
		primary:
			'bg-primary text-on-primary hover:bg-primary-active active:bg-primary-active disabled:bg-primary-disabled disabled:text-muted',
		secondary:
			'bg-canvas text-ink border border-hairline hover:bg-surface-soft active:bg-surface-card disabled:opacity-50',
		ghost:
			'bg-transparent text-ink hover:bg-surface-soft active:bg-surface-card disabled:opacity-50',
		danger: 'bg-error text-on-primary hover:opacity-90 active:opacity-80 disabled:opacity-50'
	};

	const sizeClasses: Record<string, string> = {
		sm: 'px-3 py-1.5 text-xs min-h-[36px]',
		md: 'px-5 py-3 text-button min-h-[44px]',
		lg: 'px-6 py-3.5 text-title-sm min-h-[48px]'
	};
</script>

<button
	{type}
	{disabled}
	class={cn(
		'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-canvas',
		variantClasses[variant],
		sizeClasses[size],
		fullWidth && 'w-full',
		(loading || disabled) && 'cursor-not-allowed',
		className
	)}
	onclick={disabled || loading ? undefined : onclick}
>
	{#if loading}
		<Loader2 class="h-4 w-4 animate-spin" />
	{/if}
	{@render children()}
</button>
