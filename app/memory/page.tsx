
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fireworks from "@/components/Fireworks";

export default function MemoryPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState(12);
  const [celebrating, setCelebrating] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn một file hình ảnh!");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Ảnh phải nhỏ hơn 10MB!");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") return;

      const image = new Image();

      image.onload = () => {
        const maxDimension = 1200;
        const scale = Math.min(
          1,
          maxDimension / Math.max(image.width, image.height)
        );

        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);

        const compressedCanvas = document.createElement("canvas");
        compressedCanvas.width = width;
        compressedCanvas.height = height;

        const context = compressedCanvas.getContext("2d");
        if (!context) return;

        context.drawImage(image, 0, 0, width, height);

        const compressedImage = compressedCanvas.toDataURL(
          "image/jpeg",
          0.82
        );

        try {
          localStorage.setItem("pixel-love-photo", compressedImage);
          setPhoto(compressedImage);
          setCelebrating(true);
          setMessageVisible(true);

          window.setTimeout(() => {
            setMessageVisible(false);
          }, 6500);
        } catch {
          alert(
            "Ảnh có dung lượng quá lớn để lưu trong trình duyệt. Vui lòng chọn ảnh khác."
          );
        }
      };

      image.onerror = () => {
        alert("Không thể đọc hình ảnh này!");
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  useEffect(() => {
    if (!photo || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    const image = new Image();

    image.onload = () => {
      const width = Math.max(1, Math.floor(image.width / pixelSize));
      const height = Math.max(1, Math.floor(image.height / pixelSize));

      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, width, height);
    };

    image.src = photo;
  }, [photo, pixelSize]);

  return (
    <main className="love-page memory-page">
      <Fireworks active={celebrating} />

      <header className="top-header">
        <Link href="/" className="pixel-logo">
          ♥ PIXEL LOVE ♥
        </Link>
        <div className="online-status">
          <span />
          OUR MEMORY
        </div>
      </header>

      <section className="memory-content">
        <div className="section-label">
          <span>01</span> OUR SPECIAL MEMORY
        </div>

        <h1 className="memory-title">
          A MOMENT
          <span>WORTH KEEPING</span>
        </h1>

        <p className="memory-description">
          Hãy chọn một bức ảnh thật đặc biệt.
          <br />
          Anh muốn biến khoảnh khắc ấy thành một điều thật đáng nhớ.
        </p>

        <div className={`memory-frame ${photo ? "has-photo" : ""}`}>
          {photo ? (
            <canvas
              ref={canvasRef}
              className="memory-canvas"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <div className="memory-placeholder">
              <div className="placeholder-heart">♥</div>
              <strong>YOUR MEMORY HERE</strong>
              <span>EVERY PICTURE TELLS A STORY</span>
            </div>
          )}
        </div>

        <label className="upload-button memory-upload">
          ✦ {photo ? "CHANGE YOUR PHOTO" : "CHOOSE A SPECIAL PHOTO"}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            hidden
          />
        </label>

        {photo && (
          <div className="memory-slider">
            <label htmlFor="pixel-size">
              PIXEL SIZE: {pixelSize}px
            </label>
            <input
              id="pixel-size"
              type="range"
              min="4"
              max="32"
              step="2"
              value={pixelSize}
              onChange={(event) =>
                setPixelSize(Number(event.target.value))
              }
            />
          </div>
        )}

        <p className="privacy-note">
          ♥ Ảnh chỉ được lưu trên trình duyệt của thiết bị này.
        </p>

        {messageVisible && (
          <div className="memory-celebration">
            <div className="celebration-symbol">♥ ✦ ♥</div>
            <h2>WHAT A BEAUTIFUL MEMORY!</h2>
            <p>
              Có thể chỉ là một bức ảnh,
              <br />
              nhưng với anh, đó là một khoảnh khắc đáng trân trọng.
              <br />
              Cảm ơn em vì đã xuất hiện trong thế giới của anh.
            </p>
          </div>
        )}

        {photo && (
          <Link href="/question" className="home-primary-button memory-next">
            TIẾP TỤC HÀNH TRÌNH ♥
          </Link>
        )}
      </section>

      <footer className="love-footer">
        <div className="footer-heart">♥</div>
        <p>ONE PICTURE. A THOUSAND FEELINGS.</p>
        <span>MADE WITH LOVE, JUST FOR YOU.</span>
      </footer>
    </main>
  );
}
