import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import MaklerLandingPage from "@/components/content/10_Landing/makler/makler-landing-page";
import { Sanity } from "@/server/cms/Sanity";

type PageProps = {
	params: Promise<{ stateSlug: string }>;
};

const fetchData = cache((stateSlug: string) => {
	const sanity = new Sanity();
	return sanity.getCityData(stateSlug);
});

export async function generateMetadata(
	{ params }: PageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stateSlug } = await params;
	const data = await fetchData(stateSlug);

	const title = `Immobilienmakler ${data.cityName} 2026 | Jetzt kostenlos Makler finden`;
	const description = `Finden Sie die besten Immobilienmakler in ${data.cityName}. Kostenlose Makler-Empfehlung für Ihren Immobilienverkauf.`;

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
	const { stateSlug } = await params;

	// This page only works for city-states (Berlin, Hamburg)
	if (stateSlug !== "berlin" && stateSlug !== "hamburg") {
		notFound();
	}

	const data = await fetchData(stateSlug);

	return <MaklerLandingPage locationName={data.cityName} cityName={data.cityName} einwohner={data.einwohner} variant="makler" />;
}
