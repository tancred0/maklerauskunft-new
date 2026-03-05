import { Check, Clock, Euro } from "lucide-react";

const TRUST_ICONS = [
	{
		icon: <Euro className="h-5 w-5 md:h-6 md:w-6" />,
		text: "100% kostenlos",
	},
	{
		icon: <Clock className="h-5 w-5 md:h-6 md:w-6" />,
		text: "Dauert nur 2 Minuten",
	},
	{
		icon: <Check className="h-5 w-5 md:h-6 md:w-6" />,
		text: "Unverbindlich",
	},
];

export function MaklerTrust() {
	return (
		<div className="flex flex-row items-center justify-center gap-6 md:gap-10">
			{TRUST_ICONS.map((item) => (
				<div className="flex items-center gap-2 md:gap-3" key={item.text}>
					<span className="text-primary">{item.icon}</span>
					<span className="hyphens-none font-medium text-primary text-xs md:text-sm">
						{item.text}
					</span>
				</div>
			))}
		</div>
	);
}
