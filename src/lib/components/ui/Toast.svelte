<script lang="ts">
	import { toastStore } from './toast.store.svelte';
	import { cn } from '$lib/core/utils/helpers';
	import { CheckCircle, XCircle, Info, X } from 'lucide-svelte';

	const typeClasses: Record<string, string> = {
		success: 'bg-success',
		error: 'bg-error',
		info: 'bg-surface-dark'
	};

	const typeIcons: Record<string, typeof CheckCircle> = {
		success: CheckCircle,
		error: XCircle,
		info: Info
	};
</script>

<div
	class="fixed bottom-20 left-0 right-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none"
>
	{#each toastStore.toasts as toast (toast.id)}
		{@const typeClass = typeClasses[toast.type]}
		{@const Icon = typeIcons[toast.type]}
		<div
			class={cn(
				'pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg px-4 py-3 text-on-primary shadow-lg animate-slide-up',
				typeClass
			)}
		>
			<Icon class="h-5 w-5 shrink-0" />
			<span class="flex-1 text-body-sm">{toast.message}</span>
			<button
				class="shrink-0 rounded-full p-1 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
				onclick={() => toastStore.dismiss(toast.id)}
			>
				<X class="h-4 w-4" />
			</button>
		</div>
	{/each}
</div>
