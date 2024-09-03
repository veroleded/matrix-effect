import React, { useEffect, useRef } from "react";
import "./Matrix.css";

const Matrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const symbols = "01";
    const fontSize = 20;
    const columns = canvas.width / fontSize;

    const drops = Array.from({ length: columns }).map(() =>
      Math.floor(Math.random() * canvas.height)
    );

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, index) => {
        const text = symbols[Math.floor(Math.random() * symbols.length)];
        const x = index * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        } else {
          drops[index] = y + fontSize;
        }
      });
    }

    const intervalId = setInterval(draw, 50);
    return () => clearInterval(intervalId);
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
};

export default Matrix;
