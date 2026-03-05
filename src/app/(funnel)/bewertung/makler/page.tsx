import type { Metadata } from "next";
import { GoDatabase } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiTimer } from "react-icons/pi";
import { MaklerFunnel } from "@/components/funnel/makler/makler-funnel";
import FooterLight from "@/components/layout/footer-light";

export const metadata: Metadata = {
	title: `Top Makler finden 2026 | Jetzt kostenlos Makler-Empfehlung erhalten`,
	description: `Finden Sie die besten Immobilienmakler in Ihrer Region. Kostenlose Makler-Empfehlung für Ihren Immobilienverkauf.`,
};

const BENEFITS = [
	{
		icon: <IoPricetagsOutline />,
		text: "Kostenlos",
		description: "Die Makler-Empfehlung ist komplett kostenlos.",
	},
	{
		icon: <PiTimer />,
		text: "Schnell",
		description:
			"Sie erhalten Ihre Makler-Empfehlung innerhalb von 24 Stunden.",
	},
	{
		icon: <GoDatabase />,
		text: "Geprüft",
		description:
			"Wir arbeiten nur mit geprüften und erfahrenen Maklern zusammen.",
	},
];

const STEPS = [
	{
		number: 1,
		title: "Angaben zur Immobilie",
		description:
			"Teilen Sie uns einige grundlegende Informationen zu Ihrer Immobilie mit, wie Immobilienart, Wohnfläche und Standort.",
	},
	{
		number: 2,
		title: "Passende Makler finden",
		description:
			"Basierend auf Ihren Angaben finden wir die besten Makler in Ihrer Region, die auf Ihre Immobilienart spezialisiert sind.",
	},
	{
		number: 3,
		title: "Persönliche Beratung",
		description:
			"Ein passender Makler meldet sich bei Ihnen, um Ihre Immobilie zu besichtigen und Sie persönlich zu beraten.",
	},
];

export default function Page() {
	return (
		<div className="min-h-screen">
			<section className="bg-gradient-to-b from-white to-slate-50">
				<div className="container mx-auto max-w-4xl px-4 pt-6 pb-8">
					<div className="space-y-6">
						<div
							className="rounded-xl border border-slate-100 bg-white p-4 shadow-lg md:p-6"
							id="form"
						>
							<MaklerFunnel />
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-12">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="grid gap-8 text-center md:grid-cols-3">
						{BENEFITS.map((benefit, index) => (
							<div className="flex flex-col items-center" key={index}>
								<div className="mb-4 text-4xl text-primary">{benefit.icon}</div>
								<h3 className="mb-2 font-semibold text-xl">{benefit.text}</h3>
								<p className="text-slate-600">{benefit.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Detailed Steps Section */}
			<section className="bg-slate-50 py-12">
				<div className="container mx-auto max-w-4xl px-4">
					<h2 className="mb-10 text-center font-bold text-2xl md:text-3xl">
						So funktioniert die Makler-Empfehlung
					</h2>

					<div className="space-y-8">
						{STEPS.map((step, index) => (
							<div className="flex gap-6" key={index}>
								<div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-slate-100 font-bold text-primary text-xl">
									{step.number}
								</div>
								<div>
									<div className="h3 mb-2 font-semibold text-primary text-xl">
										{step.title}
									</div>
									<p className="text-slate-700">{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<FooterLight />
		</div>
	);
}
