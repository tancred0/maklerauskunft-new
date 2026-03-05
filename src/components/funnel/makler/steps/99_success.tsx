import { CheckCircle, FileText, Hourglass } from "lucide-react";
import { Trust } from "../../trust";
import { useMaklerFunnel } from "../makler-funnel-context";

export default function SuccessScreen() {
	const { data } = useMaklerFunnel();

	const heading = "Anfrage abgeschlossen";
	const subheading = (
		<>
			<div className="mb-2">
				Vielen Dank für Ihre Anfrage, {data.data.user_salutation}{" "}
				{data.data.user_lastname}.
			</div>{" "}
			<br />
			Wir haben Ihre Anfrage erhalten und suchen nun die passenden Makler für Sie.
      <br />
			Sie erhalten in Kürze eine Liste mit passenden Maklern.
		</>
	);

	return (
		<>
			<div className="mb-6 w-full max-w-4xl mx-auto">
				<div className="mb-4 flex justify-center">
					<CheckCircle className="h-16 w-16 text-primary" />
				</div>
				<h2 className="text-xl font-semibold text-primary md:text-2xl text-center">{heading}</h2>
				<div className="mt-3 text-center text-base text-muted-foreground">
					{subheading}
				</div>
				<div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
					<span>Vorgangsnummer:</span>
					<span className="font-medium">{data.data.int_process_number || "MAK-2026-839201"}</span>
				</div>
			</div>

			{/* Pending sections */}
			<div className="my-4 space-y-2 md:my-6 w-full max-w-4xl mx-auto">
				<div className="flex items-center justify-center gap-3 rounded-lg bg-primary/10 p-3">
					<span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
					<span className="text-center font-medium text-primary text-xs md:text-base">
						Makler-Suche läuft
					</span>
					<Hourglass className="h-8 w-8 text-primary" />
				</div>
				<div className="flex items-center justify-center gap-3 rounded-lg p-3 opacity-40">
					<span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground"></span>
					<span className="text-muted-foreground text-xs md:text-base">
						Kontaktaufnahme durch Makler
					</span>
					<FileText className="h-5 w-5 text-muted-foreground" />
				</div>
			</div>

			<div className="mx-auto mt-4 max-w-4xl">
				<Trust />
			</div>
			<div className="mx-auto mt-4 text-center max-w-4xl">
				<p className="text-muted-foreground text-xs">
					Hinweis: Die Makler-Empfehlung ist kostenlos und unverbindlich.
				</p>
			</div>
		</>
	);
}
