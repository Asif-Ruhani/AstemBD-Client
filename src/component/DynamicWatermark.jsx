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

      // Detect dark mode from html/body class or system preference
      const isDarkMode =
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      ctx.font = '600 13px monospace';
      // Dark mode: semi-transparent white; Light mode: semi-transparent slate
      ctx.fillStyle = isDarkMode
        ? 'rgba(255, 255, 255, 0.18)'
        : 'rgba(100, 116, 139, 0.16)';

      // Format current timestamp strictly in Bangladesh Standard Time (BST)
      const bdTimeString = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dhaka',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());

      const text = `${user.email} • ${bdTimeString}`;

      // Measure text width dynamically + add an 80px gap between repetitions
      const textMetrics = ctx.measureText(text);
      const stepX = Math.ceil(textMetrics.width) + 80;
      const stepY = 120;

      ctx.save();
      ctx.rotate((-20 * Math.PI) / 180);

      // Expand rendering bounds to cover the screen completely while rotated
      const minX = -canvas.width * 1.5;
      const maxX = canvas.width * 2.5;
      const minY = -canvas.height * 1.5;
      const maxY = canvas.height * 2.5;

      let rowIndex = 0;
      for (let y = minY; y < maxY; y += stepY) {
        // Offset alternate rows by half a step for a natural diamond watermark grid
        const rowOffset = rowIndex % 2 === 0 ? 0 : stepX / 2;

        for (let x = minX - rowOffset; x < maxX; x += stepX) {
          ctx.fillText(text, x, y);
        }
        rowIndex++;
      }

      ctx.restore();
    };

    render();

    // Listen for window resize
    window.addEventListener('resize', render);

    // Watch for theme toggles (dark/light mode class change on <html>)
    const observer = new MutationObserver(() => {
      render();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Also listen for system dark mode changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', render);

    return () => {
      window.removeEventListener('resize', render);
      darkModeMediaQuery.removeEventListener('change', render);
      observer.disconnect();
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