
"use client";

import { useState } from "react";
import "./troll.css";

// ==========================================
// TODO: BẠN CHỈNH CÂU HỎI VÀ LỜI NHẮN TẠI ĐÂY
// ==========================================

const questions = [
  {
    question: "TODO: Cu anh bao nhiêu cm ? (em đoán)",
    options: ["A 20cm", "B 15cm", "C 16,5cm", "D 17cm"],
    correctAnswer: "D 17cm",

    // TODO: Lời nhắn khi cô ấy trả lời sai
    wrongMessage: "Chơi rồi mà quên chán thiệt ! Làm lại cho toyy 😏",
  },
  {
    question: "TODO: Anh đẹp trai hem ?",
    options: ["A Có", "B Không", "C Maybe", "D Không biết"],
    correctAnswer: "A Có",

    // TODO: Lời nhắn khi cô ấy trả lời sai
    wrongMessage: "THUA!",
  },
  {
    question: "TODO: Thứ 7 cho anh chơi kiêu doggy nhaa",
    options: ["A Dạ", "B Em cũng muốn kiểu đó", "C Không", "D Em muốn kiểu khác"],
    correctAnswer: "A Dạ",

    // TODO: Lời nhắn khi cô ấy trả lời sai
    wrongMessage: "Nghĩ lại đi bà xã húi oiii",
  },
];

export default function TrollPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showWrongMessage, setShowWrongMessage] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    if (selected !== null) return;

    setSelected(answer);

    if (answer === question.correctAnswer) {
      setScore((prev) => prev + 1);
      setShowCorrectMessage(true);

      setTimeout(() => {
        nextQuestion();
      }, 1200);
    } else {
      setShowWrongMessage(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelected(null);
    setShowWrongMessage(false);
    setShowCorrectMessage(false);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelected(null);
    setShowWrongMessage(false);
    setShowCorrectMessage(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <main className="troll-page">
        <div className="troll-result">
          <p className="troll-label">THE FINAL RESULT</p>
          <h1>Chúc mừng em! ❤️</h1>

          <div className="troll-score">
            {score}/{questions.length}
          </div>

          <p className="troll-result-text">
            Em đã hoàn thành bài kiểm tra tình yêu!
          </p>

          <div className="pixel-surprise">
            <div className="pixel-character">😏</div>
            <div className="pixel-heart">❤️</div>
            <h2>SURPRISE!</h2>
          </div>

          <p className="troll-joke">
            Mỗi điểm cộng tương ứng một "nháy" 😉
          </p>

          <p className="troll-note">
            Đây là thử thách vui vẻ thôi nhé. Mọi thứ đều cần sự đồng ý
            và thoải mái của cả hai ❤️
          </p>

          <button onClick={restartGame} className="troll-button">
            CHƠI LẠI
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="troll-page">
      <div className="troll-card">
        <p className="troll-label">THE LOVE QUIZ</p>

        <h1>Em hiểu anh đến đâu? ❤️</h1>

        <p className="troll-subtitle">
          Trả lời thật chính xác nhé, anh đang chấm điểm đấy!
        </p>

        <div className="troll-progress">
          <div
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="troll-question-info">
          <span>CÂU HỎI {currentQuestion + 1}</span>
          <span>
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>

        <h2 className="troll-question">
          {question.question}
        </h2>

        <div className="troll-options">
          {question.options.map((option, index) => {
            const isSelected = selected === option;
            const isCorrect = option === question.correctAnswer;

            let className = "troll-option";

            if (isSelected) {
              className += isCorrect ? " correct" : " wrong";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(option)}
                disabled={selected !== null}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* THÔNG BÁO TRẢ LỜI ĐÚNG */}
        {showCorrectMessage && (
          <div className="answer-feedback correct-feedback">
            <span>🎉</span>
            <p>Chính xác! Em giỏi lắm ❤️</p>
            <small>Đang chuyển sang câu tiếp theo...</small>
          </div>
        )}

        {/* THÔNG BÁO TRẢ LỜI SAI */}
        {showWrongMessage && (
          <div className="answer-feedback wrong-feedback">
            <span>🥺</span>
            <p>{question.wrongMessage}</p>

            <button
              onClick={nextQuestion}
              className="troll-button"
            >
              TIẾP TỤC ❤️
            </button>
          </div>
        )}

        <div className="troll-footer">
          <span>Điểm của em ❤️</span>
          <strong>{score}</strong>
        </div>
      </div>
    </main>
  );
}
