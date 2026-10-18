"use client";

import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/**
 * Fixed, full-viewport animated background.
 * Plays a looping video when `videoSrc` is provided (detected server-side in
 * `public/bg/`), otherwise shows the CSS aurora + moving grid.
 * Static for reduced-motion users.
 */
export function SiteBackground({ videoSrc }: { videoSrc?: string }) {
  const reduce = useReducedMotionSafe();
  const showVideo = Boolean(videoSrc) && !reduce;
  const type = videoSrc?.endsWith(".webm") ? "video/webm" : "video/mp4";

  return (
    <div className="site-bg" aria-hidden>
      <div className="site-bg__aurora" />
      <div className="site-bg__grid" />
      {showVideo && (
        <video
          className="site-bg__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/og.jpg"
        >
          <source src={videoSrc} type={type} />
        </video>
      )}
      <div className="site-bg__veil" />
    </div>
  );
}
