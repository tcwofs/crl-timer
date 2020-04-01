import React, { useEffect, useRef, useState } from 'react';
import Canvas from 'react-responsive-canvas';
import './BackgroundAnimation.css';

const getPixelRatio = (context: any) => {
  let backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

const BackgroundAnimation = () => {
  const [canref, setCanref] = useState<HTMLCanvasElement | null>(null);
  let ref = useRef<HTMLCanvasElement | null>(null);

  let stars: any[] = []; // Array that contains the stars
  let FPS = 60; // Frames per second

  useEffect(() => {
    ref.current = canref;

    let canvas: HTMLCanvasElement | null = ref.current;

    if (!canvas) {
      return;
    }

    let context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);

    canvas.width = +width * ratio;
    canvas.height = +height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    let numberOfStars = canvas.width * 0.06; // Number of stars

    pushStars(canvas.width, canvas.height, numberOfStars);

    let requestID: any;
    const render = () => {
      if (context) {
        draw(context, canvas);
        if (canvas) {
          update(canvas.width, canvas.height);
        }

        requestID = requestAnimationFrame(render);
      }
    };

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
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
      });
    }
  };

  const draw = (context: any, canvas: HTMLCanvasElement | null) => {
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
    context.lineWidth = 0.05;
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
