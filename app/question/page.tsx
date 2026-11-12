
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fireworks from "@/components/Fireworks";

interface NoPosition {
  x: number;
  y: number;
}

export default function QuestionPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<NoPosition | null>(null);

  const answerAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedPhoto = localStorage.getItem("pixel-love-photo");
    if (savedPhoto) setPhoto(savedPhoto);
  }, []);

  const moveNoButton = () => {
    const area = answerAreaRef.current;
    if (!area) return;

    const buttonWidth = 120;
    const buttonHeight = 50;

    const maxX = Math.max(0, area.clientWidth - buttonWidth);
    const maxY = Math.max(0, area.clientHeight - buttonHeight);

    setNoPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  };

  return (
    <main className={`love-page question-page ${accepted ? "is-accepted" : ""}`}>
      <Fireworks active={accepted} />

      <header className="top-header">
        <Link href="/" className="pixel-logo">
          ♥ PIXEL LOVE ♥
        </Link>
        <div className="online-status">
          <span />
          ONE IMPORTANT QUESTION
        </div>
      </header>

      <section className="question-content">
        <div className="section-label">
          <span>02</span> ONE IMPORTANT QUESTION
        </div>

        {!accepted ? (
          <>
            <h1 className="question-page-title">
              Em sẽ yêu anh
              <span>mãi chứ?</span>
            </h1>

            <p className="question-page-subtitle">
              Anh đã chuẩn bị một điều nhỏ bé,
              <br />
              nhưng chứa đựng tất cả những gì anh muốn nói.
            </p>

            {photo ? (
              <div className="question-photo-frame">
                <img src={photo} alt="Our special memory" />
                <span className="photo-caption">
                  ♥ OUR LITTLE WORLD ♥
                </span>
              </div>
            ) : (
              <div className="question-no-photo">
                <div>♥</div>
                <p>Chúng ta chưa có một kỷ niệm ở đây.</p>
                <Link href="/memory">Tải ảnh lên trước nhé ♥</Link>
              </div>
            )}

            <div className="answer-card">
              <p>ANH CÓ MỘT CÂU HỎI DÀNH CHO EM...</p>

              <div className="answer-area" ref={answerAreaRef}>
                <button
                  type="button"
                  className="yes-button"
                  onClick={() => setAccepted(true)}
                >
                  ♥ CÓ, EM ĐỒNG Ý ♥
                </button>

                <button
                  type="button"
                  className={`no-button ${noPosition ? "no-moving" : ""}`}
                  style={
                    noPosition
                      ? {
                          left: `${noPosition.x}px`,
                          top: `${noPosition.y}px`,
                        }
                      : undefined
                  }
                  onPointerEnter={moveNoButton}
                  onTouchStart={(event) => {
                    event.preventDefault();
                    moveNoButton();
                  }}
                  onClick={moveNoButton}
                >
                  KHÔNG
                </button>
              </div>

              <span className="answer-hint">
                CHOOSE WITH YOUR HEART ♥
              </span>
            </div>
          </>
        ) : (
          <div className="love-success">
            <div className="success-overline">A NEW MEMORY BEGINS</div>

            <h1 className="success-title">
              SHE SAID
              <span>YES!</span>
            </h1>

            {photo && (
              <div className="success-photo-frame">
                <img src={photo} alt="Our beautiful memory" />
                <div className="success-photo-heart">♥</div>
              </div>
            )}

            <div className="success-message">
              <div className="success-hearts">♥ ✦ ♥ ✦ ♥</div>

              <h2>Anh biết mà! ❤️</h2>

              <p>
                Cảm ơn em vì đã chọn ở lại bên anh.
                <br />
                Anh không hứa mọi ngày đều hoàn hảo,
                <br />
                nhưng anh hứa sẽ luôn cố gắng
                <br />
                để mỗi ngày bên nhau đều đáng nhớ.
              </p>

              <strong>
                TỪ HÔM NAY, MÌNH CÙNG VIẾT TIẾP CÂU CHUYỆN NÀY NHÉ.
              </strong>
            </div>

            <button
              type="button"
              className="yes-button success-replay"
              onClick={() => setAccepted(false)}
            >
              ♥ XEM LẠI KHOẢNH KHẮC
            </button>
          </div>
        )}
      </section>

      <footer className="love-footer">
        <div className="footer-heart">♥</div>
        <p>IN EVERY PIXEL, THERE IS A LITTLE LOVE.</p>
        <span>AND THIS LOVE IS ONLY FOR YOU.</span>
      </footer>
    </main>
  );
}
