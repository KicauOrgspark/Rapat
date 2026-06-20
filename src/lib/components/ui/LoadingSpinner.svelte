<script lang="ts">
	import { cn } from '$lib/core/utils/helpers';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { size = 'md', class: className }: Props = $props();

	const sizeClasses: Record<string, string> = {
		sm: 'h-5 w-5',
		md: 'h-8 w-8',
		lg: 'h-12 w-12'
	};
</script>

<div class={cn('flex items-center justify-center', className)}>
	<div
		class={cn('rounded-full border-2 border-surface-card border-t-primary', sizeClasses[size])}
		style="animation: spin 0.8s linear infinite;"
	></div>
</div>
