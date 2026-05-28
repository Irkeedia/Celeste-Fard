"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VideoClip } from "./content";

type VideoSectionProps = {
  videos: VideoClip[];
};

type VideoThumbProps = {
  poster?: string;
  isActive: boolean;
};

function VideoThumb({ poster, isActive }: VideoThumbProps) {
  return (
    <>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- poster statique local
        <img src={poster} alt="" className="video-picker-poster" aria-hidden />
      ) : (
        <span className="video-picker-placeholder" aria-hidden />
      )}
      <span className={`video-picker-play ${isActive ? "is-active" : ""}`} aria-hidden>
        {isActive ? "Lecture" : "Voir"}
      </span>
    </>
  );
}

export function VideoSection({ videos }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});
  const [isReady, setIsReady] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeId) ?? videos[0],
    [activeId, videos],
  );

  const markError = useCallback((videoId: string) => {
    setLoadErrors((prev) => ({
      ...prev,
      [videoId]: true,
    }));
    setIsReady(true);
    setIsSwitching(false);
  }, []);

  const selectVideo = useCallback(
    (videoId: string) => {
      if (videoId === activeId) return;
      videoRef.current?.pause();
      setIsReady(false);
      setIsSwitching(true);
      setActiveId(videoId);
    },
    [activeId],
  );

  const handleLoadStart = () => {
    setIsReady(false);
    setIsSwitching(true);
  };

  const handleCanPlay = () => {
    setIsReady(true);
    setIsSwitching(false);
  };

  const handleWaiting = () => {
    if (isReady) setIsSwitching(true);
  };

  const handlePlaying = () => {
    setIsReady(true);
    setIsSwitching(false);
  };

  // Au premier chargement, le navigateur peut émettre `canplay` avant que React
  // n'attache les handlers — on resynchronise l'état depuis readyState.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncReadyState = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setIsReady(true);
        setIsSwitching(false);
      }
    };

    syncReadyState();
    const rafId = requestAnimationFrame(syncReadyState);

    video.addEventListener("loadeddata", syncReadyState);
    video.addEventListener("canplay", syncReadyState);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadeddata", syncReadyState);
      video.removeEventListener("canplay", syncReadyState);
    };
  }, [activeVideo.id]);

  if (!activeVideo) {
    return null;
  }

  const activeHasError = loadErrors[activeVideo.id];
  const showPoster = activeVideo.poster && (!isReady || isSwitching);

  return (
    <div className="video-section-layout">
      <div className="video-stage">
        <div className={`video-feature-frame ${isSwitching ? "is-switching" : ""} ${isReady ? "is-ready" : ""}`}>
          {!activeHasError ? (
            <>
              {activeVideo.poster ? (
                // eslint-disable-next-line @next/next/no-img-element -- poster statique local
                <img
                  src={activeVideo.poster}
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
                key={activeVideo.id}
                className="video-player"
                src={activeVideo.src}
                controls
                playsInline
                preload="auto"
                poster={activeVideo.poster}
                onLoadStart={handleLoadStart}
                onCanPlay={handleCanPlay}
                onWaiting={handleWaiting}
                onPlaying={handlePlaying}
                onError={() => markError(activeVideo.id)}
              />
            </>
          ) : (
            <div className="video-fallback">
              <div className="video-fallback-copy">
                <p className="video-fallback-title">{activeVideo.title}</p>
                <p className="video-fallback-hint">
                  Video bientot disponible, ajoute le fichier dans <code>public/video/</code>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="video-feature-meta">
          <h3>{activeVideo.title}</h3>
          <p className="muted">{activeVideo.caption}</p>
        </div>
      </div>

      <div className="video-picker" role="tablist" aria-label="Choisir un clip video">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            role="tab"
            aria-selected={video.id === activeVideo.id}
            className={`video-picker-card ${video.id === activeVideo.id ? "active" : ""}`}
            onClick={() => selectVideo(video.id)}
          >
            <span className="video-picker-thumb">
              {!loadErrors[video.id] ? (
                <VideoThumb poster={video.poster} isActive={video.id === activeVideo.id} />
              ) : (
                <span className="video-picker-placeholder" aria-hidden />
              )}
            </span>
            <span className="video-picker-text">
              <strong>{video.title}</strong>
              <small>{video.caption}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
