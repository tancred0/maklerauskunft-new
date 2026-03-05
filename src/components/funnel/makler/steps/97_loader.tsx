import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useMaklerFunnel } from "../makler-funnel-context";

interface CheckItem {
	id: string;
	label: string;
	value: boolean;
	isRunning: boolean;
}

const PROGRESS_TIMINGS = {
	STANDORT_COMPLETE: 30,
	MAKLER_START: 31,
	MAKLER_COMPLETE: 91,
	MATCHES_START: 92,
	MATCHES_COMPLETE: 150,
	TIMER_INTERVAL: 50,
	COMPLETION_DELAY: 700,
};

const getInitialChecks = (): CheckItem[] => {
	return [
		{ id: "standort", label: "Standort wird geprüft...", value: false, isRunning: true },
		{ id: "makler", label: "Makler werden gesucht...", value: false, isRunning: false },
		{ id: "matches", label: "Beste Matches werden ermittelt...", value: false, isRunning: false },
	];
};

// Component for the header section
const HeaderSection = ({ heading }: { heading: string }) => (
	<div className="mb-4 space-y-4 md:mb-10">
		<h2 className="font-display text-xl font-bold text-white md:text-2xl text-center">{heading}</h2>
	</div>
);

// Component for the main loading spinner or checkmark
const MainSpinner = ({ allCompleted }: { allCompleted: boolean }) => (
	<div className="flex items-center pt-6 md:pb-10">
		<div className="mx-auto h-24 w-24">
			{allCompleted ? (
				<Check className="h-24 w-24 text-[var(--lp-blue-light)]" />
			) : (
				<svg className="h-24 w-24 animate-spin" viewBox="0 0 24 24">
					<circle
						className="opacity-0"
						cx="12"
						cy="12"
						fill="none"
						r="10"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<circle
						className="opacity-100"
						cx="12"
						cy="12"
						fill="none"
						r="10"
						stroke="var(--lp-blue)"
						strokeDasharray="32.5 22.5"
						strokeWidth="2"
					/>
				</svg>
			)}
		</div>
	</div>
);

// Component for the check list
const CheckList = ({ checks }: { checks: CheckItem[] }) => (
	<div className="mx-auto w-full">
		<div className="funnel-container space-y-2">
			{checks.map((check) => (
				<CheckItemComponent check={check} key={check.id} />
			))}
		</div>
	</div>
);

// Component for individual check items
const CheckItemComponent = ({ check }: { check: CheckItem }) => (
	<div
		className={`flex items-center justify-between rounded-lg px-4 py-3 ${
			check.value || check.isRunning ? "bg-white/[0.08]" : ""
		}`}
	>
		<span className="text-white/80">{check.label}</span>
		<CheckStatus check={check} />
	</div>
);

// Component for check status (spinner, checkmark, or nothing)
const CheckStatus = ({ check }: { check: CheckItem }) => (
	<div className="flex items-center">
		{check.value ? (
			<Check className="h-6 w-6 text-[var(--lp-blue-light)]" />
		) : check.isRunning ? (
			<SmallSpinner />
		) : null}
	</div>
);

// Component for small spinner used in check items
const SmallSpinner = () => (
	<div className="h-6 w-6">
		<svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24">
			<circle
				className="opacity-0"
				cx="12"
				cy="12"
				fill="none"
				r="10"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<circle
				className="opacity-100"
				cx="12"
				cy="12"
				fill="none"
				r="10"
				stroke="var(--lp-blue)"
				strokeDasharray="32.5 22.5"
				strokeWidth="2"
			/>
		</svg>
	</div>
);

export default function LoaderScreen() {
	const { goToScreen } = useMaklerFunnel();
	const [progress, setProgress] = useState(0);
	const [checks, setChecks] = useState<CheckItem[]>(() => getInitialChecks());

	// Helper functions for check management
	const updateCheck = (id: string) => {
		setChecks((prevChecks) =>
			prevChecks.map((check) =>
				check.id === id ? { ...check, value: true, isRunning: false } : check,
			),
		);
	};

	const setRunning = (id: string) => {
		setChecks((prevChecks) =>
			prevChecks.map((check) =>
				check.id === id ? { ...check, isRunning: true } : check,
			),
		);
	};

	// Progress timer effect
	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 150) {
					clearInterval(timer);
					return 150;
				}
				const newProgress = oldProgress + 1;

				// Handle progress milestones
				switch (newProgress) {
					case PROGRESS_TIMINGS.STANDORT_COMPLETE:
						updateCheck("standort");
						break;
					case PROGRESS_TIMINGS.MAKLER_START:
						setRunning("makler");
						break;
					case PROGRESS_TIMINGS.MAKLER_COMPLETE:
						updateCheck("makler");
						break;
					case PROGRESS_TIMINGS.MATCHES_START:
						setRunning("matches");
						break;
					case PROGRESS_TIMINGS.MATCHES_COMPLETE:
						updateCheck("matches");
						break;
				}

				return newProgress;
			});
		}, PROGRESS_TIMINGS.TIMER_INTERVAL);

		return () => clearInterval(timer);
	}, []);

	// Navigate to next screen when all checks complete
	useEffect(() => {
		if (checks.every((check) => check.value)) {
			setTimeout(() => {
				goToScreen(98, true);
			}, PROGRESS_TIMINGS.COMPLETION_DELAY);
		}
	}, [checks, goToScreen]);

	const heading = "Wir finden die besten Makler für Sie.";

	const allCompleted = checks.every((check) => check.value);

	return (
		<>
			<div className="w-full max-w-4xl mx-auto">
				<HeaderSection heading={heading} />
			</div>
			<div className="w-full max-w-4xl mx-auto">
				<MainSpinner allCompleted={allCompleted} />
			</div>

			<div className="flex flex-1 flex-col justify-center w-full max-w-4xl mx-auto">
				<CheckList checks={checks} />
			</div>

			<div className="mt-auto w-full max-w-4xl mx-auto" />
		</>
	);
}
