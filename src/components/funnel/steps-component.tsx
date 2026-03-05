"use client";

interface StepsComponentProps {
	currentStep: number;
	size?: "base" | "small";
	labels?: [string, string, string];
	showAllLabels?: boolean;
	allFilled?: boolean;
}

function StepNumber({
	number,
	active,
	size = "base",
}: {
	number: number;
	active: boolean;
	size: "base" | "small";
}) {
	return (
		<div
			className={`flex flex-shrink-0 items-center justify-center rounded-full font-semibold ${size === "base" ? "h-10 w-10 text-base" : "h-8 w-8 text-sm"} ${
				active
					? "bg-primary text-primary-foreground"
					: "border-2 border-primary/30 bg-white text-primary/50"
			}`}
		>
			{number}
		</div>
	);
}

const Separator = () => {
	return <div className="h-0.5 w-8 bg-primary/20 md:w-12" />;
};

const StepsComponent = ({
	currentStep,
	size = "base",
	labels = ["Angaben zur Immobilie", "Kontaktangaben", "Sie entscheiden"],
	showAllLabels = false,
	allFilled = false,
}: StepsComponentProps) => {
	const currentLabel = labels[currentStep - 1] || labels[0];

	return (
		<div className="mx-auto flex flex-col items-center gap-2">
			{/* Current step label */}
			<p className="text-sm font-medium text-primary">{currentLabel}</p>

			{/* Step indicators */}
			<div className="flex items-center gap-3">
				<StepNumber active={allFilled || currentStep >= 1} number={1} size={size} />
				<Separator />
				<StepNumber active={allFilled || currentStep >= 2} number={2} size={size} />
				<Separator />
				<StepNumber active={allFilled || currentStep >= 3} number={3} size={size} />
			</div>
		</div>
	);
};

export default StepsComponent;
