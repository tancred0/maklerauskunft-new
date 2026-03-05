import { useMaklerFunnel } from "./makler-funnel-context";

const useMaklerFunnelProgress = () => {
	const { data } = useMaklerFunnel();

	const getStepProgress = (step: number) => {
		const stepMap: Record<number, number> = {
			0: 8,    // Request Reason (first step)
			1: 16,   // Property Type
			2: 24,   // Property Type Details
			10: 32,  // Property Units (MFH/Gewerbe)
			11: 40,  // Living Area
			12: 48,  // Plot Area
			30: 56,  // Timeline
			20: 64,  // Location
			97: 75,  // Loader
			98: 88,  // Contact Info
			99: 100, // Success
		};

		return stepMap[step] ?? 0;
	};

	return getStepProgress(data.step);
};

export default useMaklerFunnelProgress;
