import React, { useEffect, useRef } from 'react';

export const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; radius: number; vx: number; vy: number; opacity: number; color: string }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 3000); // 密度
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random(),
          color: Math.random() > 0.8 ? '#59c18b' : '#ffffff' // 少量薄荷绿星星作为点缀
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // 移动星星
        star.x += star.vx;
        star.y += star.vy;

        // 边界检测（无缝循环）
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // 绘制星星
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // 闪烁效果
        star.opacity += (Math.random() - 0.5) * 0.05;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
      });

      // 绘制流星
      if (Math.random() < 0.01) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = 0;
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 100, startY + 100);
        const gradient = ctx.createLinearGradient(startX, startY, startX - 100, startY + 100);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{ background: 'transparent' }}
    />
  );
};
