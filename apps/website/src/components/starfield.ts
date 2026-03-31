interface StarfieldOptions {
  starCount: number;
  speed: number;
  depth: number;
  colors: string[];
  enableShootingStars: boolean;
  shootingStarInterval: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

class Starfield {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly options: StarfieldOptions;

  private stars: Star[] = [];
  private shootingStars: ShootingStar[] = [];
  private nebulae: Nebula[] = [];

  private animationFrameId: number | null = null;
  private lastTime = 0;
  private isRunning = false;
  private isPaused = false;

  private width = 0;
  private height = 0;
  private centerX = 0;
  private centerY = 0;

  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  private shootingStarTimer = 0;

  private readonly defaultOptions: StarfieldOptions = {
    starCount: 800,
    speed: 0.3,
    depth: 1000,
    colors: ['#ffffff', '#a5b4fc', '#818cf8', '#c4b5fd', '#fbbf24'],
    enableShootingStars: true,
    shootingStarInterval: 8000,
  };

  constructor(canvas: HTMLCanvasElement, options: Partial<StarfieldOptions> = {}) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      throw new Error('Failed to get 2D canvas context');
    }
    this.ctx = context;
    this.options = { ...this.defaultOptions, ...options };

    this.setupCanvas();
    this.createStars();
    this.createNebulae();
    this.setupEventListeners();
  }

  private setupCanvas(): void {
    this.resize();
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }

  private setupEventListeners(): void {
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  private handleMouseMove = (event: MouseEvent): void => {
    this.targetMouseX = (event.clientX / this.width - 0.5) * 2;
    this.targetMouseY = (event.clientY / this.height - 0.5) * 2;
  };

  private handleResize = (): void => {
    this.resize();
  };

  resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    if (this.stars.length > 0) {
      this.repositionStars();
    }
  }

  private createStars(): void {
    this.stars = [];

    for (let i = 0; i < this.options.starCount; i++) {
      this.stars.push(this.createStar());
    }

    this.stars.sort((a, b) => b.z - a.z);
  }

  private createStar(): Star {
    const colorIndex = Math.floor(Math.random() * this.options.colors.length);
    const z = Math.random() * this.options.depth;
    const depthFactor = 1 - z / this.options.depth;

    return {
      x: (Math.random() - 0.5) * this.width * 2,
      y: (Math.random() - 0.5) * this.height * 2,
      z,
      size: Math.random() * 2 + 0.5 + depthFactor * 1.5,
      color: this.options.colors[colorIndex],
      baseOpacity: 0.3 + Math.random() * 0.7,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 2,
    };
  }

  private repositionStars(): void {
    this.stars.forEach((star) => {
      star.x = (Math.random() - 0.5) * this.width * 2;
      star.y = (Math.random() - 0.5) * this.height * 2;
    });
  }

  private createNebulae(): void {
    this.nebulae = [];
    const nebulaCount = 3;

    const nebulaColors = [
      'rgba(99, 102, 241, 0.03)',
      'rgba(168, 85, 247, 0.025)',
      'rgba(59, 130, 246, 0.02)',
    ];

    for (let i = 0; i < nebulaCount; i++) {
      this.nebulae.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 200 + Math.random() * 300,
        color: nebulaColors[i % nebulaColors.length],
        opacity: 0.5 + Math.random() * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.2 + Math.random() * 0.3,
      });
    }
  }

  private createShootingStar(): void {
    const startSide = Math.floor(Math.random() * 2);
    let x: number;
    let y: number;
    let vx: number;
    let vy: number;

    const speed = 8 + Math.random() * 12;
    const angle = Math.PI / 6 + Math.random() * (Math.PI / 3);

    if (startSide === 0) {
      x = Math.random() * this.width;
      y = -50;
      vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
      vy = Math.sin(angle) * speed;
    } else {
      x = Math.random() > 0.5 ? -50 : this.width + 50;
      y = Math.random() * this.height * 0.5;
      vx = x < 0 ? Math.abs(Math.cos(angle) * speed) : -Math.abs(Math.cos(angle) * speed);
      vy = Math.sin(angle) * speed;
    }

    const colorIndex = Math.floor(Math.random() * this.options.colors.length);

    this.shootingStars.push({
      x,
      y,
      vx,
      vy,
      length: 80 + Math.random() * 120,
      opacity: 1,
      life: 0,
      maxLife: 60 + Math.random() * 60,
      color: this.options.colors[colorIndex],
    });
  }

  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.animate();
  }

  stop(): void {
    this.isRunning = false;
    this.isPaused = false;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  pause(): void {
    if (!this.isRunning || this.isPaused) {
      return;
    }

    this.isPaused = true;
  }

  resume(): void {
    if (!this.isRunning || !this.isPaused) {
      return;
    }

    this.isPaused = false;
    this.lastTime = performance.now();
  }

  private animate = (): void => {
    if (!this.isRunning) {
      return;
    }

    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    if (!this.isPaused) {
      this.update(deltaTime);
    }

    this.render();

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private update(deltaTime: number): void {
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    const parallaxX = this.mouseX * 20;
    const parallaxY = this.mouseY * 20;

    this.stars.forEach((star) => {
      star.z -= this.options.speed * 60 * deltaTime;

      if (star.z <= 0) {
        star.z = this.options.depth;
        star.x = (Math.random() - 0.5) * this.width * 2;
        star.y = (Math.random() - 0.5) * this.height * 2;
      }

      star.twinklePhase += star.twinkleSpeed * deltaTime;
    });

    if (this.options.enableShootingStars) {
      this.shootingStarTimer += deltaTime * 1000;

      if (this.shootingStarTimer >= this.options.shootingStarInterval) {
        this.shootingStarTimer = 0;
        this.createShootingStar();
      }

      this.shootingStars = this.shootingStars.filter((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life++;

        const lifeProgress = star.life / star.maxLife;
        star.opacity = lifeProgress < 0.1 ? lifeProgress * 10 : lifeProgress > 0.7 ? 1 - (lifeProgress - 0.7) / 0.3 : 1;

        return star.life < star.maxLife && star.x > -200 && star.x < this.width + 200 && star.y > -200 && star.y < this.height + 200;
      });
    }

    this.nebulae.forEach((nebula) => {
      nebula.pulsePhase += nebula.pulseSpeed * deltaTime;
    });
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.renderNebulae();
    this.renderStars();
    this.renderShootingStars();
  }

  private renderNebulae(): void {
    this.nebulae.forEach((nebula) => {
      const pulseFactor = 1 + Math.sin(nebula.pulsePhase) * 0.1;
      const radius = nebula.radius * pulseFactor;

      const gradient = this.ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, radius);

      gradient.addColorStop(0, nebula.color);
      gradient.addColorStop(1, 'transparent');

      this.ctx.fillStyle = gradient;
      this.ctx.globalAlpha = nebula.opacity * (0.8 + Math.sin(nebula.pulsePhase) * 0.2);
      this.ctx.beginPath();
      this.ctx.arc(nebula.x, nebula.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
  }

  private renderStars(): void {
    const parallaxX = this.mouseX * 20;
    const parallaxY = this.mouseY * 20;

    this.stars.forEach((star) => {
      const scale = this.options.depth / (this.options.depth + star.z);
      const x = this.centerX + (star.x + parallaxX * scale) * scale;
      const y = this.centerY + (star.y + parallaxY * scale) * scale;

      if (x < -10 || x > this.width + 10 || y < -10 || y > this.height + 10) {
        return;
      }

      const twinkle = 0.7 + Math.sin(star.twinklePhase) * 0.3;
      const depthOpacity = 0.3 + (1 - star.z / this.options.depth) * 0.7;
      const opacity = star.baseOpacity * twinkle * depthOpacity;

      const size = star.size * scale;

      if (size > 1.5) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.3, this.adjustColorOpacity(star.color, opacity * 0.5));
        gradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = opacity;
      this.ctx.beginPath();
      this.ctx.arc(x, y, Math.max(size, 0.5), 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
  }

  private renderShootingStars(): void {
    this.shootingStars.forEach((star) => {
      const tailX = star.x - (star.vx / Math.sqrt(star.vx * star.vx + star.vy * star.vy)) * star.length;
      const tailY = star.y - (star.vy / Math.sqrt(star.vx * star.vx + star.vy * star.vy)) * star.length;

      const gradient = this.ctx.createLinearGradient(tailX, tailY, star.x, star.y);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.3, this.adjustColorOpacity(star.color, star.opacity * 0.3));
      gradient.addColorStop(0.7, this.adjustColorOpacity(star.color, star.opacity * 0.7));
      gradient.addColorStop(1, this.adjustColorOpacity(star.color, star.opacity));

      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(star.x, star.y);
      this.ctx.stroke();

      const headGradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 6);
      headGradient.addColorStop(0, this.adjustColorOpacity('#ffffff', star.opacity));
      headGradient.addColorStop(0.3, this.adjustColorOpacity(star.color, star.opacity * 0.8));
      headGradient.addColorStop(1, 'transparent');

      this.ctx.fillStyle = headGradient;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, 6, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  private adjustColorOpacity(color: string, opacity: number): string {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  }

  destroy(): void {
    this.stop();
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
    this.stars = [];
    this.shootingStars = [];
    this.nebulae = [];
  }
}

export { Starfield };
export type { StarfieldOptions, Star, ShootingStar, Nebula };