import { useState } from 'react';

interface DeviceCapability {
  isHighEnd: boolean;
  isMobile: boolean;
  reason?: string; // For debugging
}

/**
 * Detects device capabilities and returns whether to enable full effects.
 * On desktop: Always high-end (true)
 * On mobile: Only high-end devices get full effects (true), others get optimized (false)
 * 
 * Detection is done once on mount with zero runtime overhead.
 */
export const useDeviceCapability = (): DeviceCapability => {
  const [capability] = useState<DeviceCapability>(() => {
    // SSR safety - return conservative defaults
    if (typeof window === 'undefined') {
      return { isHighEnd: false, isMobile: true, reason: 'SSR' };
    }

    const ua = navigator.userAgent || '';

    // Check if mobile device - defensive with fallback
    let isMobile = false;
    try {
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      // Fallback to screen size check if regex doesn't match
      if (!isMobile && typeof window !== 'undefined') {
        isMobile = window.matchMedia('(max-width: 768px)').matches;
      }
    } catch (e) {
      // If anything fails, assume mobile for safety
      isMobile = true;
    }

    // Desktop always gets full effects
    if (!isMobile) {
      return { isHighEnd: true, isMobile: false, reason: 'desktop' };
    }

    // Mobile: Check if high-end
    const nav = navigator as any;

    // Respect user preferences first
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return { isHighEnd: false, isMobile: true, reason: 'user-preference' };
      }
    } catch (e) {
      // matchMedia not supported, continue
    }

    // Check data saver
    try {
      if (nav.connection?.saveData) {
        return { isHighEnd: false, isMobile: true, reason: 'data-saver' };
      }
    } catch (e) {
      // Connection API not supported, continue
    }

    // Hardware checks for high-end mobile devices
    const deviceMemory = nav.deviceMemory; // GB of RAM
    const hardwareConcurrency = nav.hardwareConcurrency; // CPU cores

    // Conservative high-end detection
    if (typeof deviceMemory === 'number' && deviceMemory >= 8) {
      return { isHighEnd: true, isMobile: true, reason: 'ram-8gb+' };
    }

    if (typeof hardwareConcurrency === 'number' && hardwareConcurrency >= 8) {
      return { isHighEnd: true, isMobile: true, reason: 'cpu-8core+' };
    }

    // Flagship device detection via user agent
    // Wrapped in try-catch for safety
    try {
      // iPhone 14+ (iPhone14, iPhone15, iPhone16, etc.)
      const isNewIPhone = /iPhone1[4-9]|iPhone[2-9][0-9]/i.test(ua);

      // iPad Pro
      const isIPadPro = /iPad/i.test(ua) && /.*Pro/i.test(ua);

      // Samsung Galaxy S20+ (SM-S901, SM-S908, SM-S911, etc. for S22, S23, S24)
      // Also includes SM-S90X for S20 series, SM-S91X for S21, etc.
      const isHighEndSamsung = /SM-S9[0-9]{2}|SM-S[2-9][0-9]{3}/i.test(ua);

      // Google Pixel 7, 8, 9 and above
      const isHighEndPixel = /Pixel [7-9]|Pixel [1-9][0-9]/i.test(ua);

      if (isNewIPhone || isIPadPro || isHighEndSamsung || isHighEndPixel) {
        return { isHighEnd: true, isMobile: true, reason: 'flagship-device' };
      }
    } catch (e) {
      // Regex failed somehow, continue to default
    }

    // Default: Mobile gets optimized experience
    return { isHighEnd: false, isMobile: true, reason: 'default-mobile' };
  });

  return capability;
};

/**
 * Simplified hook that just returns whether to enable full effects.
 * Use this if you don't need the extra metadata.
 */
export const useHighEndDevice = (): boolean => {
  const { isHighEnd } = useDeviceCapability();
  return isHighEnd;
};
