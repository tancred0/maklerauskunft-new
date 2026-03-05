import { Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import IconWrapper from "../icon-wrapper";
import type { DataArrayItem, DataArrayItemBool } from "./makler-types";

interface FunnelButtonProps {
	index: number;
	item: DataArrayItem | DataArrayItemBool;
	onclick: () => void;
}

const FunnelButton: React.FC<
	FunnelButtonProps & { variant?: "default" | "small" }
> = ({ index, item, onclick, variant = "default" }) => {
	const isSmall = variant === "small";
	return (
		<button
			className={`flex w-full items-center justify-between rounded-xl border border-white/[0.12] bg-white/[0.08] px-4 ${isSmall ? "py-2" : "py-3"} transition-all duration-200 hover:border-white/20 hover:bg-white/[0.14]`}
			key={index}
			onClick={() => onclick()}
		>
			<div className="flex items-center">
				<span className={`mr-5 text-[var(--lp-blue-light)] ${isSmall ? "text-2xl" : "text-4xl"}`}>
					{item.icon}
				</span>
				<span className="text-left font-medium text-white text-sm xxs:text-base">
					{item.name}
				</span>
			</div>
			<ChevronRight className="text-white/40" size={20} />
		</button>
	);
};

export const FunnelButtonNew: React.FC<
	FunnelButtonProps & { variant?: "default" | "small" }
> = ({ index, item, onclick, variant = "default" }) => {
	const isSmall = variant === "small";
	return (
		<button
			className={`flex h-16 w-full items-center justify-between rounded-xl border border-white/[0.12] bg-white/[0.08] px-4 ${isSmall ? "py-2" : "py-3"} mb-2 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.14]`}
			key={index}
			onClick={() => onclick()}
		>
			<div className="flex items-center text-white">
				<span
					className={`mr-5 text-[var(--lp-blue-light)] ${item.name ? "text-4xl" : "text-base"}`}
				>
					{item.icon}
				</span>
				{item.name && (
					<span className="text-left font-medium text-sm xxs:text-base">{item.name}</span>
				)}
			</div>
			<ChevronRight className="text-white/40" size={20} />
		</button>
	);
};

export const FunnelButtonLarge: React.FC<
	FunnelButtonProps & {
		onMouseEnter: () => void;
		onMouseLeave: () => void;
		isHover: boolean;
	}
> = ({ index, item, onclick, onMouseEnter, onMouseLeave, isHover }) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		if (isClicked) return;
		setIsClicked(true);
		setTimeout(() => {
			onclick();
		}, 400);
	};

	return (
		<button
			className={`relative grow basis-0 rounded-xl bg-white/[0.08] p-6 sm:p-8 border-2 transition-all duration-200 ${
				isClicked
					? "border-[var(--lp-blue)] scale-[0.98]"
					: isHover
						? "border-[var(--lp-blue)]"
						: "border-white/[0.12] hover:border-white/20"
			}`}
			key={index}
			onClick={handleClick}
			onMouseEnter={() => onMouseEnter()}
			onMouseLeave={() => onMouseLeave()}
		>
			{isClicked && (
				<div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--lp-blue)] text-white">
					<Check size={14} strokeWidth={3} />
				</div>
			)}
			<div className="flex h-full flex-col items-center justify-center text-white">
				{item.name ? (
					<>
						<div className="mb-3 text-[var(--lp-blue-light)]">
							<IconWrapper hover={isHover || isClicked} icon={item.icon} />
						</div>
						<div className="text-center font-display font-bold text-white">{item.name}</div>
					</>
				) : (
					<div className="flex h-[104px] items-center justify-center">
						<div className="font-medium text-2xl">{item.icon}</div>
					</div>
				)}
			</div>
		</button>
	);
};

export const FunnelButtonRow: React.FC<
	FunnelButtonProps & { variant?: "default" | "small" }
> = ({ index, item, onclick, variant = "default" }) => {
	const isSmall = variant === "small";
	return (
		<button
			className={`flex w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.08] px-4 ${isSmall ? "py-2" : "py-3"} min-h-[120px] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.14]`}
			key={index}
			onClick={() => onclick()}
		>
			<div className="flex flex-col items-center">
				<span className={`mb-2 text-[var(--lp-blue-light)] ${isSmall ? "text-2xl" : "text-4xl"}`}>
					{item.icon}
				</span>
				<span className="text-center font-medium text-white text-sm xxs:text-base">
					{item.name}
				</span>
			</div>
		</button>
	);
};

export default FunnelButton;
