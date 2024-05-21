import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeKey = 'light' | 'dark';

type ThemeStore = {
	theme: ThemeKey;
	toggleTheme: () => void;
};

const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			theme: 'light',
			toggleTheme: () => {
				set((state) => ({
					theme: state.theme === 'dark' ? 'light' : 'dark',
				}));
				const theme = get().theme;

				if (theme === 'dark') {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
			},
		}),
		{
			name: 'theme-store',
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useThemeStore;
