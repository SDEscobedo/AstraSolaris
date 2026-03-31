interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient?: string;
}

class FeatureCards {
  private readonly element: HTMLElement;
  private readonly observer: IntersectionObserver | null = null;
  private animatedCards: Set<HTMLElement> = new Set();

  private readonly features: Feature[] = [
    {
      id: 'natural-language',
      title: 'Natural Language DSL',
      description:
        'Write space scenarios in plain English with the Astra language. No complex syntax—just describe what you want to see.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    {
      id: '3d-visualization',
      title: 'Interactive 3D Scenes',
      description:
        'Explore stunning real-time visualizations powered by Three.js. Orbit, zoom, and navigate through the cosmos with ease.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    },
    {
      id: 'scientific-accuracy',
      title: 'Scientific Accuracy',
      description:
        'High-precision ephemeris calculations ensure astronomical accuracy. Built on proven algorithms trusted by researchers.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    },
    {
      id: 'offline-ready',
      title: 'Offline Ready',
      description:
        'Full offline support with service workers. Access your simulations anywhere, anytime—no internet required.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <line x1="12" y1="20" x2="12.01" y2="20"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      id: 'zero-backend',
      title: 'Zero Backend',
      description:
        '100% client-side execution. Deploy to any static host—GitHub Pages, Netlify, Vercel, or your own CDN.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <path d="M7 8l3 3-3 3"/>
        <line x1="12" y1="14" x2="17" y2="14"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    },
    {
      id: 'educational-focus',
      title: 'Educational Focus',
      description:
        'Perfect for classrooms, presentations, and self-learning. Create engaging content that brings astronomy to life.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
    },
  ];

  constructor() {
    this.element = this.createElement();
    this.setupIntersectionObserver();
  }

  render(): HTMLElement {
    return this.element;
  }

  private createElement(): HTMLElement {
    const section = document.createElement('section');
    section.id = 'features';
    section.className = 'features section';
    section.setAttribute('aria-labelledby', 'features-title');

    const container = document.createElement('div');
    container.className = 'container';

    container.appendChild(this.createHeader());
    container.appendChild(this.createGrid());

    section.appendChild(this.createBackgroundDecoration());
    section.appendChild(container);

    this.injectStyles();

    return section;
  }

  private createBackgroundDecoration(): HTMLElement {
    const decoration = document.createElement('div');
    decoration.className = 'features-decoration';
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="features-glow features-glow-1"></div>
      <div class="features-glow features-glow-2"></div>
      <div class="features-grid-pattern"></div>
    `;

    return decoration;
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('div');
    header.className = 'section-header features-header';

    const badge = document.createElement('div');
    badge.className = 'features-badge';
    badge.innerHTML = `
      <span class="features-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      </span>
      <span>Powerful Features</span>
    `;

    const title = document.createElement('h2');
    title.id = 'features-title';
    title.className = 'section-title features-title';
    title.innerHTML = `Everything you need to<br><span class="text-gradient">explore the universe</span>`;

    const description = document.createElement('p');
    description.className = 'section-description features-description';
    description.textContent =
      'AstraSolaris provides a complete toolkit for astronomical visualization—from simple planetary views to complex mission simulations, all running in your browser.';

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    return header;
  }

  private createGrid(): HTMLElement {
    const grid = document.createElement('div');
    grid.className = 'features-grid';
    grid.setAttribute('role', 'list');

    this.features.forEach((feature, index) => {
      const card = this.createFeatureCard(feature, index);
      grid.appendChild(card);
    });

    return grid;
  }

  private createFeatureCard(feature: Feature, index: number): HTMLElement {
    const card = document.createElement('article');
    card.className = 'feature-card reveal';
    card.setAttribute('role', 'listitem');
    card.setAttribute('data-feature', feature.id);
    card.style.setProperty('--card-index', String(index));

    if (feature.gradient) {
      card.style.setProperty('--card-gradient', feature.gradient);
    }

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'feature-card-icon';
    iconWrapper.innerHTML = feature.icon;
    iconWrapper.setAttribute('aria-hidden', 'true');

    const content = document.createElement('div');
    content.className = 'feature-card-content';

    const title = document.createElement('h3');
    title.className = 'feature-card-title';
    title.textContent = feature.title;

    const description = document.createElement('p');
    description.className = 'feature-card-description';
    description.textContent = feature.description;

    const learnMore = document.createElement('div');
    learnMore.className = 'feature-card-action';
    learnMore.innerHTML = `
      <span>Learn more</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(learnMore);

    card.appendChild(this.createCardGlow());
    card.appendChild(iconWrapper);
    card.appendChild(content);

    this.setupCardInteraction(card);

    return card;
  }

  private createCardGlow(): HTMLElement {
    const glow = document.createElement('div');
    glow.className = 'feature-card-glow';
    glow.setAttribute('aria-hidden', 'true');
    return glow;
  }

  private setupCardInteraction(card: HTMLElement): void {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hovered');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });

    card.addEventListener('mousemove', (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    card.addEventListener('click', () => {
      const featureId = card.getAttribute('data-feature');
      if (featureId) {
        window.open(`/docs/features/${featureId}`, '_self');
      }
    });

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            if (!this.animatedCards.has(card)) {
              this.animatedCards.add(card);
              const index = parseInt(card.style.getPropertyValue('--card-index') ?? '0', 10);
              const delay = index * 100;

              setTimeout(() => {
                card.classList.add('revealed');
              }, delay);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    requestAnimationFrame(() => {
      const cards = this.element.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        observer.observe(card);
      });
    });
  }

  private injectStyles(): void {
    const styleId = 'feature-cards-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .features {
        position: relative;
        overflow: hidden;
      }

      .features-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
      }

      .features-glow {
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.3;
      }

      .features-glow-1 {
        top: -200px;
        left: -200px;
        background: var(--color-primary-500);
      }

      .features-glow-2 {
        bottom: -200px;
        right: -200px;
        background: var(--color-secondary-500);
      }

      .features-grid-pattern {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
        background-size: 60px 60px;
        mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
        -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      }

      .features-header {
        margin-bottom: var(--space-16);
      }

      .features-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-1-5) var(--space-4);
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: var(--radius-full);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        color: var(--color-primary-400);
        margin-bottom: var(--space-6);
      }

