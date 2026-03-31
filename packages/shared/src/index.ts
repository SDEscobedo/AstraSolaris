/**
 * @astra-solaris/shared
 *
 * Shared constants, utilities, and types for the AstraSolaris platform.
 */

// ============================================================================
// Constants
// ============================================================================

/**
 * Application metadata
 */
export const APP_NAME = 'AstraSolaris';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'Open-source platform for astronomical simulation';

/**
 * Astronomical constants (in SI units unless otherwise noted)
 */
export const ASTRONOMICAL_CONSTANTS = {
  /** Astronomical Unit in kilometers */
  AU_KM: 149_597_870.7,
  /** Astronomical Unit in meters */
  AU_M: 149_597_870_700,
  /** Speed of light in m/s */
  SPEED_OF_LIGHT: 299_792_458,
  /** Gravitational constant in m³/(kg·s²) */
  G: 6.674_30e-11,
  /** Solar mass in kg */
  SOLAR_MASS: 1.989_1e30,
  /** Earth mass in kg */
  EARTH_MASS: 5.972_2e24,
  /** Earth radius in km */
  EARTH_RADIUS_KM: 6_371,
  /** Solar radius in km */
  SOLAR_RADIUS_KM: 696_340,
  /** Julian date of J2000.0 epoch */
  J2000_JD: 2_451_545.0,
  /** Seconds per day */
  SECONDS_PER_DAY: 86_400,
  /** Days per Julian year */
  DAYS_PER_JULIAN_YEAR: 365.25,
} as const;

/**
 * Celestial body identifiers
 */
export const CelestialBodyId = {
  SUN: 'sun',
  MERCURY: 'mercury',
  VENUS: 'venus',
  EARTH: 'earth',
  MOON: 'moon',
  MARS: 'mars',
  JUPITER: 'jupiter',
  SATURN: 'saturn',
  URANUS: 'uranus',
  NEPTUNE: 'neptune',
  PLUTO: 'pluto',
} as const;

/**
 * Observer reference frame types
 */
export const ObserverFrameType = {
  HELIOCENTRIC: 'heliocentric',
  GEOCENTRIC: 'geocentric',
  TOPOCENTRIC: 'topocentric',
} as const;

/**
 * Output format types for Astra scripts
 */
export const OutputType = {
  SCENE: 'scene',
  DATA: 'data',
  IMAGE: 'image',
} as const;

// ============================================================================
// Types
// ============================================================================

/**
 * Celestial body identifier type
 */
export type CelestialBodyIdType = (typeof CelestialBodyId)[keyof typeof CelestialBodyId];

/**
 * Observer frame type
 */
export type ObserverFrameTypeValue = (typeof ObserverFrameType)[keyof typeof ObserverFrameType];

/**
 * Output type value
 */
export type OutputTypeValue = (typeof OutputType)[keyof typeof OutputType];

/**
 * 3D vector representation
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Orbital elements (Keplerian)
 */
export interface OrbitalElements {
  /** Semi-major axis in AU */
  semiMajorAxis: number;
  /** Eccentricity (0-1 for elliptical orbits) */
  eccentricity: number;
  /** Inclination in degrees */
  inclination: number;
  /** Longitude of ascending node in degrees */
  longitudeOfAscendingNode: number;
  /** Argument of perihelion in degrees */
  argumentOfPerihelion: number;
  /** Mean anomaly at epoch in degrees */
  meanAnomalyAtEpoch: number;
  /** Epoch as Julian date */
  epoch: number;
}

/**
 * Celestial body data structure
 */
export interface CelestialBody {
  id: CelestialBodyIdType;
  name: string;
  type: 'star' | 'planet' | 'dwarf-planet' | 'moon' | 'asteroid' | 'comet';
  mass: number;
  radius: number;
  orbitalElements?: OrbitalElements;
  parent?: CelestialBodyIdType;
  color?: string;
  textureUrl?: string;
}

/**
 * Observer configuration
 */
export interface ObserverConfig {
  frame: ObserverFrameTypeValue;
  distance?: number;
  distanceUnit?: 'AU' | 'km' | 'm';
  showOrbits?: boolean | CelestialBodyIdType[];
  showLabels?: boolean;
  showAxes?: boolean;
  target?: CelestialBodyIdType;
}

/**
 * Scene configuration
 */
export interface SceneConfig {
  bodies: CelestialBodyIdType[];
  observer: ObserverConfig;
  time?: Date | number;
  animationSpeed?: number;
}

/**
 * Result type for operations that can fail
 */
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

/**
 * Astra script parsing result
 */
export interface AstraParseResult {
  success: boolean;
  scene?: SceneConfig;
  errors?: AstraParseError[];
}

/**
 * Astra parsing error
 */
export interface AstraParseError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Converts degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Converts AU to kilometers
 */
export function auToKm(au: number): number {
  return au * ASTRONOMICAL_CONSTANTS.AU_KM;
}

/**
 * Converts kilometers to AU
 */
export function kmToAu(km: number): number {
  return km / ASTRONOMICAL_CONSTANTS.AU_KM;
}

/**
 * Normalizes an angle to the range [0, 360)
 */
export function normalizeAngle(degrees: number): number {
  const normalized = degrees % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

/**
 * Calculates the magnitude of a 3D vector
 */
export function vectorMagnitude(v: Vector3D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

/**
 * Normalizes a 3D vector to unit length
 */
export function normalizeVector(v: Vector3D): Vector3D {
  const mag = vectorMagnitude(v);
  if (mag === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  return {
    x: v.x / mag,
    y: v.y / mag,
    z: v.z / mag,
  };
}

/**
 * Calculates the dot product of two 3D vectors
 */
export function dotProduct(a: Vector3D, b: Vector3D): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

/**
 * Calculates the cross product of two 3D vectors
 */
export function crossProduct(a: Vector3D, b: Vector3D): Vector3D {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/**
 * Converts a Date to Julian Date
 */
export function dateToJulianDate(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

/**
 * Converts Julian Date to a Date object
 */
export function julianDateToDate(jd: number): Date {
  const time = (jd - 2440587.5) * 86400000;
  return new Date(time);
}

/**
 * Creates a successful Result
 */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

/**
 * Creates a failed Result
 */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

/**
 * Type guard to check if a Result is successful
 */
export function isOk<T, E>(result: Result<T, E>): result is { ok: true; value: T } {
  return result.ok;
}

/**
 * Type guard to check if a Result is an error
 */
export function isErr<T, E>(result: Result<T, E>): result is { ok: false; error: E } {
  return !result.ok;
}

/**
 * Clamps a number between a minimum and maximum value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

/**
 * Formats a number with SI prefixes (k, M, G, etc.)
 */
export function formatWithSiPrefix(value: number, decimals = 2): string {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
  const absValue = Math.abs(value);

  if (absValue < 1000) {
    return value.toFixed(decimals);
  }

  const exponent = Math.min(Math.floor(Math.log10(absValue) / 3), prefixes.length - 1);
  const scaled = value / Math.pow(1000, exponent);

  return scaled.toFixed(decimals) + prefixes[exponent];
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Throttles a function call
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Generates a unique identifier
 */
export function generateId(prefix = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

/**
 * Deep clones an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Checks if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Safely accesses a nested property in an object
 */
export function getNestedProperty<T>(obj: Record<string, unknown>, path: string): T | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return current as T | undefined;
}