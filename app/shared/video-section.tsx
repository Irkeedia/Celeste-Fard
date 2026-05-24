"use client";

import { useMemo, useState } from "react";
import type { VideoClip } from "./content";

type VideoSectionProps = {
  videos: VideoClip[];
};

type VideoPreviewProps = {
  src: string;
  title: string;
  className: string;
  onError: () => void;
};

function VideoPreview({ src, title, className, onError }: VideoPreviewProps) {
  return (
    <video
      src={src}
      className={className}
      muted
      playsInline
      preload="metadata"
      aria-label={title}
      onError={onError}
    />
  );
}

export function VideoSection({ videos }: VideoSectionProps) {
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});

  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeId) ?? videos[0],
    [activeId, videos],
  );

  const markError = (videoId: string) => {
    setLoadErrors((prev) => ({
      ...prev,
      [videoId]: true,
    }));
  };

  if (!activeVideo) {
    return null;
  }

  const activeHasError = loadErrors[activeVideo.id];

  return (
    <div className="video-section-layout video-section-layout--short">
      <div className="video-short-stage">
        <div className="video-feature-frame">
          {!activeHasError ? (
            <video
              key={activeVideo.src}
              className="video-player"
              controls
              playsInline
              preload="metadata"
              onError={() => markError(activeVideo.id)}
            >
              <source src={activeVideo.src} type="video/mp4" />
            </video>
          ) : (
            <div className="video-fallback">
              <div className="video-fallback-copy">
                <p className="video-fallback-title">{activeVideo.title}</p>
                <p className="video-fallback-hint">
                  Video bientot disponible — ajoute le fichier dans{" "}
                  <code>public/video/</code>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="video-short-side">
        <div className="video-feature-meta">
          <h3>{activeVideo.title}</h3>
          <p className="muted">{activeVideo.caption}</p>
        </div>

        <div className="video-picker" role="tablist" aria-label="Choisir un clip video">
          {videos.map((video) => (
            <button
              key={video.id}
              type="button"
              role="tab"
              aria-selected={video.id === activeVideo.id}
              className={`video-picker-card ${video.id === activeVideo.id ? "active" : ""}`}
              onClick={() => setActiveId(video.id)}
            >
              <span className="video-picker-thumb">
                {!loadErrors[video.id] ? (
                  <VideoPreview
                    src={video.src}
                    title={video.title}
                    className="video-picker-preview"
                    onError={() => markError(video.id)}
                  />
                ) : (
                  <span className="video-picker-placeholder" aria-hidden />
                )}
                <span className="video-picker-play" aria-hidden>
                  Play
                </span>
              </span>
              <span className="video-picker-text">
                <strong>{video.title}</strong>
                <small>{video.caption}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