      .features-badge-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .features-title {
        font-size: var(--text-5xl);
        line-height: var(--leading-tight);
      }

      .features-description {
        max-width: 36rem;
      }

      .feature-card {
        --card-gradient: var(--gradient-primary);
        --mouse-x: 50%;
        --mouse-y: 50%;

        position: relative;
        cursor: pointer;
        outline: none;
      }

      .feature-card-glow {
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        background: var(--card-gradient);
        opacity: 0;
        transition: opacity var(--duration-normal) var(--ease-out);
        z-index: -1;
      }

      .feature-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(
          circle at var(--mouse-x) var(--mouse-y),
          rgba(255, 255, 255, 0.06) 0%,
          transparent 50%
        );
        opacity: 0;
        transition: opacity var(--duration-fast) var(--ease-out);
        pointer-events: none;
      }

      .feature-card:hover::before,
      .feature-card:focus-visible::before {
        opacity: 1;
      }

      .feature-card:hover .feature-card-glow,
      .feature-card:focus-visible .feature-card-glow {
        opacity: 0.15;
      }

      .feature-card:focus-visible {
        outline: 2px solid var(--border-focus);
        outline-offset: 2px;
      }

      .feature-card-icon {
        position: relative;
      }

      .feature-card-icon::after {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: inherit;
        background: var(--card-gradient);
        opacity: 0;
        filter: blur(12px);
        transition: opacity var(--duration-normal) var(--ease-out);
        z-index: -1;
      }

      .feature-card:hover .feature-card-icon::after,
      .feature-card:focus-visible .feature-card-icon::after {
        opacity: 0.4;
      }

      .feature-card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .feature-card-action {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-top: auto;
        padding-top: var(--space-4);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        color: var(--color-primary-400);
        opacity: 0;
        transform: translateX(-8px);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .feature-card:hover .feature-card-action,
      .feature-card:focus-visible .feature-card-action {
        opacity: 1;
        transform: translateX(0);
      }

      .feature-card-action svg {
        transition: transform var(--duration-fast) var(--ease-out);
      }

      .feature-card:hover .feature-card-action svg,
      .feature-card:focus-visible .feature-card-action svg {
        transform: translateX(4px);
      }

      /* Reveal animation */
      .feature-card.reveal {
        opacity: 0;
        transform: translateY(30px);
      }

      .feature-card.reveal.revealed {
        opacity: 1;
        transform: translateY(0);
        transition: opacity var(--duration-slow) var(--ease-out),
                    transform var(--duration-slow) var(--ease-out);
      }

      /* Stagger animation */
      .feature-card:nth-child(1).revealed { transition-delay: 0ms; }
      .feature-card:nth-child(2).revealed { transition-delay: 100ms; }
      .feature-card:nth-child(3).revealed { transition-delay: 200ms; }
      .feature-card:nth-child(4).revealed { transition-delay: 300ms; }
      .feature-card:nth-child(5).revealed { transition-delay: 400ms; }
      .feature-card:nth-child(6).revealed { transition-delay: 500ms; }

      /* Responsive adjustments */
      @media (max-width: 640px) {
        .features-title {
          font-size: var(--text-3xl);
        }

        .features-title br {
          display: none;
        }

        .feature-card-action {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .feature-card.reveal {
          opacity: 1;
          transform: none;
        }

        .feature-card-action {
          opacity: 1;
          transform: none;
        }

        .feature-card-glow,
        .feature-card::before,
        .feature-card-icon::after {
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  destroy(): void {
    this.animatedCards.clear();
    this.element.remove();
  }
}

export { FeatureCards };
export type { Feature };