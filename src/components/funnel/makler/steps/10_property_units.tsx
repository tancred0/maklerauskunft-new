import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import StepsComponent from "../../steps-component";
import { useMaklerFunnel } from "../makler-funnel-context";
import { BackAndForthNew } from "../makler-navigation";

export default function PropertyHouseUnitsScreen() {
	const { data, setData, goToScreen } = useMaklerFunnel();

	const minValue = 1;
	const maxValueSlider = 25;
	const defaultValue = 4;
	const nextScreen = 11; // Go to living area
	const heading = "Wieviele Einheiten hat das Gebäude?";
	const unitType = "Einheiten";
	const unitTypeSingular = "Einheit";

	const [flaeche, setFlaeche] = useState<number[]>([
		data.data.property_house_units ?? defaultValue,
	]);

	const handleSubmit = () => {
		// set the data
		setData((prevData) => {
			return {
				...prevData,
				data: {
					...prevData.data,
					property_house_units: flaeche[0],
				},
			};
		});

		goToScreen(nextScreen);
	};

	return (
		<>
			<div className="mb-4 space-y-4 md:mb-10 w-full max-w-4xl mx-auto">
				<StepsComponent currentStep={1} />
				<h2 className="text-center font-display text-xl font-bold text-white md:text-2xl">{heading}</h2>
			</div>
			<div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
				{/* Large centered value display */}
				<div className="mb-8 text-center">
					<div className="inline-flex items-baseline gap-2 rounded-xl bg-white/[0.1] px-6 py-3">
						<span className="font-bold text-4xl text-white">
							{flaeche[0]!.toLocaleString("de-DE")}
						</span>
						<span className="text-white text-xl">{unitType}</span>
					</div>
				</div>

				{/* Slider */}
				<div className="mb-8 w-full">
					<Slider
						className="mb-4"
						max={maxValueSlider}
						min={minValue}
						onValueChange={(value) => {
							setFlaeche(value);
						}}
						step={1}
						value={flaeche}
					/>
					<div className="flex justify-between text-white/50 text-sm">
						<span>
							{minValue.toLocaleString("de-DE")} {unitTypeSingular}
						</span>
						<span>
							{maxValueSlider.toLocaleString("de-DE")} {unitType}
						</span>
					</div>
				</div>

				{/* Alternative input */}
				<div className="mb-8">
					<div className="flex items-center justify-center gap-4">
						<span className="text-white/50">Manuelle Eingabe:</span>
						<div className="flex items-center gap-2">
							<Input
								className="w-24 border-white/[0.15] bg-white/[0.1] text-center text-white placeholder:text-white/40 focus:border-white/30"
								max={1000}
								min={minValue}
								onChange={(e) => {
									const value =
										e.target.value === ""
											? 0
											: parseInt(e.target.value, 10) || 0;
									setFlaeche([value]);
								}}
								placeholder="425"
								type="number"
								value={flaeche[0] || ""}
							/>
							<span className="text-white/50">{unitType}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-auto w-full max-w-4xl mx-auto">
				<BackAndForthNew nextScreen={nextScreen} preSubmit={handleSubmit} />
			</div>
		</>
	);
}
