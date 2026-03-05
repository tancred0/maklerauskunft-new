import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMaklerFunnel } from "./makler-funnel-context";

interface BackAndForthProps {
	nextScreen?: number;
	preSubmit?: () => void;
	disabled?: boolean;
}

interface OnlyForwardProps {
	nextScreen: number;
	className?: string;
	preSubmit?: () => void;
}

export function BackAndForth({
	nextScreen,
	preSubmit,
	disabled,
}: BackAndForthProps) {
	const { goToScreen, goBack } = useMaklerFunnel();

	const handleClick = () => {
		if (!preSubmit || !nextScreen) return;
		preSubmit();
		goToScreen(nextScreen);
	};

	return (
		<div className="mt-4 grid grid-flow-col items-end gap-x-3">
			{nextScreen && (
				<button
					className={cn(
						"col-span-4 flex w-full items-center justify-between rounded-xl p-3 text-white md:p-4",
						disabled ? "cursor-not-allowed bg-muted-foreground" : "bg-[var(--lp-blue)] hover:bg-[var(--lp-blue-light)]",
					)}
					disabled={disabled}
					onClick={handleClick}
				>
					<span className="text-white">Weiter</span>
					<ChevronRight className="h-5 w-5" />
				</button>
			)}
			{!nextScreen && (
				<button
					className={cn(
						"col-span-4 flex w-full items-center justify-between rounded-xl p-3 text-white md:p-4",
						disabled ? "cursor-not-allowed bg-muted-foreground" : "bg-[var(--lp-blue)] hover:bg-[var(--lp-blue-light)]",
					)}
					disabled={disabled}
					type="submit"
				>
					<span className="text-white">Weiter</span>
					<ChevronRight className="h-5 w-5" />
				</button>
			)}
			<button
				className={cn(
					"order-first rounded-xl p-3 md:p-4 transition-colors",
					disabled ? "cursor-not-allowed bg-white/5" : "bg-white/[0.1] hover:bg-white/[0.15]",
				)}
				disabled={disabled}
				onClick={() => goBack()}
			>
				<ChevronLeft className="h-5 w-5 text-white/70" />
			</button>
		</div>
	);
}

export function BackAndForthNew({
	nextScreen,
	preSubmit,
	disabled,
}: BackAndForthProps) {
	const { goToScreen, goBack } = useMaklerFunnel();

	const handleClick = () => {
		if (!preSubmit || !nextScreen) return;
		preSubmit();
		goToScreen(nextScreen);
	};

	return (
		<div className="grid grid-cols-[1fr_3fr] items-end gap-2 sm:gap-4">
			{nextScreen && (
				<button
					className={cn(
						"flex w-full items-center justify-between rounded-xl p-3 text-white md:p-4",
						disabled ? "cursor-not-allowed bg-muted-foreground" : "bg-[var(--lp-blue)] hover:bg-[var(--lp-blue-light)]",
					)}
					disabled={disabled}
					onClick={handleClick}
				>
					<span className="text-white">Weiter</span>
					<ChevronRight className="h-5 w-5" />
				</button>
			)}
			{!nextScreen && (
				<button
					className={cn(
						"flex w-full items-center justify-between rounded-xl p-3 text-white md:p-4",
						disabled ? "cursor-not-allowed bg-muted-foreground" : "bg-[var(--lp-blue)] hover:bg-[var(--lp-blue-light)]",
					)}
					disabled={disabled}
					type="submit"
				>
					<span className="text-white">Weiter</span>
					<ChevronRight className="h-5 w-5" />
				</button>
			)}

			<button
				className={cn(
					"order-first rounded-xl p-3 md:p-4 transition-colors",
					disabled ? "cursor-not-allowed bg-white/5" : "bg-white/[0.1] hover:bg-white/[0.15]",
				)}
				disabled={disabled}
				onClick={() => goBack()}
			>
				<ChevronLeft className="h-5 w-5 text-white/70" />
			</button>
		</div>
	);
}

export function OnlyBack() {
	const { goBack } = useMaklerFunnel();
	return (
		<div className="flex justify-start">
			<button
				className="rounded-xl bg-white/[0.1] p-3 transition-colors hover:bg-white/[0.15] md:p-4"
				onClick={() => goBack()}
			>
				<ChevronLeft className="h-5 w-5 text-white/70" />
			</button>
		</div>
	);
}

export function OnlyBackNew() {
	const { goBack } = useMaklerFunnel();

	return (
		<div className="grid grid-cols-[1fr_3fr] items-end gap-2 sm:gap-4">
			<button
				className="rounded-xl bg-white/[0.1] p-3 transition-colors hover:bg-white/[0.15] md:p-4"
				onClick={() => goBack()}
			>
				<ChevronLeft className="h-5 w-5 text-white/70" />
			</button>
			<div></div>
		</div>
	);
}

export function OnlyForward({
	nextScreen,
	preSubmit,
	className,
}: OnlyForwardProps) {
	const { goToScreen } = useMaklerFunnel();

	const handleClick = () => {
		if (!preSubmit || !nextScreen) return;
		preSubmit();
		goToScreen(nextScreen);
	};

	return (
		<div className={cn("mb-4", className)}>
			<button
				className="flex w-full items-center justify-center rounded-xl bg-[var(--lp-blue)] p-3 text-white hover:bg-[var(--lp-blue-light)] md:p-4"
				onClick={handleClick}
			>
				<span className="mr-2 font-medium">Weiter</span>
			</button>
		</div>
	);
}
