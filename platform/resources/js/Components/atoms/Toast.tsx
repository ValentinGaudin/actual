import React, { useEffect, useMemo, useState } from 'react';
import { Toast as ToastT } from '@/hooks/useToasterStore';
import { useThemeStore, useToasterStore } from '@/hooks';
import {
	CircleExclamationIcon,
	CircleValidIcon,
} from '@/Components/atoms/icons';

type Props = {
	toast: ToastT;
};

const Toast = ({ toast }: Props) => {
	const [animationStarted, setAnimationStarted] = useState<boolean>(false);
	const closeToast = useToasterStore((state) => state.closeToast);
	const theme = useThemeStore((state) => state.theme);

	const toastColor = useMemo(() => {
		if (toast.type === 'success') {
			return 'bg-primary';
		}
		if (toast.type === 'error') {
			return 'border-red-600/90 bg-red-600/70';
		}
		return '';
	}, [toast.type]);

	const toastIcon = useMemo(() => {
		if (toast.type === 'success') {
			return (
				<CircleValidIcon className="block aspect-square invert-0 dark:invert mx-auto w-7 h-7" />
			);
		}
		if (toast.type === 'error') {
			return (
				<CircleExclamationIcon className="block aspect-square invert-0 dark:invert mx-auto w-7 h-7" />
			);
		}
	}, [toast.type]);

	useEffect(() => {
		setTimeout(() => {
			setAnimationStarted(true);
		}, 150);
	}, []);

	return (
		<button
			type="button"
			key={toast.id}
			onClick={() => closeToast(toast.id)}
			className={`${
				animationStarted
					? 'active opacity-100 translate-x-0'
					: 'translate-x-full opacity-0'
			} group/toast flex items-center justify-center
			min-w-[200px] md:min-w-[300px] max-w-[400px] m-2
			${toastColor} backdrop-blur-md
			dark:backdrop-brightness-200 backdrop-contrast-200
			transition-all ease-out duration-500
			`}
		>
			<div className={`mx-2`}>{toastIcon}</div>
			<div className="flex items-center justify-between w-full py-3 px-1">
				<div
					className={`text-sm font-bold items-center dark:text-white text-dark`}
				>
					{toast.message}
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					stroke={theme === 'dark' ? '#fff' : '#000'}
					className={`ms-5 w-4 h-4 mr-2 group-hover/toast:w-4 group-hover/toast:h-4 transition-all ease-out duration-300 cursor-pointer stroke-2 `}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
		</button>
	);
};

export default Toast;
