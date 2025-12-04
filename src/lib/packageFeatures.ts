// Fixed package features for one-way trips

export const FIXED_PACKAGE_FEATURES = [
  'Assured Cab (Confirmed Cab Arrival)',
  'Verified Driver',
  'Includes One Pick Up & One Drop Within City at Your Doorstep',
  'Hygiene & Clean Cabs',
  'Fixed Fare – No KMs Limitations',
  '24*7 Customer Support On Call',
  'Parking Charges Will Be Extra'
];

export const PACKAGE_FEATURE_ICONS: Record<string, string> = {
  'Assured Cab (Confirmed Cab Arrival)': '✅',
  'Verified Driver': '👨‍✈️',
  'Includes One Pick Up & One Drop Within City at Your Doorstep': '🚪',
  'Hygiene & Clean Cabs': '🧽',
  'Fixed Fare – No KMs Limitations': '💰',
  '24*7 Customer Support On Call': '📞',
  'Parking Charges Will Be Extra': '🅿️'
};

/**
 * Get all features for a one-way package (fixed + cab features)
 */
export function getAllPackageFeatures(cabFeatures: string[] = []): {
  packageFeatures: string[];
  cabFeatures: string[];
} {
  return {
    packageFeatures: FIXED_PACKAGE_FEATURES,
    cabFeatures: cabFeatures
  };
}