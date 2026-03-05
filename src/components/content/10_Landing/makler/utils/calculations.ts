export function calculateMaklerCount(einwohner: number): number {
  return Math.round(einwohner / 3200 / 10) * 10;
}
