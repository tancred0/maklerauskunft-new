"use client";

import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMaklerFunnel } from "../makler-funnel-context";

export default function ServiceNotAvailableScreen() {
	const { data, goBack } = useMaklerFunnel();

	// Determine which service they selected
	const reasonDetail = data.data.intention_request_reason_detail;
	const serviceType = reasonDetail === "Vermieten" ? "Vermietung" : reasonDetail === "Kaufen" ? "Immobiliensuche" : "Miete";

	return (
		<div className="flex flex-col items-center p-2 md:p-4 w-full max-w-4xl mx-auto">
			{/* Header */}
			<div className="mb-8 w-full max-w-3xl space-y-4 text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.1]">
					<Home className="h-8 w-8 text-[var(--lp-blue-light)]" />
				</div>
				<div className="font-display text-2xl font-bold text-white md:text-3xl">
					Leider können wir Ihnen bei der {serviceType} nicht helfen
				</div>
				<p className="text-base text-white/60 md:text-lg">
					Unser Service konzentriert sich aktuell auf die Vermittlung von optimalen Maklern für den <strong className="text-white/80">Immobilienverkauf</strong>.
				</p>
				<p className="text-base text-white/60 md:text-lg">
					Wir arbeiten daran, unser Angebot zu erweitern. Schauen Sie gerne zu einem später wieder vorbei!
				</p>
			</div>

			{/* Action Buttons */}
			<div className="mb-10 flex w-full max-w-md flex-col gap-4">
				<Button
					onClick={() => goBack()}
					variant="outline"
					className="flex items-center justify-center gap-2 border-white/[0.15] bg-white/[0.08] py-6 text-white hover:bg-white/[0.14]"
				>
					<ArrowLeft className="h-5 w-5" />
					Zurück zur Auswahl
				</Button>
			</div>
		</div>
	);
}
