export type ToastType = 'success' | 'error' | 'info';

interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

let toasts = $state<Toast[]>([]);
let nextId = 0;

export const toastStore = {
	get toasts() {
		return toasts;
	},

	show(message: string, type: ToastType = 'info') {
		const id = nextId++;
		toasts = [...toasts, { id, message, type }];

		// Auto-dismiss after 3 seconds
		setTimeout(() => {
			toasts = toasts.filter((t) => t.id !== id);
		}, 3000);
	},

	dismiss(id: number) {
		toasts = toasts.filter((t) => t.id !== id);
	}
};
