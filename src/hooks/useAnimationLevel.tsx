import { useDeviceCapability } from "./useDeviceCapability";

export const useAnimationLevel = () => {
  const { isHighEnd, isMobile } = useDeviceCapability();

  if (!isHighEnd && isMobile) return "none";    // Low-end mobile → no GSAP
  if (isHighEnd && isMobile) return "lite";     // High-end mobile → minimal
  return "full";                                // Desktop → full experience 
};
