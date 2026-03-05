"use client";

import Script from "next/script";
import {
	MaklerFunnelProvider,
	useMaklerFunnel,
} from "./makler-funnel-context";
import useMaklerFunnelProgress from "./makler-funnel-progress";
import { OnlyBack } from "./makler-navigation";
import RequestReasonScreen from "./steps/0_request_reason";
import PropertyTypeScreen from "./steps/1_property_type";
import PropertyTypeDetailsScreen from "./steps/2_property_type_details";
import ServiceNotAvailableScreen from "./steps/5_service_not_available";
import PropertyHouseUnitsScreen from "./steps/10_property_units";
import PropertyLivingAreaScreen from "./steps/11_property_living_area";
import PlotAreaScreen from "./steps/12_property_plot_area";
import LocationScreen from "./steps/20_location";
import TimelineScreen from "./steps/30_timeline";
import LoaderScreen from "./steps/97_loader";
import UserInfoScreen from "./steps/98_user_info";
import SuccessScreen from "./steps/99_success";

const MaklerFunnelRender = ({
	cityName,
	locationName,
}: {
	cityName?: string;
	locationName?: string;
}) => {
	const { data } = useMaklerFunnel();
	const progress = useMaklerFunnelProgress();

	const renderStep = () => {
		switch (data.step) {
			case 0:
				return (
					<RequestReasonScreen cityName={cityName} locationName={locationName} />
				);
			case 1:
				return <PropertyTypeScreen />;
			case 2:
				return <PropertyTypeDetailsScreen />;
			case 5:
				return <ServiceNotAvailableScreen />;
			case 10:
				return <PropertyHouseUnitsScreen />;
			case 11:
				return <PropertyLivingAreaScreen />;
			case 12:
				return <PlotAreaScreen />;
			case 20:
				return <LocationScreen />;
			case 30:
				return <TimelineScreen />;
			case 97:
				return <LoaderScreen />;
			case 98:
				return <UserInfoScreen />;
			case 99:
				return <SuccessScreen />;
			default:
				return (
					<>
						<h1>Error: Unknown step</h1>
						<OnlyBack />
					</>
				);
		}
	};

	// Step 0 (intro) and Step 5 (service not available) - special screens
	if (data.step === 0 || data.step === 5) {
		return (
			<div className="rounded-2xl bg-white p-4 md:min-h-[670px] md:p-6">
				<div key={data.step} className="animate-in fade-in duration-300">
					{renderStep()}
				</div>
			</div>
		);
	}

	// Step 98 (UserInfoScreen) needs a wider container for the form
	if (data.step === 98) {
		return (
			<div className="flex min-h-[674px] flex-col rounded-2xl bg-white p-4 md:min-h-[670px] md:min-w-[720px] md:p-10">
				<div key={data.step} className="flex flex-1 flex-col animate-in fade-in duration-300">
					{renderStep()}
				</div>
			</div>
		);
	}

	// All other steps - single clean card
	return (
		<div className="flex h-[674px] flex-col rounded-2xl bg-white p-4 md:h-[670px] md:p-10">
			<div key={data.step} className="flex flex-1 flex-col animate-in fade-in duration-300">
				{renderStep()}
			</div>
		</div>
	);
};

export function MaklerFunnelContent({
	cityName,
	locationName,
	className = "",
}: {
	cityName?: string;
	locationName?: string;
	className?: string;
}) {
	return (
		<div className={className} id="funnel">
			<Script
				async
				defer
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&libraries=places`}
			></Script>
			<MaklerFunnelRender
				cityName={cityName}
				locationName={locationName}
			/>
		</div>
	);
}

export function MaklerFunnel({
	cityName,
	locationName,
	className = "",
}: {
	cityName?: string;
	locationName?: string;
	className?: string;
}) {
	return (
		<MaklerFunnelProvider>
			<MaklerFunnelContent
				cityName={cityName}
				locationName={locationName}
				className={className}
			/>
		</MaklerFunnelProvider>
	);
}

export { MaklerFunnelProvider };
