import {
	Briefcase,
	Building,
	Building2,
	HelpCircle,
	Home,
	Sprout,
	TreePine,
	Warehouse,
} from "lucide-react";
import { useState } from "react";
import useRudderStackAnalytics from "@/app/useRudderAnalytics";
import StepsComponent from "../../steps-component";
import { FunnelButtonLarge, FunnelButtonNew } from "../makler-funnel-button";
import { useMaklerFunnel } from "../makler-funnel-context";
import { OnlyBackNew } from "../makler-navigation";
import type { DataArrayItem } from "../makler-types";

export default function PropertyTypeDetailsScreen() {
	const { setData, goToScreen, data } = useMaklerFunnel();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const analytics = useRudderStackAnalytics();

	let nextScreen = 11; // Default: go to living area
	let heading = "";
	let multipleChoiceData: DataArrayItem[] = [];

	switch (data.data.property_type) {
		case "Wohnung":
			heading = "Bitte wählen Sie die Art Ihrer Wohnung?";
			multipleChoiceData = [
				{
					name: "Erdgeschoss",
					icon: <Building />,
					nextScreen: nextScreen,
					value: "Erdgeschoss",
				},
				{
					name: "Etagenwohnung",
					icon: <Building />,
					nextScreen: nextScreen,
					value: "Etagenwohnung",
				},
				{
					name: "Penthouse/Dachgeschoss",
					icon: <Building />,
					nextScreen: nextScreen,
					value: "Penthouse/Dachgeschoss",
				},
				{
					name: "Sonstiges",
					icon: <HelpCircle />,
					nextScreen: nextScreen,
					value: "Sonstiges",
				},
			];
			break;
		case "Grundstück":
			heading = "Um was für einen Grundstücktyp handelt es sich?";
			nextScreen = 12; // Grundstück goes to plot area
			multipleChoiceData = [
				{
					name: "Bauland",
					icon: <Home />,
					nextScreen: nextScreen,
					value: "Bauland",
				},
				{
					name: "Ackerland",
					icon: <Sprout />,
					nextScreen: nextScreen,
					value: "Ackerland",
				},
				{
					name: "Wald-/ Grünland",
					icon: <TreePine />,
					nextScreen: nextScreen,
					value: "Wald-/Grünland",
				},
				{
					name: "Sonstiges",
					icon: <HelpCircle />,
					nextScreen: nextScreen,
					value: "Sonstiges",
				},
			];
			break;
		case "Gewerbe":
			heading = "Bitte wählen Sie die Art Ihrer Gewerbeimmobilie?";
			multipleChoiceData = [
				{
					name: "Wohn- und Geschäftshaus",
					icon: <Briefcase />,
					nextScreen: 10, // Goes to units
					value: "Wohn- und Geschäftshaus",
				},
				{
					name: "Bürogebäude",
					icon: <Building />,
					nextScreen: 10, // Goes to units
					value: "Bürogebäude",
				},
				{
					name: "Logistik-/ Industriegebäude",
					icon: <Warehouse />,
					nextScreen: nextScreen,
					value: "Logistik-/ Industriegebäude",
				},
				{
					name: "Sonstiges",
					icon: <HelpCircle />,
					nextScreen: nextScreen,
					value: "Sonstiges",
				},
			];
			break;
		default:
			// case "Haus":
			heading = "Bitte wählen Sie die Art Ihres Hauses?";
			multipleChoiceData = [
				{
					name: "Einfamilienhaus",
					icon: <Home />,
					nextScreen: nextScreen,
					value: "Einfamilienhaus",
				},
				{
					name: "Mehrfamilienhaus",
					icon: <Building2 />,
					nextScreen: 10, // Goes to units
					value: "Mehrfamilienhaus",
				},
				{
					name: "Wohn- & Geschäftshaus",
					icon: <Briefcase />,
					nextScreen: 10, // Goes to units
					value: "Wohn- und Geschäftshaus",
				},
				{
					name: "Sonstiges",
					icon: <HelpCircle />,
					nextScreen: nextScreen,
					value: "Sonstiges",
				},
			];
			break;
	}

	const handleSubmit = (item: DataArrayItem) => {
		setData((prevData) => {
			const updatedData = {
				...prevData.data,
				property_type_details: item.value,
			};

			analytics?.track("Funnel Property Type Detail Submitted", updatedData, {
				campaign: {
					gclid: data.data.gclid,
					gbraid: data.data.gbraid,
					wbraid: data.data.wbraid,
				},
			});

			return {
				...prevData,
				data: updatedData,
			};
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
