interface HeroOptions {
  onExploreClick: () => void;
  onPlaygroundClick: () => void;
}

class Hero {
  private readonly element: HTMLElement;
  private readonly onExploreClick: () => void;
  private readonly onPlaygroundClick: () => void;
  private animationFrameId: number | null = null;

  constructor(options: HeroOptions) {
    this.onExploreClick = options.onExploreClick;
    this.onPlaygroundClick = options.onPlaygroundClick;
    this.element = this.createElement();
    this.setupParallaxEffect();
  }

  render(): HTMLElement {
    return this.element;
  }

  private createElement(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'hero';
    section.setAttribute('aria-labelledby', 'hero-title');

    section.appendChild(this.createBackground());
    section.appendChild(this.createContent());
    section.appendChild(this.createScrollIndicator());

    return section;
  }

  private createBackground(): HTMLElement {
    const background = document.createElement('div');
    background.className = 'hero-background';
    background.setAttribute('aria-hidden', 'true');

    const primaryGlow = document.createElement('div');
    primaryGlow.className = 'hero-glow hero-glow-primary';

    const secondaryGlow = document.createElement('div');
    secondaryGlow.className = 'hero-glow hero-glow-secondary';

    const accentGlow = document.createElement('div');
    accentGlow.className = 'hero-glow hero-glow-accent';

    background.appendChild(primaryGlow);
    background.appendChild(secondaryGlow);
    background.appendChild(accentGlow);

    this.injectBackgroundStyles();

    return background;
  }

