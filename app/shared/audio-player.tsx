"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Album } from "./content";

type SceneImage = {
  src: string;
  alt: string;
};

type AudioPlayerProps = {
  albums: Album[];
  defaultAlbumId?: string;
  sceneImage?: SceneImage;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ albums, defaultAlbumId, sceneImage }: AudioPlayerProps) {
  const initialAlbum =
    albums.find((album) => album.id === (defaultAlbumId ?? albums[0]?.id)) ?? albums[0];

  const [activeAlbumId, setActiveAlbumId] = useState(initialAlbum?.id ?? "");
  const [currentTrackId, setCurrentTrackId] = useState(initialAlbum?.tracks[0]?.id ?? "");
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

  const tracks = activeAlbum?.tracks ?? [];

  useEffect(() => {
    const album = albums.find((item) => item.id === activeAlbumId) ?? albums[0];
    if (!album?.tracks[0]) return;
    setCurrentTrackId(album.tracks[0].id);
    setQuery("");
    shouldAutoplay.current = false;
  }, [activeAlbumId, albums]);

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

  const playTrack = useCallback(
    (trackId: string) => {
      if (trackId === currentTrackId) {
        togglePlay();
        return;
      }

      shouldAutoplay.current = true;
      setCurrentTrackId(trackId);
    },
    [currentTrackId, togglePlay],
  );

  const playAdjacent = useCallback(
    (offset: number) => {
      if (currentIndex === -1) return;
      const nextIndex = (currentIndex + offset + tracks.length) % tracks.length;
      playTrack(tracks[nextIndex].id);
    },
    [currentIndex, playTrack, tracks],
  );

  const selectAlbum = useCallback((albumId: string) => {
    if (albumId === activeAlbumId) return;
    shouldAutoplay.current = false;
    setActiveAlbumId(albumId);
  }, [activeAlbumId]);

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

  const artwork = sceneImage ? null : activeAlbum.cover;

  return (
    <section className={`player-block${sceneImage ? " player-block--with-scene" : ""}`}>
      {sceneImage && (
        <aside className="player-scene-panel">
          <div className="player-scene-image">
            <Image
              src={sceneImage.src}
              alt={sceneImage.alt}
              fill
              sizes="(max-width: 860px) 100vw, 320px"
            />
          </div>
        </aside>
      )}

      <section className="glass-panel player-shell">
        <audio ref={audioRef} preload="metadata" className="player-audio-hidden">
          <source src={currentTrack.src} type="audio/mpeg" />
        </audio>

        <div className="player-source-picker">
          <div className="player-source-head">
            <p className="player-source-label">Choisir la collection</p>
            <label className="sr-only" htmlFor="player-source-select">
              Choisir album ou singles
            </label>
            <select
              id="player-source-select"
              className="player-source-select"
              value={activeAlbum.id}
              onChange={(event) => selectAlbum(event.target.value)}
            >
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.kind === "album" ? "Album" : "Singles"} — {album.title} ({album.tracks.length}{" "}
                  titres)
                </option>
              ))}
            </select>
          </div>

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
                <span className="player-source-option-meta">
                  {album.kind === "singles"
                    ? "Premieres musiques"
                    : "Nouvel album"}{" "}
                  · {album.tracks.length} titres
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="player-head">
          {artwork && (
            <div className="player-artwork">
              <Image src={artwork} alt={activeAlbum.title} fill sizes="96px" />
            </div>
          )}
          <div className="player-track-meta">
            <p className="eyebrow">{activeAlbum.title}</p>
            <h3>{currentTrack.title}</h3>
            <p className="muted">{currentTrack.subtitle}</p>
            <div className="player-track-badges">
              <span className="player-lang-pill">{currentTrack.language.toUpperCase()}</span>
              <span className="player-lang-pill player-lang-pill--soft">
                {currentIndex + 1} / {tracks.length}
              </span>
            </div>
          </div>
        </div>

        <div className="player-controls-row">
          <button
            type="button"
            className="player-btn player-btn--ghost"
            onClick={() => playAdjacent(-1)}
            aria-label="Morceau precedent"
          >
            Prev
          </button>
          <button
            type="button"
            className="player-btn player-btn--play"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Lecture"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            className="player-btn player-btn--ghost"
            onClick={() => playAdjacent(1)}
            aria-label="Morceau suivant"
          >
            Next
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

        <div className="player-playlist-head">
          <p className="player-playlist-title">
            {activeAlbum.subtitle} ({tracks.length})
          </p>
          <input
            type="search"
            className="player-search"
            placeholder="Chercher un titre..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Filtrer la playlist"
          />
        </div>

        <ul className="track-list">
          {filteredTracks.map((track, index) => (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => playTrack(track.id)}
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
      </section>
    </section>
  );
}
