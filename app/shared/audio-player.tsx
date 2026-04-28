"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Track } from "./content";

type AudioPlayerProps = {
  tracks: Track[];
};

export function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [currentTrackId, setCurrentTrackId] = useState(tracks[0]?.id ?? "");

  const currentTrack = useMemo(
    () => tracks.find((track) => track.id === currentTrackId) ?? tracks[0],
    [currentTrackId, tracks],
  );

  if (!currentTrack) {
    return null;
  }

  return (
    <section className="glass-panel player-shell">
      <div className="player-cover-wrap">
        <Image
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="player-cover"
          fill
          sizes="(max-width: 860px) 100vw, 320px"
        />
      </div>
      <div className="player-content">
        <p className="eyebrow">Lecture en direct</p>
        <p className="muted">Je chante en francais, italien et anglais selon mon humeur creative.</p>
        <h3>{currentTrack.title}</h3>
        <p className="muted">{currentTrack.subtitle}</p>
        <audio key={currentTrack.id} controls preload="none" className="native-player">
          <source src={currentTrack.src} type="audio/mpeg" />
          Votre navigateur ne supporte pas la lecture audio.
        </audio>
        <ul className="track-list">
          {tracks.map((track) => (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => setCurrentTrackId(track.id)}
                className={`track-item ${track.id === currentTrack.id ? "selected" : ""}`}
              >
                <span>
                  {track.id} - {track.title}
                </span>
                <span>
                  {track.language.toUpperCase()} - {track.duration}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
