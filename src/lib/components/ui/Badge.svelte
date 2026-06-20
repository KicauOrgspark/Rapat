<script lang="ts">
	import { cn } from '$lib/core/utils/helpers';

	interface Props {
		variant?: 'default' | 'coral' | 'success' | 'warning' | 'error' | 'info';
		children: import('svelte').Snippet;
		class?: string;
	}

	let { variant = 'default', children, class: className }: Props = $props();

	const variantClasses: Record<string, string> = {
		default: 'bg-surface-card text-ink',
		coral: 'bg-primary text-on-primary',
		success: 'bg-success text-on-primary',
		warning: 'bg-warning text-on-primary',
		error: 'bg-error text-on-primary',
		info: 'bg-accent-teal text-on-primary'
	};
</script>

<span
	class={cn(
		'inline-flex items-center rounded-pill px-3 py-1 text-caption font-medium',
		variantClasses[variant],
		className
	)}
>
	{@render children()}
</span>
