/**
 * Funnel type constants and type definitions
 * These values map to track_funnel_type in the database
 */
export const FUNNEL_TYPES = {
	BODENRICHTWERT: "Bodenrichtwert",
	IMMOBILIENBEWERTUNG: "Immobilienbewertung",
	MAKLEREMPFEHLUNG: "Maklerempfehlung",
} as const;

export type FunnelType = (typeof FUNNEL_TYPES)[keyof typeof FUNNEL_TYPES];

/**
 * Type guard to check if a string is a valid FunnelType
 */
export function isFunnelType(value: string): value is FunnelType {
	return Object.values(FUNNEL_TYPES).includes(value as FunnelType);
}