  private injectBackgroundStyles(): void {
    const styleId = 'hero-background-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hero-glow-primary {
        position: absolute;
        width: 120%;
        height: 120%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, transparent 60%);
        animation: hero-glow-pulse 8s ease-in-out infinite;
      }

      .hero-glow-secondary {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 30%;
        left: 60%;
        transform: translate(-50%, -50%);
        background: radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 50%);
        animation: hero-glow-pulse 10s ease-in-out infinite reverse;
      }

      .hero-glow-accent {
        position: absolute;
        width: 80%;
        height: 80%;
        top: 70%;
        left: 30%;
        transform: translate(-50%, -50%);
        background: radial-gradient(ellipse at center, rgba(251, 191, 36, 0.1) 0%, transparent 40%);
        animation: hero-glow-pulse 12s ease-in-out infinite;
        animation-delay: -4s;
      }

      .hero-floating-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(1px);
        animation: float-orb linear infinite;
        pointer-events: none;
      }

      @keyframes float-orb {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private createContent(): HTMLElement {
    const content = document.createElement('div');
    content.className = 'hero-content';

    content.appendChild(this.createBadge());
    content.appendChild(this.createTitle());
    content.appendChild(this.createDescription());
    content.appendChild(this.createActions());
    content.appendChild(this.createStats());

    return content;
  }

  private createBadge(): HTMLElement {
    const badge = document.createElement('div');
    badge.className = 'hero-badge';

    const icon = document.createElement('span');
    icon.className = 'hero-badge-icon';
    icon.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    `;

    const text = document.createElement('span');
    text.textContent = 'Open Source Astronomical Simulation';

    const sparkle = document.createElement('span');
    sparkle.className = 'hero-badge-sparkle';
    sparkle.setAttribute('aria-hidden', 'true');

    badge.appendChild(icon);
    badge.appendChild(text);
    badge.appendChild(sparkle);

    this.injectBadgeStyles();

    return badge;
  }

  private injectBadgeStyles(): void {
    const styleId = 'hero-badge-extra-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hero-badge {
        position: relative;
        overflow: hidden;
      }

      .hero-badge-sparkle {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.2) 50%,
          transparent 100%
        );
        animation: sparkle-sweep 3s ease-in-out infinite;
        animation-delay: 2s;
      }

      @keyframes sparkle-sweep {
        0% {
          left: -100%;
        }
        100% {
          left: 200%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private createTitle(): HTMLElement {
    const title = document.createElement('h1');
    title.id = 'hero-title';
    title.className = 'hero-title';

    const line1 = document.createElement('span');
    line1.className = 'hero-title-line';
    line1.textContent = 'Explore the Cosmos';

    const lineBreak = document.createElement('br');

    const line2 = document.createElement('span');
    line2.className = 'hero-title-line hero-title-gradient';
    line2.textContent = 'with Code';

    title.appendChild(line1);
    title.appendChild(lineBreak);
    title.appendChild(line2);

    this.injectTitleStyles();

    return title;
  }

  private injectTitleStyles(): void {
    const styleId = 'hero-title-extra-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hero-title-line {
        display: inline-block;
      }

      @media (max-width: 640px) {
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 3.5rem);
        }
      }
    `;
    document.head.appendChild(style);
  }

  private createDescription(): HTMLElement {
    const description = document.createElement('p');
    description.className = 'hero-description';
    description.innerHTML = `
      Describe space scenarios in <strong>plain English</strong> using the Astra language 
      and produce stunning interactive <strong>3D visualizations</strong>. 
      Built for scientists, educators, and space enthusiasts.
    `;

    this.injectDescriptionStyles();

    return description;
  }

  private injectDescriptionStyles(): void {
    const styleId = 'hero-description-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hero-description strong {
        color: var(--text-primary);
        font-weight: var(--font-semibold);
      }
    `;
    document.head.appendChild(style);
  }

  private createActions(): HTMLElement {
    const actions = document.createElement('div');
    actions.className = 'hero-actions';

    const primaryBtn = this.createPrimaryButton();
    const secondaryBtn = this.createSecondaryButton();
    const githubBtn = this.createGithubButton();

    actions.appendChild(primaryBtn);
    actions.appendChild(secondaryBtn);
    actions.appendChild(githubBtn);

    return actions;
  }

  private createPrimaryButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary btn-xl hero-btn-primary';

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'hero-btn-icon';
    iconWrapper.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
    `;

    const text = document.createElement('span');
    text.textContent = 'Try Playground';

    button.appendChild(iconWrapper);
    button.appendChild(text);

    button.addEventListener('click', () => {
      this.onPlaygroundClick();
    });

    this.injectButtonStyles();

    return button;
  }

  private createSecondaryButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-secondary btn-xl hero-btn-secondary';

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'hero-btn-icon';
    iconWrapper.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    `;

    const text = document.createElement('span');
    text.textContent = 'Explore Features';

    button.appendChild(iconWrapper);
    button.appendChild(text);

    button.addEventListener('click', () => {
      this.onExploreClick();
    });

    return button;
  }

  private createGithubButton(): HTMLAnchorElement {
    const link = document.createElement('a');
    link.className = 'btn btn-ghost btn-xl hero-btn-github';
    link.href = 'https://github.com/astra-solaris/astra-solaris';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'View source on GitHub');

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'hero-btn-icon';
    iconWrapper.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    `;

    const text = document.createElement('span');
    text.textContent = 'GitHub';

    link.appendChild(iconWrapper);
    link.appendChild(text);

    return link;
  }

  private injectButtonStyles(): void {
    const styleId = 'hero-button-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hero-btn-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .hero-btn-primary {
        position: relative;
        overflow: hidden;
      }

      .hero-btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.15) 50%,
          transparent 100%
        );
        transition: left 0.5s ease;
      }

      .hero-btn-primary:hover::before {
        left: 100%;
      }

      .hero-btn-secondary:hover .hero-btn-icon svg {
        animation: spin-slow 2s linear infinite;
      }

      .hero-btn-github {
        border: 1px solid var(--border-subtle);
      }

      .hero-btn-github:hover {
        border-color: var(--border-default);
        background: rgba(30, 41, 59, 0.6);
      }

      @keyframes spin-slow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 640px) {
        .hero-actions {
          flex-direction: column;
          width: 100%;
          max-width: 320px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions .btn {
          width: 100%;
          justify-content: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private createStats(): HTMLElement {
    const stats = document.createElement('div');
    stats.className = 'hero-stats';
    stats.setAttribute('aria-label', 'Project statistics');

    const statsData = [
      { value: '100%', label: 'Client-Side', icon: '⚡' },
      { value: 'MIT', label: 'Licensed', icon: '📜' },
      { value: '3D', label: 'Interactive', icon: '🌍' },
    ];

    statsData.forEach((stat) => {
      const statItem = document.createElement('div');
      statItem.className = 'hero-stat';

      const icon = document.createElement('span');
      icon.className = 'hero-stat-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = stat.icon;

      const value = document.createElement('span');
      value.className = 'hero-stat-value';
      value.textContent = stat.value;

      const label = document.createElement('span');
      label.className = 'hero-stat-label';
      label.textContent = stat.label;

      statItem.appendChild(icon);
      statItem.appendChild(value);
      statItem.appendChild(label);

      stats.appendChild(statItem);
    });

    this.injectStatsStyles();

    return stats;
  }

  private injectStatsStyles(): void {
    const styleId = 'hero-stats-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hero-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-8);
        margin-top: var(--space-12);
        padding-top: var(--space-8);
        border-top: 1px solid var(--border-subtle);
        animation: fade-in-up var(--duration-slow) var(--ease-out) 0.4s both;
      }

      .hero-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-1);
        text-align: center;
      }

      .hero-stat-icon {
        font-size: var(--text-2xl);
        line-height: 1;
        margin-bottom: var(--space-1);
      }

      .hero-stat-value {
        font-family: var(--font-display);
        font-size: var(--text-xl);
        font-weight: var(--font-bold);
        color: var(--text-primary);
        background: var(--gradient-text-cosmic);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-stat-label {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wide);
      }

      @media (max-width: 640px) {
        .hero-stats {
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .hero-stat {
          flex: 1 1 80px;
          min-width: 80px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private createScrollIndicator(): HTMLElement {
    const indicator = document.createElement('div');
    indicator.className = 'hero-scroll-indicator';
    indicator.setAttribute('aria-hidden', 'true');

    const text = document.createElement('span');
    text.textContent = 'Scroll to explore';

    const icon = document.createElement('span');
    icon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    `;

    indicator.appendChild(text);
    indicator.appendChild(icon);

    indicator.addEventListener('click', () => {
      this.onExploreClick();
    });

    this.injectScrollIndicatorStyles();

    return indicator;
  }

  private injectScrollIndicatorStyles(): void {
    const styleId = 'hero-scroll-indicator-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hero-scroll-indicator {
        cursor: pointer;
        transition: color var(--duration-fast) var(--ease-out);
      }

      .hero-scroll-indicator:hover {
        color: var(--text-secondary);
      }

      @media (max-width: 768px) {
        .hero-scroll-indicator {
          bottom: var(--space-4);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-scroll-indicator {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private setupParallaxEffect(): void {
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private updateParallax(): void {
    const scrollY = window.scrollY;
    const heroHeight = this.element.offsetHeight;
    const scrollProgress = Math.min(scrollY / heroHeight, 1);

    const content = this.element.querySelector('.hero-content') as HTMLElement | null;
    if (content) {
      const translateY = scrollY * 0.3;
      const opacity = 1 - scrollProgress * 0.8;
      content.style.transform = `translateY(${translateY}px)`;
      content.style.opacity = String(opacity);
    }

    const background = this.element.querySelector('.hero-background') as HTMLElement | null;
    if (background) {
      const scale = 1 + scrollProgress * 0.1;
      background.style.transform = `scale(${scale})`;
    }
  }

  destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.element.remove();
  }
}

export { Hero };
export type { HeroOptions };