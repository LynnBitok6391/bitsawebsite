import React, { useState, useEffect } from "react";
import "../styles/gallery.css";
import dummyGallery from "../data/dummy_gallery.json";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("bitsaGallery")) || [];
    setImages(storedImages.length > 0 ? storedImages : dummyGallery);
  }, []);

  return (
    <section className="gallery-page">
      <h2>BITSA Moments</h2>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "2rem" }}>
        Capturing memories from our events, workshops, and community gatherings
      </p>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div key={i} className="gallery-item" onClick={() => setActive(img)}>
            <img src={img.url} alt={img.caption || "BITSA event photo"} />
            <div className="gallery-caption">
              <p>{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={active.url} alt={active.caption} />
            <p className="lightbox-caption">{active.caption}</p>
            <button className="close-lightbox" onClick={() => setActive(null)}>×</button>
          </div>
        </div>
      )}
    </section>
  );
}
