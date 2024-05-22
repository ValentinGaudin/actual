import React from 'react';

import { useToasterStore } from '@/hooks';
import { Toast } from '@/components/atoms';
import { createPortal } from 'react-dom';

type Props = {
	children: React.ReactNode;
};

function Toaster({ children }: Props) {
	const toasts = useToasterStore((state) => state.toasts);

	return (
		<>
			{createPortal(
				<div className="absolute top-[calc(6rem+5px)] left-0">
					<div className="flex flex-col justify-center items-start">
						{toasts.map((toast) => (
							<Toast key={toast.id} toast={toast} />
						))}
					</div>
				</div>,
				document.getElementById('portal-root') as Element
			)}
			{children}
		</>
	);
}

export default Toaster;
