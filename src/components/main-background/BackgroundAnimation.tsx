import React, { useEffect, useRef, useState } from 'react';
import './BackgroundAnimation.css';

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const getHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

function useCurrentWitdh() {
  // save current window width in the state object
  let [size, setSize] = useState([getWidth(), getHeight()]);

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId: NodeJS.Timeout;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setSize([getWidth(), getHeight()]), 150);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  return size;
}

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useCurrentWitdh();

  const requestRef = React.useRef(0);

  useEffect(() => {
    const tick = () => {
      draw();
      update();
      requestRef.current = requestAnimationFrame(tick);
    };

    tick();

    // clean up function
    return () => {
      // remove resize listener
      cancelAnimationFrame(requestRef.current);
    };
  });

  let stars: any[] = []; // Array that contains the stars
  let FPS = 60; // Frames per second
  let x = 100; // Number of stars

  // Push stars to array
  for (let i = 0; i < x; i++) {
    stars.push({
      x: Math.random() * +width,
      y: Math.random() * +height,
      radius: Math.random() * 1 + 1,
      vx: Math.floor(Math.random() * 50) - 25,
      vy: Math.floor(Math.random() * 50) - 25,
    });
  }

  const draw = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.canvas.width = +width;
      ctx.canvas.height = +height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0, x = stars.length; i < x; i++) {
        let s = stars[i];

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
      }

      ctx.beginPath();
      for (let i = 0, x = stars.length; i < x; i++) {
        let starI = stars[i];
        ctx.moveTo(starI.x, starI.y);
        for (let j = 0, x = stars.length; j < x; j++) {
          let starII = stars[j];
          if (distance(starI, starII) < 150) {
            ctx.lineTo(starII.x, starII.y);
          }
        }
      }
      ctx.lineWidth = 0.05;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }
  };

  const distance = (point1: { x: number; y: number }, point2: { x: number; y: number }) => {
    let xs = 0;
    let ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  };

  // Update star locations

  const update = () => {
    for (let i = 0, x = stars.length; i < x; i++) {
      let s = stars[i];

      s.x += s.vx / FPS;
      s.y += s.vy / FPS;

      if (s.x < 0 || s.x > width) s.vx = -s.vx;
      if (s.y < 0 || s.y > height) s.vy = -s.vy;
    }
  };

  return <canvas ref={canvasRef} height={+height} width={+width} />;
};

export default BackgroundAnimation;
