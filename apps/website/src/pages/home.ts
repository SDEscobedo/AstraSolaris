interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

interface TechItem {
  name: string;
  description: string;
  icon: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

class HomePage {
  private readonly element: HTMLElement;
  private readonly observer: IntersectionObserver | null = null;
  private revealedSections: Set<HTMLElement> = new Set();

  private readonly useCases: UseCase[] = [
    {
      id: 'education',
      title: 'Education',
      description:
        'Transform astronomy lessons with interactive 3D visualizations. Students can explore orbital mechanics, planetary systems, and celestial phenomena hands-on.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    {
      id: 'research',
      title: 'Research',
      description:
        'Visualize complex orbital data and mission trajectories. Present findings with publication-ready renders and interactive demonstrations.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    },
    {
      id: 'outreach',
      title: 'Public Outreach',
      description:
        'Create engaging content for planetariums, science centers, and online audiences. Make astronomy accessible and inspiring for everyone.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    },
    {
      id: 'hobbyist',
      title: 'Amateur Astronomy',
      description:
        'Plan observations, understand celestial mechanics, and visualize what you see through your telescope with accurate simulations.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="m2 17 10 5 10-5"/>
        <path d="m2 12 10 5 10-5"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
  ];

  private readonly techStack: TechItem[] = [
    {
      name: 'TypeScript',
      description: 'Fully typed codebase for reliability',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>`,
    },
    {
      name: 'Three.js',
      description: 'Powerful 3D graphics engine',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.053.491zm6.028 1.79l4.846 1.395-3.632 3.5zm-.522.12l1.213 4.906-4.037.489zm6.032 1.79l4.846 1.396-3.632 3.5zm-.524.12l1.215 4.906-4.037.489zm-9.63 2.28l4.084.496-3.744 3.607zm-.522.063l.96 4.984-4.165.554zm6.03 1.726l4.083.494-3.744 3.607zm-.52.063l.958 4.984-4.165.554zm-9.63 2.28l4.084.496-3.744 3.607zm-.522.062l.96 4.985-4.165.554zm6.03 1.727l4.083.494-3.744 3.607zm-.52.063l.958 4.984-4.166.554zm-3.545 4.203l4.083.495-3.744 3.607zm-.52.063l.959 4.984-4.166.554z"/></svg>`,
    },
    {
      name: 'Vite',
      description: 'Lightning-fast development',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z"/></svg>`,
    },
    {
      name: 'WebGL',
      description: 'Hardware-accelerated rendering',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 2v20h20V2zm1.875 1.875H6.5l-.438 13.125H4.25zm10.437 0h1.813v3.625l-1.438 1.438-1.437-1.438zm4 0h3.813v3.563h-2v7.75l-1.813 1.812zm-1.75.124 1.313 1.313-1.063 1.063-1.062-1.063zM4.312 6.5h4.875l-4.5 11H6.5l-2.188-1.375zM8.437 18h7.938l-3.438 3.438-1.562-1.563-1.563 1.563z"/></svg>`,
    },
  ];

  private readonly stats: Stat[] = [
    {
      value: '100%',
      label: 'Client-Side',
      icon: '🌐',
    },
    {
      value: 'MIT',
      label: 'Open Source',
      icon: '📜',
    },
    {
      value: '0',
      label: 'Server Dependencies',
      icon: '🚀',
    },
    {
      value: '∞',
      label: 'Possibilities',
      icon: '✨',
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
    const container = document.createElement('div');
    container.className = 'home-page';

    container.appendChild(this.createUseCasesSection());
    container.appendChild(this.createTechSection());
    container.appendChild(this.createStatsSection());
    container.appendChild(this.createCtaSection());

    this.injectStyles();

    return container;
  }

  private createUseCasesSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'home-use-cases section reveal-section';
    section.setAttribute('aria-labelledby', 'use-cases-title');

    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('div');
    header.className = 'section-header';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="m2 17 10 5 10-5"/>
          <path d="m2 12 10 5 10-5"/>
        </svg>
      </span>
      <span>Use Cases</span>
    `;

    const title = document.createElement('h2');
    title.id = 'use-cases-title';
    title.className = 'section-title';
    title.innerHTML = `Built for <span class="text-gradient">everyone</span> who looks up`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      'Whether you\'re teaching the next generation of astronomers or planning humanity\'s next mission, AstraSolaris provides the tools you need.';

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const grid = document.createElement('div');
    grid.className = 'use-cases-grid';

    this.useCases.forEach((useCase, index) => {
      const card = this.createUseCaseCard(useCase, index);
      grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);
    section.appendChild(this.createSectionDecoration('use-cases'));
    section.appendChild(container);

    return section;
  }

  private createUseCaseCard(useCase: UseCase, index: number): HTMLElement {
    const card = document.createElement('article');
    card.className = 'use-case-card reveal-item';
    card.style.setProperty('--card-index', String(index));
    card.style.setProperty('--card-gradient', useCase.gradient);

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'use-case-icon';
    iconWrapper.innerHTML = useCase.icon;

    const content = document.createElement('div');
    content.className = 'use-case-content';

    const title = document.createElement('h3');
    title.className = 'use-case-title';
    title.textContent = useCase.title;

    const description = document.createElement('p');
    description.className = 'use-case-description';
    description.textContent = useCase.description;

    content.appendChild(title);
    content.appendChild(description);

    card.appendChild(iconWrapper);
    card.appendChild(content);

    return card;
  }

  private createTechSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'home-tech section reveal-section';
    section.setAttribute('aria-labelledby', 'tech-title');

    const container = document.createElement('div');
    container.className = 'container';

    const content = document.createElement('div');
    content.className = 'tech-content';

    const textContent = document.createElement('div');
    textContent.className = 'tech-text';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      </span>
      <span>Technology</span>
    `;

    const title = document.createElement('h2');
    title.id = 'tech-title';
    title.className = 'tech-title';
    title.innerHTML = `Powered by <span class="text-gradient">modern</span> web standards`;

    const description = document.createElement('p');
    description.className = 'tech-description';
    description.textContent =
      'AstraSolaris leverages cutting-edge web technologies to deliver exceptional performance and developer experience. No plugins, no downloads—just open your browser.';

    const techGrid = document.createElement('div');
    techGrid.className = 'tech-grid';

    this.techStack.forEach((tech) => {
      const item = this.createTechItem(tech);
      techGrid.appendChild(item);
    });

    textContent.appendChild(badge);
    textContent.appendChild(title);
    textContent.appendChild(description);
    textContent.appendChild(techGrid);

    const visual = document.createElement('div');
    visual.className = 'tech-visual';
    visual.innerHTML = this.createTechVisual();

    content.appendChild(textContent);
    content.appendChild(visual);

    container.appendChild(content);
    section.appendChild(this.createSectionDecoration('tech'));
    section.appendChild(container);

    return section;
  }

  private createTechItem(tech: TechItem): HTMLElement {
    const item = document.createElement('div');
    item.className = 'tech-item reveal-item';

    const icon = document.createElement('div');
    icon.className = 'tech-item-icon';
    icon.innerHTML = tech.icon;

    const content = document.createElement('div');
    content.className = 'tech-item-content';

    const name = document.createElement('span');
    name.className = 'tech-item-name';
    name.textContent = tech.name;

    const description = document.createElement('span');
    description.className = 'tech-item-description';
    description.textContent = tech.description;

    content.appendChild(name);
    content.appendChild(description);

    item.appendChild(icon);
    item.appendChild(content);

    return item;
  }

  private createTechVisual(): string {
    return `
      <svg viewBox="0 0 400 400" class="tech-visual-svg" aria-hidden="true">
        <defs>
          <linearGradient id="tech-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--color-primary-500)" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="var(--color-secondary-500)" stop-opacity="0.8"/>
          </linearGradient>
          <linearGradient id="tech-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--color-info-500)" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="var(--color-primary-500)" stop-opacity="0.6"/>
          </linearGradient>
          <filter id="tech-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Central hub -->
        <circle cx="200" cy="200" r="40" fill="url(#tech-gradient-1)" filter="url(#tech-glow)" class="tech-hub"/>
        <circle cx="200" cy="200" r="30" fill="var(--bg-primary)" stroke="url(#tech-gradient-1)" stroke-width="2"/>
        
        <!-- Inner ring -->
        <circle cx="200" cy="200" r="80" fill="none" stroke="url(#tech-gradient-2)" stroke-width="1" stroke-dasharray="4 4" class="tech-ring tech-ring-1"/>
        
        <!-- Outer ring -->
        <circle cx="200" cy="200" r="140" fill="none" stroke="url(#tech-gradient-1)" stroke-width="1" stroke-dasharray="8 4" class="tech-ring tech-ring-2"/>
        
        <!-- Connection lines -->
        <line x1="200" y1="120" x2="200" y2="160" stroke="url(#tech-gradient-1)" stroke-width="2" class="tech-line"/>
        <line x1="280" y1="200" x2="240" y2="200" stroke="url(#tech-gradient-1)" stroke-width="2" class="tech-line"/>
        <line x1="200" y1="280" x2="200" y2="240" stroke="url(#tech-gradient-1)" stroke-width="2" class="tech-line"/>
        <line x1="120" y1="200" x2="160" y2="200" stroke="url(#tech-gradient-1)" stroke-width="2" class="tech-line"/>
        
        <!-- Orbital nodes -->
        <circle cx="200" cy="60" r="20" fill="var(--bg-surface)" stroke="url(#tech-gradient-1)" stroke-width="2" class="tech-node"/>
        <circle cx="340" cy="200" r="20" fill="var(--bg-surface)" stroke="url(#tech-gradient-1)" stroke-width="2" class="tech-node"/>
        <circle cx="200" cy="340" r="20" fill="var(--bg-surface)" stroke="url(#tech-gradient-1)" stroke-width="2" class="tech-node"/>
        <circle cx="60" cy="200" r="20" fill="var(--bg-surface)" stroke="url(#tech-gradient-1)" stroke-width="2" class="tech-node"/>
        
        <!-- Node icons placeholders -->
        <text x="200" y="65" text-anchor="middle" fill="var(--color-primary-400)" font-size="16">TS</text>
        <text x="340" y="205" text-anchor="middle" fill="var(--color-primary-400)" font-size="16">3D</text>
        <text x="200" y="345" text-anchor="middle" fill="var(--color-primary-400)" font-size="16">⚡</text>
        <text x="60" y="205" text-anchor="middle" fill="var(--color-primary-400)" font-size="16">GL</text>
        
        <!-- Center icon -->
        <text x="200" y="205" text-anchor="middle" fill="var(--color-primary-300)" font-size="20" font-weight="bold">A</text>
      </svg>
    `;
  }

  private createStatsSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'home-stats section reveal-section';
    section.setAttribute('aria-labelledby', 'stats-title');

    const container = document.createElement('div');
    container.className = 'container';

    const statsGrid = document.createElement('div');
    statsGrid.className = 'stats-grid';

    this.stats.forEach((stat, index) => {
      const item = this.createStatItem(stat, index);
      statsGrid.appendChild(item);
    });

    container.appendChild(statsGrid);
    section.appendChild(container);

    return section;
  }

  private createStatItem(stat: Stat, index: number): HTMLElement {
    const item = document.createElement('div');
    item.className = 'stat-item reveal-item';
    item.style.setProperty('--stat-index', String(index));

    const icon = document.createElement('span');
    icon.className = 'stat-icon';
    icon.textContent = stat.icon;

    const value = document.createElement('span');
    value.className = 'stat-value';
    value.textContent = stat.value;

    const label = document.createElement('span');
    label.className = 'stat-label';
    label.textContent = stat.label;

    item.appendChild(icon);
    item.appendChild(value);
    item.appendChild(label);

    return item;
  }

  private createCtaSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'home-cta section reveal-section';
    section.setAttribute('aria-labelledby', 'cta-title');

    const container = document.createElement('div');
    container.className = 'container';

    const content = document.createElement('div');
    content.className = 'cta-content';

    const title = document.createElement('h2');
    title.id = 'cta-title';
    title.className = 'cta-title';
    title.innerHTML = `Ready to explore<br><span class="text-gradient">the universe?</span>`;

    const description = document.createElement('p');
    description.className = 'cta-description';
    description.textContent =
      'Start creating stunning astronomical visualizations today. No installation required—just your imagination and a web browser.';

    const actions = document.createElement('div');
    actions.className = 'cta-actions';

    const primaryBtn = document.createElement('a');
    primaryBtn.href = '/playground/';
    primaryBtn.className = 'btn btn-primary btn-xl cta-btn-primary';
    primaryBtn.innerHTML = `
      <span class="cta-btn-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </span>
      <span>Launch Playground</span>
    `;

    const secondaryBtn = document.createElement('a');
    secondaryBtn.href = '/docs/guide/quick-start';
    secondaryBtn.className = 'btn btn-secondary btn-xl';
    secondaryBtn.innerHTML = `
      <span>Read the Docs</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    actions.appendChild(primaryBtn);
    actions.appendChild(secondaryBtn);

    const orbitDecoration = document.createElement('div');
    orbitDecoration.className = 'cta-orbit-decoration';
    orbitDecoration.setAttribute('aria-hidden', 'true');
    orbitDecoration.innerHTML = this.createCtaOrbits();

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(actions);

    container.appendChild(content);
    container.appendChild(orbitDecoration);
    section.appendChild(this.createSectionDecoration('cta'));
    section.appendChild(container);

    return section;
  }

  private createCtaOrbits(): string {
    return `
      <svg viewBox="0 0 400 400" class="cta-orbits-svg">
        <defs>
          <linearGradient id="cta-orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--color-primary-500)" stop-opacity="0.6"/>
            <stop offset="50%" stop-color="var(--color-secondary-500)" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="var(--color-primary-500)" stop-opacity="0.6"/>
          </linearGradient>
          <radialGradient id="cta-planet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--color-accent-400)" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="var(--color-accent-400)" stop-opacity="0"/>
          </radialGradient>
        </defs>
        
        <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="url(#cta-orbit-gradient)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit cta-orbit-1"/>
        <ellipse cx="200" cy="200" rx="140" ry="70" fill="none" stroke="url(#cta-orbit-gradient)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit cta-orbit-2"/>
        <ellipse cx="200" cy="200" rx="100" ry="45" fill="none" stroke="url(#cta-orbit-gradient)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit cta-orbit-3"/>
        
        <circle cx="200" cy="200" r="25" fill="url(#cta-planet-glow)"/>
        <circle cx="200" cy="200" r="15" fill="var(--color-accent-400)" class="cta-sun"/>
        
        <circle cx="320" cy="165" r="8" fill="var(--color-primary-400)" class="cta-planet cta-planet-1"/>
        <circle cx="100" cy="220" r="6" fill="var(--color-info-400)" class="cta-planet cta-planet-2"/>
        <circle cx="260" cy="260" r="5" fill="var(--color-secondary-400)" class="cta-planet cta-planet-3"/>
      </svg>
    `;
  }

  private createSectionDecoration(sectionId: string): HTMLElement {
    const decoration = document.createElement('div');
    decoration.className = `section-decoration section-decoration-${sectionId}`;
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="section-glow section-glow-1"></div>
      <div class="section-glow section-glow-2"></div>
    `;

    return decoration;
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            if (!this.revealedSections.has(section)) {
              this.revealedSections.add(section);
              this.revealSection(section);
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
      const sections = this.element.querySelectorAll('.reveal-section');
      sections.forEach((section) => {
        observer.observe(section);
      });
    });
  }

