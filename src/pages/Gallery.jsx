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
      <div className="gallery-grid">
        {images.map((img, i) => (
          <img key={i} src={img.url} alt={img.caption || "BITSA event photo"} onClick={() => setActive(img.url)} />
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <img src={active} alt="Enlarged BITSA event photo" />
        </div>
      )}
    </section>
  );
}
