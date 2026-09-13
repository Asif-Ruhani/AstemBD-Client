import React, { useEffect, useRef } from 'react';
import useAuth from '../Hooks/useAuth';

const DynamicWatermark = () => {
  const { user } = useAuth();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !user?.email) return;

    const ctx = canvas.getContext('2d');
    let animationFrame;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = '600 13px monospace';
      ctx.fillStyle = 'rgba(100, 116, 139, 0.08)';
      ctx.rotate((-20 * Math.PI) / 180);

      // Format current timestamp strictly in Bangladesh Standard Time (BST)
      const bdTimeString = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dhaka',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date()); // e.g., "14 Sept 2026, 12:00 am"

      const text = `${user.email} • ${bdTimeString}`;

      const stepX = 280;
      const stepY = 120;

      for (let x = -canvas.width; x < canvas.width * 2; x += stepX) {
        for (let y = -canvas.height; y < canvas.height * 2; y += stepY) {
          ctx.fillText(text, x, y);
        }
      }
    };

    render();
    window.addEventListener('resize', render);

    return () => {
      window.removeEventListener('resize', render);
      cancelAnimationFrame(animationFrame);
    };
  }, [user]);

  if (!user) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] select-none"
    />
  );
};

export default DynamicWatermark;