import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const URL = "https://www.maklerauskunft.de";
  const date = new Date()
	
	const mainPages: MetadataRoute.Sitemap = [
		{
			url: `${URL}`,
			lastModified: date,
			// priority: 1,
		},
	];

	return [
		...mainPages,
	];
}
