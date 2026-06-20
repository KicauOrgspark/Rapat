<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '$lib/core/utils/helpers';
	import { X } from 'lucide-svelte';
	import Button from './Button.svelte';

	interface Props {
		open: boolean;
		onOpenChange: (open: boolean) => void;
		title: string;
		description?: string;
		confirmText?: string;
		cancelText?: string;
		variant?: 'default' | 'danger';
		onConfirm?: () => void;
		onCancel?: () => void;
		children?: import('svelte').Snippet;
	}

	let {
		open = $bindable(false),
		onOpenChange,
		title,
		description,
		confirmText = 'Konfirmasi',
		cancelText = 'Batal',
		variant = 'default',
		onConfirm,
		onCancel,
		children
	}: Props = $props();

	function handleConfirm() {
		onConfirm?.();
	}

	function handleCancel() {
		onCancel?.();
		onOpenChange(false);
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-surface-dark/60 backdrop-blur-sm animate-fade-in"
		/>
		<Dialog.Content
			class="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface-card p-6 shadow-lg animate-scale-in sm:w-full"
		>
			<div class="flex items-start justify-between gap-4">
				<div class="flex-1">
					<Dialog.Title class="text-title-lg text-ink">{title}</Dialog.Title>
					{#if description}
						<Dialog.Description class="mt-2 text-body-sm text-body">
							{description}
						</Dialog.Description>
					{/if}
				</div>
				<Dialog.Close
					class="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-surface-soft hover:text-ink transition-colors"
				>
					<X class="h-5 w-5" />
				</Dialog.Close>
			</div>

			{#if children}
				<div class="mt-4">
					{@render children()}
				</div>
			{/if}

			<div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				<Button variant="ghost" onclick={handleCancel}>
					{cancelText}
				</Button>
				<Button variant={variant === 'danger' ? 'danger' : 'primary'} onclick={handleConfirm}>
					{confirmText}
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
