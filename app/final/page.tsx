
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Fireworks from "@/components/Fireworks";

export default function FinalPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(
      sessionStorage.getItem("heart-lock-completed") === "true"
    );
  }, []);

  if (!unlocked) {
    return (
      <main className="love-page memory-page">
        <div className="memory-content">
          <h1 className="memory-title">NOT YET ♥</h1>
          <Link href="/heart-lock" className="home-primary-button">
            QUAY LẠI MỞ KHÓA
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="love-page memory-page">
      <Fireworks active={true} />

      <section className="memory-content">
        <div className="lock-icon">💗</div>

        <h1 className="memory-title">
          YOU UNLOCKED
          <span>MY HEART!</span>
        </h1>

        <p className="memory-description">
          Cảm ơn em đã cùng anh đi hết hành trình nhỏ này.
          <br />
          Anh hy vọng chúng ta sẽ còn tạo ra thật nhiều kỷ niệm.
        </p>

        <div className="success-message">
          <div className="success-hearts">♥ ✦ ♥ ✦ ♥</div>
          <h2>TO MY FAVORITE PERSON</h2>
          <p>
            Nếu được chọn lại,
            <br />
            anh vẫn muốn gặp em,
            <br />
            vẫn muốn thương em,
            <br />
            và vẫn muốn cùng em viết tiếp câu chuyện này.
          </p>
        </div>

        <Link href="/" className="home-primary-button memory-next">
          BACK TO OUR WORLD ♥
        </Link>
      </section>
    </main>
  );
}
