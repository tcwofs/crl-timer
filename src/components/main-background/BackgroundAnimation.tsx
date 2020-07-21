import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Canvas from 'react-responsive-canvas';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  const [canref, setCanref] = useState<HTMLCanvasElement | null>(null);
  let ref = useRef<HTMLCanvasElement | null>(null);

  let stars: any[] = []; // Array that contains the stars
  let FPS = 60; // Frames per second

  useEffect(() => {
    ref.current = canref;
    let canvas: HTMLCanvasElement = ref.current as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
    let context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    let numberOfStars = isMobile ? 60 : 100; // Number of stars
    let requestID: number;

    const render = () => {
      draw(context, canvas);
      update(canvas.width, canvas.height);

      requestID = requestAnimationFrame(render);
    };

    pushStars(canvas.width, canvas.height, numberOfStars);
    render();

    return () => {
      cancelAnimationFrame(requestID);
    };
  });

  const pushStars = (width: number, height: number, x: number) => {
    for (let i = 0; i < x; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isMobile ? 5 : 2,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
      });
    }
  };

  const draw = (context: any, canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.globalCompositeOperation = 'lighter';

    for (let i = 0, x = stars.length; i < x; i++) {
      let s = stars[i];

      context.fillStyle = '#efefef';
      context.beginPath();
      context.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      context.fill();
      context.fillStyle = 'black';
      context.stroke();
    }

    context.beginPath();
    for (let i = 0, x = stars.length; i < x; i++) {
      let starI = stars[i];
      context.moveTo(starI.x, starI.y);
      for (let j = 0, x = stars.length; j < x; j++) {
        let starII = stars[j];
        if (distance(starI, starII) < 150) {
          context.lineTo(starII.x, starII.y);
        }
      }
    }
    context.lineWidth = isMobile ? 0.5 : 0.1;
    context.strokeStyle = 'white';
    context.stroke();
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

  const update = (width: number, height: number) => {
    for (let i = 0, x = stars.length; i < x; i++) {
      let s = stars[i];

      s.x += s.vx / FPS;
      s.y += s.vy / FPS;

      if (s.x < 0 || s.x > width) s.vx = -s.vx;
      if (s.y < 0 || s.y > height) s.vy = -s.vy;
    }
  };

  return <Canvas canvasRef={(el: HTMLCanvasElement) => setCanref(el)} onResize={draw} />;
};

export default BackgroundAnimation;
