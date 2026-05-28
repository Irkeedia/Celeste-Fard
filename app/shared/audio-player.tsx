"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Album, LatestRelease } from "./content";

type AudioPlayerProps = {
  albums: Album[];
  defaultAlbumId?: string;
  defaultTrackId?: string;
  latestRelease?: LatestRelease;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function findTrackInAlbums(albums: Album[], trackId: string) {
  for (const album of albums) {
    const track = album.tracks.find((item) => item.id === trackId);
    if (track) return { album, track };
  }
  return null;
}

export function AudioPlayer({
  albums,
  defaultAlbumId,
  defaultTrackId,
  latestRelease,
}: AudioPlayerProps) {
  const defaultContext = useMemo(() => {
    if (defaultTrackId) {
      const match = findTrackInAlbums(albums, defaultTrackId);
      if (match) return match;
    }

    const album =
      albums.find((item) => item.id === (defaultAlbumId ?? albums[0]?.id)) ?? albums[0];
    const track = album?.tracks[0];
    return album && track ? { album, track } : null;
  }, [albums, defaultAlbumId, defaultTrackId]);

  const [activeAlbumId, setActiveAlbumId] = useState(defaultContext?.album.id ?? "");
  const [currentTrackId, setCurrentTrackId] = useState(defaultContext?.track.id ?? "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [query, setQuery] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoplay = useRef(false);

  const activeAlbum = useMemo(
    () => albums.find((album) => album.id === activeAlbumId) ?? albums[0],
    [activeAlbumId, albums],
  );

  const tracks = useMemo(() => activeAlbum?.tracks ?? [], [activeAlbum]);

  const currentTrack = useMemo(
    () => tracks.find((track) => track.id === currentTrackId) ?? tracks[0],
    [currentTrackId, tracks],
  );

  const currentIndex = useMemo(
    () => tracks.findIndex((track) => track.id === currentTrack?.id),
    [currentTrack?.id, tracks],
  );

  const filteredTracks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return tracks;
    return tracks.filter(
      (track) =>
        track.title.toLowerCase().includes(normalized) ||
        track.subtitle.toLowerCase().includes(normalized) ||
        track.language.toLowerCase().includes(normalized),
    );
  }, [query, tracks]);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;

    if (el.paused) {
      void el.play().catch(() => setIsPlaying(false));
      return;
    }

    el.pause();
  }, []);

  const playTrackById = useCallback(
    (trackId: string) => {
      const match = findTrackInAlbums(albums, trackId);
      if (!match) return;

      if (match.album.id !== activeAlbumId) {
        shouldAutoplay.current = true;
        setActiveAlbumId(match.album.id);
        setCurrentTrackId(trackId);
        setQuery("");
        return;
      }

      if (trackId === currentTrackId) {
        togglePlay();
        return;
      }

      shouldAutoplay.current = true;
      setCurrentTrackId(trackId);
    },
    [activeAlbumId, albums, currentTrackId, togglePlay],
  );

  const selectAlbum = useCallback(
    (albumId: string) => {
      if (albumId === activeAlbumId) return;

      const album = albums.find((item) => item.id === albumId) ?? albums[0];
      shouldAutoplay.current = false;
      setActiveAlbumId(albumId);
      setCurrentTrackId(album?.tracks[0]?.id ?? "");
      setQuery("");
    },
    [activeAlbumId, albums],
  );

  const playAdjacent = useCallback(
    (offset: number) => {
      if (currentIndex === -1) return;
      const nextIndex = (currentIndex + offset + tracks.length) % tracks.length;
      playTrackById(tracks[nextIndex].id);
    },
    [currentIndex, playTrackById, tracks],
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTimeUpdate = () => setCurrentTime(el.currentTime);
    const onLoadedMetadata = () => setDuration(el.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (tracks.length <= 1) {
        el.currentTime = 0;
        void el.play().catch(() => setIsPlaying(false));
        return;
      }

      const idx = tracks.findIndex((track) => track.id === currentTrackId);
      const next = tracks[(idx + 1) % tracks.length];
      if (!next) return;
      shouldAutoplay.current = true;
      setCurrentTrackId(next.id);
    };

    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [currentTrackId, tracks]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !currentTrack?.src) return;

    el.pause();
    el.load();
    setCurrentTime(0);
    setDuration(0);

    if (!shouldAutoplay.current) return;

    shouldAutoplay.current = false;
    void el.play().catch(() => setIsPlaying(false));
  }, [currentTrack?.src]);

  const handleSeek = (value: number) => {
    const el = audioRef.current;
    if (!el || !Number.isFinite(value)) return;
    el.currentTime = value;
    setCurrentTime(value);
  };

  if (!activeAlbum || !currentTrack) {
    return null;
  }

  const isLatestPlaying =
    latestRelease != null &&
    currentTrack.id === latestRelease.trackId &&
    isPlaying;

  return (
    <div className="vinyl-player-wrap">
      {latestRelease && (
        <article className="glass-panel player-featured">
          <div className="player-featured-copy">
            <p className="eyebrow">{latestRelease.eyebrow}</p>
            <h2>{latestRelease.title}</h2>
            <p className="player-featured-lead">{latestRelease.description}</p>
          </div>
          <div className="player-featured-actions">
            <span className="player-featured-badge">Critique de la guerre</span>
            <button
              type="button"
              className="cta-primary"
              onClick={() => playTrackById(latestRelease.trackId)}
            >
              {isLatestPlaying ? "En lecture" : "Ecouter maintenant"}
            </button>
          </div>
        </article>
      )}

      <section className="glass-panel vinyl-player">
        <audio
          ref={audioRef}
          src={currentTrack.src}
          preload="metadata"
          className="player-audio-hidden"
        />

        <div className="vinyl-player-top">
          <div className="vinyl-stage" aria-hidden>
            <div className={`vinyl-disc ${isPlaying ? "is-spinning" : ""}`}>
              <div className="vinyl-grooves" />
              <div className="vinyl-shine" />
              <div className="vinyl-label">
                <Image
                  src={activeAlbum.cover}
                  alt=""
                  fill
                  sizes="120px"
                  className="vinyl-label-art"
                />
              </div>
            </div>
            <div className={`vinyl-arm ${isPlaying ? "is-playing" : ""}`}>
              <span className="vinyl-arm-head" />
              <span className="vinyl-arm-body" />
            </div>
          </div>

          <div className="vinyl-now-playing">
            <p className="eyebrow">{activeAlbum.title}</p>
            <h3>{currentTrack.title}</h3>
            <p className="muted">{currentTrack.subtitle}</p>
            <div className="player-track-badges">
              <span className="player-lang-pill">{currentTrack.language.toUpperCase()}</span>
              <span className="player-lang-pill player-lang-pill--soft">
                {currentIndex + 1} / {tracks.length}
              </span>
            </div>

            <div className="vinyl-controls">
              <button
                type="button"
                className="vinyl-control-btn"
                onClick={() => playAdjacent(-1)}
                aria-label="Morceau precedent"
              >
                ‹
              </button>
              <button
                type="button"
                className="vinyl-control-btn vinyl-control-btn--main"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Lecture"}
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>
              <button
                type="button"
                className="vinyl-control-btn"
                onClick={() => playAdjacent(1)}
                aria-label="Morceau suivant"
              >
                ›
              </button>
            </div>

            <div className="player-progress-row">
              <span className="player-time">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="player-progress"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={(event) => handleSeek(Number(event.target.value))}
                aria-label="Position dans le morceau"
              />
              <span className="player-time">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="vinyl-player-bottom">
          <div className="player-source-switch" role="tablist" aria-label="Album ou singles">
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                role="tab"
                aria-selected={album.id === activeAlbum.id}
                className={`player-source-option ${album.id === activeAlbum.id ? "active" : ""}`}
                onClick={() => selectAlbum(album.id)}
              >
                <span className="player-source-option-kind">
                  {album.kind === "album" ? "Album" : "Singles"}
                </span>
                <span className="player-source-option-title">{album.title}</span>
                <span className="player-source-option-meta">{album.tracks.length} titres</span>
              </button>
            ))}
          </div>

          <div className="player-playlist-head">
            <p className="player-playlist-title">Playlist</p>
            <input
              type="search"
              className="player-search"
              placeholder="Chercher un titre..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Filtrer la playlist"
            />
          </div>

          <ul className="track-list track-list--vinyl">
            {filteredTracks.map((track, index) => (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => playTrackById(track.id)}
                  className={`track-item ${track.id === currentTrack.id ? "selected" : ""} ${
                    track.id === currentTrack.id && isPlaying ? "playing" : ""
                  }`}
                >
                  <span className="track-item-main">
                    <span className="track-item-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="track-item-text">
                      <strong>{track.title}</strong>
                      <small>{track.subtitle}</small>
                    </span>
                  </span>
                  <span className="track-item-meta">
                    {track.language.toUpperCase()} · {track.duration}
                  </span>
                </button>
              </li>
            ))}
            {filteredTracks.length === 0 && (
              <li className="player-empty">Aucun morceau ne correspond a ta recherche.</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
