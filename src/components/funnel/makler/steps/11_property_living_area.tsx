import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import StepsComponent from "../../steps-component";
import { useMaklerFunnel } from "../makler-funnel-context";
import { BackAndForthNew } from "../makler-navigation";

export default function PropertyLivingAreaScreen() {
	const { data, setData } = useMaklerFunnel();
	const analytics = useRudderStackAnalytics();
	const [maxValueSlider, setMaxValueSlider] = useState(800);
	const minValue = 35;
	const defaultValue = 125;
	const unitType = "m²";

	const [flaeche, setFlaeche] = useState<number[]>([
		data.data.property_living_area || defaultValue,
	]);

	const handleSubmit = () => {
		// set the data
		setData((prevData) => {
			return {
				...prevData,
				data: {
					...prevData.data,
					property_living_area: flaeche[0],
				},
			};
		});

		analytics?.track("Funnel Property Living Area Submitted", {
			...data.data,
			property_living_area: flaeche[0],
		}, {
			campaign: {
				gclid: data.data.gclid,
				gbraid: data.data.gbraid,
				wbraid: data.data.wbraid,
			},
		});
	};

	const heading = "Wie groß ist die Wohnfläche?";
	// For makler funnel: Wohnung skips plot area, goes to timeline or location based on request reason
	// Non-Wohnung goes to plot area (12)
	const getNextScreen = () => {
		if (data.data.property_type === "Wohnung") {
			// Wohnung: skip plot area, go to timeline (30) or location (20) based on reason
			// Verkaufen = "Immobilienverkauf", Vermieten = detail "Vermieten"
			const reason = data.data.intention_request_reason;
			const reasonDetail = data.data.intention_request_reason_detail;
			const needsTimeline = reason === "Immobilienverkauf" || reasonDetail === "Vermieten";
			return needsTimeline ? 30 : 20;
		}
		return 12; // Non-Wohnung goes to plot area
	};
	const nextScreen = getNextScreen();
	const defaultMaxValue = 800;
	const unitTypeSingular = unitType;

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
							// Adjust slider max if value exceeds current max
							if (value[0]! > maxValueSlider) {
								setMaxValueSlider(
									Math.max(Math.ceil(value[0]! / 1000) * 1000, 10000),
								);
							}
							// Reset max to default if value becomes smaller than default
							else if (
								value[0]! < defaultMaxValue &&
								maxValueSlider > defaultMaxValue
							) {
								setMaxValueSlider(defaultMaxValue);
							}
						}}
						step={5}
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
								max={100000}
								min={minValue}
								onChange={(e) => {
									const value =
										e.target.value === ""
											? 0
											: parseFloat(e.target.value) || 0;
									setFlaeche([value]);
									// Adjust slider max if value exceeds current max
									if (value > maxValueSlider) {
										setMaxValueSlider(
											Math.max(Math.ceil(value / 1000) * 1000 + 1000, 10000),
										);
									}
									// Reset max to default if value becomes smaller than default
									else if (
										value < defaultMaxValue &&
										maxValueSlider > defaultMaxValue
									) {
										setMaxValueSlider(defaultMaxValue);
									}
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
