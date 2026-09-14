// import React, { useEffect, useRef } from 'react';
// import useAuth from '../Hooks/useAuth';

// const DynamicWatermark = () => {
//   const { user } = useAuth();
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas || !user?.email) return;

//     const ctx = canvas.getContext('2d');
//     let animationFrame;

//     const render = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       ctx.font = '600 13px monospace';
//       ctx.fillStyle = 'rgba(100, 116, 139, 0.08)';
//       ctx.rotate((-20 * Math.PI) / 180);

//       // Format current timestamp strictly in Bangladesh Standard Time (BST)
//       const bdTimeString = new Intl.DateTimeFormat('en-GB', {
//         timeZone: 'Asia/Dhaka',
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//       }).format(new Date()); // e.g., "14 Sept 2026, 12:00 am"

//       const text = `${user.email} • ${bdTimeString}`;

//       const stepX = 280;
//       const stepY = 120;

//       for (let x = -canvas.width; x < canvas.width * 2; x += stepX) {
//         for (let y = -canvas.height; y < canvas.height * 2; y += stepY) {
//           ctx.fillText(text, x, y);
//         }
//       }
//     };

//     render();
//     window.addEventListener('resize', render);

//     return () => {
//       window.removeEventListener('resize', render);
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [user]);

//   if (!user) return null;

//   return (
//     <canvas
//       ref={canvasRef}
//       aria-hidden="true"
//       className="pointer-events-none fixed inset-0 z-[9999] select-none"
//     />
//   );
// };

// export default DynamicWatermark;

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
      ctx.fillStyle = 'rgba(100, 116, 139, 0.1)';

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