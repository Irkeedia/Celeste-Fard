"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Photo } from "./content";

type PhotoCarousel2Props = {
  photos: Photo[];
};

export function PhotoCarousel2({ photos }: PhotoCarousel2Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto = useMemo(
    () => (selectedIndex === null ? null : photos[selectedIndex]),
    [photos, selectedIndex],
  );

  return (
    <>
      <section className="photo-carousel-2" aria-label="Carousel 2 — galerie photos de Celeste Fard">
        {photos.map((photo, index) => (
          <button
            type="button"
            key={photo.src}
            className="photo-tile"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Zoomer la photo ${photo.title}`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes="(max-width: 768px) 85vw, 28vw"
              className="photo-image"
            />
            <span className="photo-caption">{photo.title}</span>
          </button>
        ))}
      </section>

      {selectedPhoto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo agrandie ${selectedPhoto.title}`}
        >
          <button type="button" className="lightbox-close" onClick={() => setSelectedIndex(null)}>
            Fermer
          </button>
          <div className="lightbox-frame">
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              fill
              sizes="90vw"
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </>
  );
}
