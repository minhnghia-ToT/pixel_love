
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="love-page new-home">
      <header className="top-header">
        <div className="pixel-logo">♥ PIXEL LOVE ♥</div>

        <div className="header-right">
          {/* LOVE QUIZ - TRANG TROLL */}
          <Link href="/troll" className="quiz-header-link">
            😈 LOVE QUIZ
          </Link>

          <div className="online-status">
            <span />
            LOVE IS ONLINE
          </div>
        </div>
      </header>

      <section className="new-home-hero">
        <div className="eyebrow">
          ✦ A LITTLE WORLD JUST FOR YOU ✦
        </div>

        <div className="home-pixel-heart">♥</div>

        <h1>
          EVERY PIXEL
          <span>HOLDS A MEMORY</span>
        </h1>

        <p>
          Có những điều anh không thể diễn tả bằng lời.
          <br />
          Nên anh muốn tạo ra một thế giới nhỏ dành riêng cho em.
        </p>

        <div className="home-actions">
          <Link href="/memory" className="home-primary-button">
            BẮT ĐẦU HÀNH TRÌNH ♥
          </Link>
        </div>

        <div className="home-chapters">
          <Link href="/memory" className="chapter-card">
            <span className="chapter-number">01</span>
            <span className="chapter-icon">♡</span>
            <strong>OUR MEMORY</strong>
            <small>Lưu giữ khoảnh khắc của chúng ta</small>
            <span className="chapter-arrow">↗</span>
          </Link>

          <Link href="/question" className="chapter-card">
            <span className="chapter-number">02</span>
            <span className="chapter-icon">♥</span>
            <strong>ONE QUESTION</strong>
            <small>Một câu hỏi anh muốn hỏi em</small>
            <span className="chapter-arrow">↗</span>
          </Link>
        </div>
      </section>

      <footer className="love-footer">
        <div className="footer-heart">♥</div>
        <p>MADE WITH LOVE, JUST FOR YOU</p>
        <span>IN EVERY PIXEL, THERE IS A LITTLE LOVE.</span>
      </footer>
    </main>
  );
}
