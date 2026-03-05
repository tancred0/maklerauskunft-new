import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import MaklerLandingPage from "@/components/content/10_Landing/makler/makler-landing-page";
import { Sanity } from "@/server/cms/Sanity";

type PageProps = {
	params: Promise<{
		stateSlug: string;
		citySlug: string;
		districtSlug: string;
	}>;
};

const fetchData = cache((state: string, city: string, district: string) => {
	const sanity = new Sanity();
	return sanity.getDistrictData(district, city, state);
});


export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug, citySlug, districtSlug } = await params;
	const data = await fetchData(stateSlug, citySlug, districtSlug);

	const locationName = `${data.cityName} ${data.districtName}`;
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
	const { stateSlug, citySlug, districtSlug } = await params;
	const data = await fetchData(stateSlug, citySlug, districtSlug);

	// District in regular state: "Köln Ehrenfeld"
	return (
		<MaklerLandingPage
			locationName={`${data.cityName}-${data.districtName}`}
			cityName={data.cityName}
			einwohner={data.einwohner}
			variant="immobilienmakler"
		/>
	);
}
