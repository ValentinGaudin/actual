import { create } from 'zustand';

type ToastKey = 'success' | 'error';

export type Toast = {
	id: number;
	message: string;
	type: ToastKey;
};

export type ToastStore = {
	toasts: Toast[];
	showToast: (toast: Omit<Toast, 'id'>) => void;
	closeToast: (id: Toast['id']) => void;
};

export default create<ToastStore>((set, get) => ({
	toasts: [],
	showToast: (toast) => {
		const id = get().toasts.length + 1;
		set({
			toasts: [...get().toasts, { ...toast, id }],
		});

		setTimeout(() => {
			set({ toasts: get().toasts.slice(1) });
		}, 4000);
	},
	closeToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
