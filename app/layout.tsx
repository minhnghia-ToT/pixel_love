import type { Metadata } from "next";
import "./love.css";

export const metadata: Metadata = {
  title: "Pixel Love | A Little World of Love",
  description: "Every little pixel reminds me of you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}