  private revealSection(section: HTMLElement): void {
    section.classList.add('revealed');

    const items = section.querySelectorAll('.reveal-item');
    items.forEach((item, index) => {
      const element = item as HTMLElement;
      setTimeout(() => {
        element.classList.add('revealed');
      }, index * 100);
    });
  }

  private injectStyles(): void {
    const styleId = 'home-page-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .home-page {
        position: relative;
      }

      /* Section Decorations */
      .section-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
        overflow: hidden;
      }

      .section-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.2;
      }

      .section-glow-1 {
        width: 500px;
        height: 500px;
        background: var(--color-primary-500);
      }

      .section-glow-2 {
        width: 400px;
        height: 400px;
        background: var(--color-secondary-500);
      }

      .section-decoration-use-cases .section-glow-1 {
        top: 20%;
        left: -10%;
      }

      .section-decoration-use-cases .section-glow-2 {
        bottom: 10%;
        right: -10%;
      }

      .section-decoration-tech .section-glow-1 {
        top: 30%;
        right: -15%;
      }

      .section-decoration-tech .section-glow-2 {
        bottom: 20%;
        left: -10%;
      }

      .section-decoration-cta .section-glow-1 {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        opacity: 0.15;
      }

      .section-decoration-cta .section-glow-2 {
        display: none;
      }

      /* Section Badge */
      .section-badge {
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

      .section-badge-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Use Cases Section */
      .home-use-cases {
        position: relative;
        background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      }

      .use-cases-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 768px) {
        .use-cases-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .use-case-card {
        position: relative;
        display: flex;
        gap: var(--space-4);
        padding: var(--space-6);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--card-radius);
        transition: all var(--duration-normal) var(--ease-out);
        overflow: hidden;
      }

      .use-case-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--card-gradient);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--duration-normal) var(--ease-out);
      }

      .use-case-card:hover {
        background: var(--card-bg-hover);
        border-color: var(--card-border-hover);
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
      }

      .use-case-card:hover::before {
        transform: scaleX(1);
      }

      .use-case-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
        border-radius: var(--radius-xl);
        flex-shrink: 0;
        transition: all var(--duration-normal) var(--ease-out);
      }

      .use-case-icon svg {
        width: 1.75rem;
        height: 1.75rem;
        color: var(--color-primary-400);
      }

      .use-case-card:hover .use-case-icon {
        transform: scale(1.1);
        box-shadow: var(--glow-primary-sm);
      }

      .use-case-content {
        flex: 1;
      }

      .use-case-title {
        font-size: var(--text-lg);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .use-case-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        line-height: var(--leading-relaxed);
        margin-bottom: 0;
      }

      /* Tech Section */
      .home-tech {
        position: relative;
        background: var(--bg-secondary);
      }

      .tech-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .tech-content {
          grid-template-columns: 1fr 1fr;
        }
      }

      .tech-title {
        font-size: var(--text-4xl);
        margin-bottom: var(--space-4);
      }

      .tech-description {
        font-size: var(--text-lg);
        color: var(--text-secondary);
        margin-bottom: var(--space-8);
        line-height: var(--leading-relaxed);
      }

      .tech-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);
      }

      .tech-item {
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        padding: var(--space-4);
        background: rgba(30, 41, 59, 0.4);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .tech-item:hover {
        background: rgba(30, 41, 59, 0.6);
        border-color: var(--border-default);
        transform: translateY(-2px);
      }

      .tech-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        flex-shrink: 0;
        color: var(--color-primary-400);
      }

      .tech-item-icon svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      .tech-item-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }

      .tech-item-name {
        font-size: var(--text-base);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
      }

      .tech-item-description {
        font-size: var(--text-xs);
        color: var(--text-muted);
      }

      .tech-visual {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-8);
      }

      .tech-visual-svg {
        width: 100%;
        max-width: 400px;
        height: auto;
      }

      .tech-hub {
        animation: pulse-glow 3s ease-in-out infinite;
      }

      .tech-ring {
        animation: rotate 20s linear infinite;
        transform-origin: center;
      }

      .tech-ring-1 {
        animation-direction: reverse;
      }

      .tech-ring-2 {
        animation-duration: 30s;
      }

      .tech-node {
        transition: all var(--duration-normal) var(--ease-out);
      }

      .tech-visual-svg:hover .tech-node {
        filter: drop-shadow(0 0 8px var(--color-primary-400));
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      /* Stats Section */
      .home-stats {
        position: relative;
        background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        padding-top: var(--space-12);
        padding-bottom: var(--space-12);
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-8);
      }

      @media (min-width: 768px) {
        .stats-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: var(--space-6);
        background: rgba(30, 41, 59, 0.3);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-2xl);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .stat-item:hover {
        background: rgba(30, 41, 59, 0.5);
        border-color: var(--border-default);
        transform: translateY(-4px);
      }

      .stat-icon {
        font-size: var(--text-3xl);
        margin-bottom: var(--space-2);
      }

      .stat-value {
        font-family: var(--font-display);
        font-size: var(--text-4xl);
        font-weight: var(--font-bold);
        background: var(--gradient-text-cosmic);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: var(--space-1);
      }

      .stat-label {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wide);
      }

      /* CTA Section */
      .home-cta {
        position: relative;
        background: var(--bg-primary);
        overflow: hidden;
      }

      .home-cta .container {
        position: relative;
        z-index: var(--z-raised);
      }

      .cta-content {
        text-align: center;
        max-width: 42rem;
        margin: 0 auto;
      }

      .cta-title {
        font-size: var(--text-5xl);
        font-weight: var(--font-bold);
        line-height: var(--leading-tight);
        margin-bottom: var(--space-6);
      }

      .cta-description {
        font-size: var(--text-xl);
        color: var(--text-secondary);
        margin-bottom: var(--space-8);
        line-height: var(--leading-relaxed);
      }

      .cta-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-4);
      }

      .cta-btn-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .cta-btn-primary {
        position: relative;
        overflow: hidden;
      }

      .cta-btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: shimmer 3s ease-in-out infinite;
      }

      @keyframes shimmer {
        0% {
          left: -100%;
        }
        50%, 100% {
          left: 100%;
        }
      }

      .cta-orbit-decoration {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 600px;
        opacity: 0.3;
        pointer-events: none;
        z-index: var(--z-behind);
      }

      .cta-orbits-svg {
        width: 100%;
        height: auto;
      }

      .cta-orbit {
        animation: orbit-rotate 30s linear infinite;
        transform-origin: center;
      }

      .cta-orbit-1 {
        animation-duration: 40s;
      }

      .cta-orbit-2 {
        animation-duration: 30s;
        animation-direction: reverse;
      }

      .cta-orbit-3 {
        animation-duration: 20s;
      }

      .cta-sun {
        animation: sun-pulse 4s ease-in-out infinite;
      }

      .cta-planet {
        animation: planet-float 6s ease-in-out infinite;
      }

      .cta-planet-1 {
        animation-delay: 0s;
      }

      .cta-planet-2 {
        animation-delay: 2s;
      }

      .cta-planet-3 {
        animation-delay: 4s;
      }

      @keyframes orbit-rotate {
        from {
          transform: rotate(-20deg);
        }
        to {
          transform: rotate(340deg);
        }
      }

      @keyframes sun-pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }

      @keyframes planet-float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      /* Reveal Animations */
      .reveal-section {
        opacity: 0;
        transform: translateY(40px);
      }

      .reveal-section.revealed {
        opacity: 1;
        transform: translateY(0);
        transition: opacity var(--duration-slow) var(--ease-out),
                    transform var(--duration-slow) var(--ease-out);
      }

      .reveal-item {
        opacity: 0;
        transform: translateY(20px);
      }

      .reveal-item.revealed {
        opacity: 1;
        transform: translateY(0);
        transition: opacity var(--duration-normal) var(--ease-out),
                    transform var(--duration-normal) var(--ease-out);
      }

      /* Responsive */
      @media (max-width: 640px) {
        .cta-title {
          font-size: var(--text-3xl);
        }

        .cta-title br {
          display: none;
        }

        .cta-actions {
          flex-direction: column;
        }

        .cta-actions .btn {
          width: 100%;
          justify-content: center;
        }

        .tech-grid {
          grid-template-columns: 1fr;
        }

        .tech-visual {
          display: none;
        }

        .use-case-card {
          flex-direction: column;
          text-align: center;
        }

        .use-case-icon {
          margin: 0 auto;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .reveal-section,
        .reveal-item {
          opacity: 1;
          transform: none;
        }

        .tech-hub,
        .tech-ring,
        .cta-orbit,
        .cta-sun,
        .cta-planet,
        .cta-btn-primary::before {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  destroy(): void {
    this.revealedSections.clear();
    this.element.remove();
  }
}

export { HomePage };
export type { UseCase, TechItem, Stat };