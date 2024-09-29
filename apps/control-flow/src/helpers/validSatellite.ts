export const validSatellites = ["316", "3A5", "3A6", "3A7", "GEN", "261", "262", "263", "264"];

export const isSatelliteNull = (satellite: string | null) => satellite === null;

export const isSatelliteAvailable = (satellite: string) => validSatellites.includes(satellite);

export const isSatelliteGEN = (satellite: string) => satellite === "GEN";