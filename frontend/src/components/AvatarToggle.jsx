import React, { useEffect, useRef, useState } from 'react';

/**
 * AvatarToggle
 *
 * Production-ready avatar toggle switch.
 * - Pill-shaped track (`relative`).
 * - Avatar image is the ONLY knob inside the track.
 * - Movement uses transform-only translateX based on real layout measurements.
 */
const AvatarToggle = ({ avatarUrl, isActive, onSelect, name }) => {
  const trackRef = useRef(null);
  const avatarRef = useRef(null);
  const [distance, setDistance] = useState(0);

  // Measure current layout and compute how far the avatar needs to travel
  // to move from the left inner edge to the right inner edge of the track.
  useEffect(() => {
    const measure = () => {
      const trackEl = trackRef.current;
      const avatarEl = avatarRef.current;
      if (!trackEl || !avatarEl) return;

      const trackWidth = trackEl.clientWidth;
      const avatarWidth = avatarEl.clientWidth;
      // offsetLeft is the distance from the track's left edge to the avatar's left edge.
      const leftOffset = avatarEl.offsetLeft;

      const computedDistance = trackWidth - avatarWidth - leftOffset * 2;
      setDistance(computedDistance > 0 ? computedDistance : 0);
    };

    // Initial measurement after mount
    measure();

    // Recalculate on resize using ResizeObserver when available
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(trackRef.current);
    } else {
      window.addEventListener('resize', measure);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', measure);
      }
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.();
    }
  };

  const translateX = isActive ? distance : 0;

  return (
    <button
      ref={trackRef}
      type="button"
      role="switch"
      aria-checked={isActive}
      aria-label={name ? `Activate avatar ${name}` : 'Toggle avatar'}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`relative w-full h-12 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${
        isActive ? 'bg-slate-800' : 'bg-slate-900'
      }`}
    >
      {/* Avatar knob is the ONLY moving element. */}
      <div
        ref={avatarRef}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full overflow-hidden bg-slate-700 shadow-md transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translateX(${translateX}px) translateY(-50%)`
        }}
      >
        <img src={avatarUrl} alt={name || 'avatar'} className="h-full w-full object-cover" />
      </div>
    </button>
  );
};

export default AvatarToggle;

