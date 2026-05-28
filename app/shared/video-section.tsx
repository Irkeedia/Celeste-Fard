"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { VideoClip } from "./content";

type VideoSectionProps = {
  videos: VideoClip[];
};

type VideoSlideProps = {
  video: VideoClip;
  isActive: boolean;
  hasError: boolean;
  onError: () => void;
};

function VideoSlide({ video, isActive, hasError, onError }: VideoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || hasError) return;

    const syncReadyState = () => {
      if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setIsReady(true);
        setIsSwitching(false);
      }
    };

    syncReadyState();
    const rafId = requestAnimationFrame(syncReadyState);

    el.addEventListener("loadeddata", syncReadyState);
    el.addEventListener("canplay", syncReadyState);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("loadeddata", syncReadyState);
      el.removeEventListener("canplay", syncReadyState);
    };
  }, [video.id, hasError]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || isActive) return;
    el.pause();
  }, [isActive]);

  const handlePlay = () => {
    if (!isActive) videoRef.current?.pause();
  };

  const showPoster = video.poster && (!isReady || isSwitching);

  return (
    <div className={`video-feature-frame ${isSwitching ? "is-switching" : ""} ${isReady ? "is-ready" : ""}`}>
      {!hasError ? (
        <>
          {video.poster ? (
            // eslint-disable-next-line @next/next/no-img-element -- poster statique local
            <img
              src={video.poster}
              alt=""
              className={`video-stage-poster ${showPoster ? "is-visible" : ""}`}
              aria-hidden
            />
          ) : null}
          <div className={`video-loading ${isReady ? "" : "is-visible"}`} aria-hidden>
            <span className="video-loading-ring" />
          </div>
          <video
            ref={videoRef}
            className="video-player"
            src={video.src}
            controls
            playsInline
            preload={isActive ? "auto" : "metadata"}
            poster={video.poster}
            onLoadStart={() => {
              setIsReady(false);
              setIsSwitching(true);
            }}
            onCanPlay={() => {
              setIsReady(true);
              setIsSwitching(false);
            }}
            onWaiting={() => {
              if (isReady) setIsSwitching(true);
            }}
            onPlaying={() => {
              setIsReady(true);
              setIsSwitching(false);
            }}
            onPlay={handlePlay}
            onError={onError}
          />
        </>
      ) : (
        <div className="video-fallback">
          <div className="video-fallback-copy">
            <p className="video-fallback-title">{video.title}</p>
            <p className="video-fallback-hint">
              Video bientot disponible, ajoute le fichier dans <code>public/video/</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function getClosestSlideIndex(feed: HTMLElement, slides: (HTMLElement | null)[]) {
  const feedRect = feed.getBoundingClientRect();
  const feedCenter = feedRect.top + feedRect.height / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, index) => {
    if (!slide) return;
    const rect = slide.getBoundingClientRect();
    const slideCenter = rect.top + rect.height / 2;
    const distance = Math.abs(slideCenter - feedCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

export function VideoSection({ videos }: VideoSectionProps) {
  const feedRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});

  const markError = useCallback((videoId: string) => {
    setLoadErrors((prev) => ({ ...prev, [videoId]: true }));
  }, []);

  const syncActiveIndex = useCallback(() => {
    const feed = feedRef.current;
    if (!feed) return;
    const closest = getClosestSlideIndex(feed, slideRefs.current);
    setActiveIndex((prev) => (prev === closest ? prev : closest));
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const feed = feedRef.current;
    const slide = slideRefs.current[index];
    if (!feed || !slide) return;

    setActiveIndex(index);
    feed.scrollTo({ top: slide.offsetTop, behavior: "smooth" });
  }, []);

  const pauseInactiveVideos = useCallback((keepIndex: number) => {
    slideRefs.current.forEach((slide, index) => {
      if (index === keepIndex || !slide) return;
      slide.querySelector("video")?.pause();
    });
  }, []);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncActiveIndex);
    };

    syncActiveIndex();
    feed.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      feed.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [syncActiveIndex, videos.length]);

  useEffect(() => {
    pauseInactiveVideos(activeIndex);
  }, [activeIndex, pauseInactiveVideos]);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        scrollToIndex(Math.min(activeIndex + 1, videos.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        scrollToIndex(Math.max(activeIndex - 1, 0));
      }
    };

    feed.addEventListener("keydown", onKeyDown);
    return () => feed.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, scrollToIndex, videos.length]);

  if (videos.length === 0) return null;

  const activeVideo = videos[activeIndex];
  const showScrollHint = activeIndex < videos.length - 1;

  return (
    <div className="video-feed-shell" data-active={activeIndex}>
      <div className="video-feed-ambient" aria-hidden="true" />

      <div className="video-feed-wrap">
        <div className="video-feed-border" aria-hidden="true" />
        <div
          ref={feedRef}
          className="video-feed"
          tabIndex={0}
          aria-label="Feed video vertical, scroll pour changer de clip"
        >
          {videos.map((video, index) => (
            <article
              key={video.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className={`video-feed-slide ${index === activeIndex ? "is-active" : ""}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <div className="video-feed-card">
                <VideoSlide
                  video={video}
                  isActive={index === activeIndex}
                  hasError={Boolean(loadErrors[video.id])}
                  onError={() => markError(video.id)}
                />
                <div className="video-feed-overlay">
                  <span className="video-feed-chip">
                    {String(index + 1).padStart(2, "0")}
                    <span className="video-feed-chip-sep" aria-hidden="true" />
                    {String(videos.length).padStart(2, "0")}
                  </span>
                  <div className="video-feed-meta">
                    <h3>{video.title}</h3>
                    <p>{video.caption}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showScrollHint ? (
          <div className="video-feed-hint" aria-hidden="true">
            <span className="video-feed-hint-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 5v6M9 8l3-3 3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 13v6M9 16l3 3 3-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Swipe</span>
          </div>
        ) : null}
      </div>

      <aside className="video-feed-side">
        <nav className="video-feed-rail" aria-label="Navigation entre les clips">
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              className={`video-feed-rail-dot ${index === activeIndex ? "is-active" : ""}`}
              aria-label={`Aller au clip ${video.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToIndex(index);
              }}
            >
              {video.poster ? (
                // eslint-disable-next-line @next/next/no-img-element -- vignette statique locale
                <img src={video.poster} alt="" className="video-feed-rail-thumb" aria-hidden />
              ) : null}
              <span className="video-feed-rail-ring" aria-hidden="true" />
              <span className="video-feed-rail-fill" aria-hidden="true" />
            </button>
          ))}
        </nav>
        <p className="video-feed-side-title" key={activeVideo?.id}>
          {activeVideo?.title}
        </p>
      </aside>
    </div>
  );
}
