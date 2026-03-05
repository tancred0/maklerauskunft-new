import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";

import { CalendarTextIcon } from "@/components/funnel/icons/calendarText";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../makler-funnel-button";
import { useMaklerFunnel } from "../makler-funnel-context";
import { OnlyBackNew } from "../makler-navigation";
import type { DataArrayItem } from "../makler-types";

export default function TimelineScreen() {
	const { setData, goToScreen, data } = useMaklerFunnel();
	const analytics = useRudderStackAnalytics();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	// Adapt heading based on request reason
	// Vermieten has intention_request_reason_detail = "Vermieten"
	const isVermieten = data.data.intention_request_reason_detail === "Vermieten";
	const heading = isVermieten
		? "Wann planen Sie zu vermieten?"
		: "Wann planen Sie zu verkaufen?";
	const nextScreen = 20; // Go to location
	const multipleChoiceData = [
		{
			name: "Sofort",
			icon: <CalendarTextIcon text="!!!" x_start={8.75} />,
			nextScreen: nextScreen,
			value: "1-3 Monate",
		},
		{
			name: "In 1-3 Monaten",
			icon: <CalendarTextIcon text="1-3" x_start={6} />,
			nextScreen: nextScreen,
			value: "1-3 Monate",
		},
		{
			name: "In 3-6 Monaten",
			icon: <CalendarTextIcon text="3-6" x_start={6} />,
			nextScreen: nextScreen,
			value: "3-6 Monate",
		},
		{
			name: "Später / Noch unsicher",
			icon: <CalendarTextIcon text="?" x_start={10.5} />,
			nextScreen: nextScreen,
			value: "Unsicher",
		},
	];

	const handleSubmit = (item: DataArrayItem) => {
		setData((prevData) => ({
			...prevData,
			data: {
				...prevData.data,
				intention_horizon_sell: item.value,
			},
		}));

		analytics?.track("Funnel Timeline Submitted", {
			...data.data,
			intention_horizon_sell: item.value,
		}, {
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
