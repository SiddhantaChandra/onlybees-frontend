"use client";

import { useEffect } from "react";

const CancelPaymentModal = ({ isOpen = false, onCancel, onConfirm }) => {
	useEffect(() => {
		if (!isOpen) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				onCancel?.();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isOpen, onCancel]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
			<div className="relative w-full max-w-lg rounded-2xl bg-black px-6 py-8 text-center shadow-2xl">
				<h2 className="text-2xl md:text-3xl font-semibold mb-3">Cancel Payment?</h2>
				<p className="text-white/70 text-sm md:text-base mb-6">
					Payment will be cancelled and you'll be redirected to event page
				</p>

				<div className="flex items-center justify-center gap-3 md:gap-4">
					<button
						onClick={onCancel}
						className="min-w-27.5 rounded-md bg-[#2d2d2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3a3a]"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="min-w-[110px] rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default CancelPaymentModal;
