"use client";

import { Building, Factory, Home, TreeDeciduous } from "lucide-react";
import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../makler-funnel-button";
import { useMaklerFunnel } from "../makler-funnel-context";
import { OnlyBackNew } from "../makler-navigation";
import type { DataArrayItem } from "../makler-types";

export default function PropertyTypeScreen() {
	const { setData, data, goToScreen } = useMaklerFunnel();
	const analytics = useRudderStackAnalytics();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);

	const nextScreen = 2; // Go to property type details
	const heading = "Welche Immobilie haben Sie?";

	const multipleChoiceData: DataArrayItem[] = [
		{
			name: "Wohnung",
			icon: <Building />,
			nextScreen: 11, // Wohnung goes directly to living area
			value: "Wohnung",
		},
		{
			name: "Haus",
			icon: <Home />,
			nextScreen: nextScreen,
			value: "Haus",
		},
		{
			name: "Gewerbe",
			icon: <Factory />,
			nextScreen: nextScreen,
			value: "Gewerbe",
		},
		{
			name: "Grundstück",
			icon: <TreeDeciduous />,
			nextScreen: nextScreen,
			value: "Grundstück",
		},
	];

	const handleSubmit = (item: DataArrayItem) => {
		const trackingData = {
			...data.data,
			property_type: item.value,
		};

		// For Wohnung, also set property_type_details
		if (item.value === "Wohnung") {
			trackingData.property_type_details = item.value;
		}

		// set the data
		setData((prevData) => ({
			...prevData,
			data: trackingData,
		}));

		// fire analytics events
		analytics?.track("Funnel Property Type Submitted", trackingData, {
			campaign: {
				gclid: data.data.gclid,
				gbraid: data.data.gbraid,
				wbraid: data.data.wbraid,
			},
		});

		goToScreen(item.nextScreen);
	};

	return (
		<>
			<div className="mb-4 space-y-4 md:mb-10 w-full max-w-4xl mx-auto">
				<StepsComponent currentStep={1} />
				<h2 className="text-center font-display text-xl font-bold text-white md:text-2xl">{heading}</h2>
			</div>

			<div className="md:hidden w-full max-w-4xl mx-auto">
				{multipleChoiceData.map((item, index) => (
					<FunnelButtonNew
						index={index}
						item={item}
						key={index}
						onclick={() => handleSubmit(item)}
						variant="small"
					/>
				))}
			</div>

			<div className="hidden grid-cols-2 gap-4 md:grid w-full max-w-4xl mx-auto">
				{multipleChoiceData.map((item, index) => (
					<FunnelButtonLarge
						index={index}
						isHover={hoverIndex === index}
						item={item}
						key={index}
						onclick={() => handleSubmit(item)}
						onMouseEnter={() => setHoverIndex(index)}
						onMouseLeave={() => setHoverIndex(null)}
					/>
				))}
			</div>
			<div className="mt-auto w-full max-w-4xl mx-auto">
				<OnlyBackNew />
			</div>
		</>
	);
}
