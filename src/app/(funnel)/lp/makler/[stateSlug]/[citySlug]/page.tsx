import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import MaklerLandingPage from "@/components/content/10_Landing/makler/makler-landing-page";
import { Sanity } from "@/server/cms/Sanity";
import { isCityData, isDistrictData } from "@/server/cms/typeGuards";

type PageProps = {
	params: Promise<{ stateSlug: string; citySlug: string }>;
};

const fetchData = cache((stateSlug: string, citySlug: string) => {
	const isCityState = stateSlug === "berlin" || stateSlug === "hamburg";
	const sanity = new Sanity();

	if (isCityState) {
		// citySlug is actually a district in Berlin/Hamburg
		return sanity.getDistrictData(citySlug, stateSlug);
	} else {
		// citySlug is a city in a regular state
		return sanity.getCityData(citySlug, stateSlug);
	}
});


export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug, citySlug } = await params;
	const data = await fetchData(stateSlug, citySlug);
	const isCityState = stateSlug === "berlin" || stateSlug === "hamburg";

	const locationName =
		isCityState && isDistrictData(data)
			? data.districtName
			: isCityData(data)
				? data.cityName
				: "";

	const title = `Immobilienmakler ${locationName} 2026 | Jetzt kostenlos Makler finden`;
	const description = `Finden Sie die besten Immobilienmakler in ${locationName}. Kostenlose Makler-Empfehlung für Ihren Immobilienverkauf.`;

	return {
		title: title,
		description: description,
		robots: {
			index: false,
			follow: false,
		},
	};
}

export default async function Page({ params }: PageProps) {
	const { stateSlug, citySlug } = await params;
	const data = await fetchData(stateSlug, citySlug);
	const isCityState = stateSlug === "berlin" || stateSlug === "hamburg";

	if (isCityState && isDistrictData(data)) {
		// District in Berlin/Hamburg
		return (
			<MaklerLandingPage
      locationName={`${data.cityName}-${data.districtName}`}
				cityName={data.cityName}
				einwohner={data.einwohner}
				variant="makler"
			/>
		);
	} else if (isCityData(data)) {
		// City in regular state
		return (
			<MaklerLandingPage
				locationName={data.cityName}
        cityName={data.cityName}
				einwohner={data.einwohner}
				variant="makler"
			/>
		);
	} else {
		notFound();
	}
}
