interface MissionPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface TimelineItem {
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

interface TeamPrinciple {
  title: string;
  description: string;
  icon: string;
}

class AboutPage {
  private readonly element: HTMLElement;
  private readonly observer: IntersectionObserver | null = null;
  private revealedSections: Set<HTMLElement> = new Set();

  private readonly missionPoints: MissionPoint[] = [
    {
      id: 'accessible',
      title: 'Accessible to Everyone',
      description:
        'From students to researchers, AstraSolaris breaks down barriers to astronomical visualization with plain English scripting.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>`,
    },
    {
      id: 'scientific',
      title: 'Scientifically Accurate',
      description:
        'Built on proven astronomical algorithms and ephemeris data, ensuring every visualization reflects real celestial mechanics.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>`,
    },
    {
      id: 'open',
      title: 'Open Source Forever',
      description:
        'MIT licensed and community-driven. The cosmos belongs to everyone, and so does the software to explore it.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>`,
    },
  ];

  private readonly timeline: TimelineItem[] = [
    {
      phase: 'Phase 1',
      title: 'Foundation',
      description: 'Monorepo setup, architecture design, and core infrastructure establishment.',
      status: 'completed',
    },
    {
      phase: 'Phase 2',
      title: 'Core Runtime',
      description: 'Astra language lexer, parser, and interpreter implementation.',
      status: 'in-progress',
    },
    {
      phase: 'Phase 3',
      title: 'Engine Integration',
      description: 'Three.js engine, progressive loading, and Web Worker optimization.',
      status: 'upcoming',
    },
    {
      phase: 'Phase 4',
      title: 'Applications',
      description: 'Explorer, Playground, and educational tools for the community.',
      status: 'upcoming',
    },
    {
      phase: 'Phase 5',
      title: 'Community Launch',
      description: 'Documentation, outreach, and establishing the contributor ecosystem.',
      status: 'upcoming',
    },
  ];

  private readonly values: Value[] = [
    {
      id: 'transparency',
      title: 'Transparency',
      description: 'Every decision, every line of code, every roadmap update is public. We build in the open.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description:
        'Scientists, developers, educators, and enthusiasts working together toward a common cosmic vision.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    },
    {
      id: 'excellence',
      title: 'Excellence',
      description: 'We strive for the highest quality in code, documentation, and user experience.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    },
    {
      id: 'education',
      title: 'Education First',
      description: 'Making astronomy accessible is our core mission. Every feature should teach something.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
  ];

  private readonly teamPrinciples: TeamPrinciple[] = [
    {
      title: 'Code of Conduct',
      description: 'We maintain a welcoming, inclusive environment for all contributors regardless of background.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>`,
    },
    {
      title: 'Mentorship',
      description: 'Experienced contributors guide newcomers. Everyone was a beginner once.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>`,
    },
    {
      title: 'Recognition',
      description: 'Every contribution matters. We celebrate our community members and their achievements.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>`,
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
    container.className = 'about-page';

    container.appendChild(this.createHeroSection());
    container.appendChild(this.createMissionSection());
    container.appendChild(this.createAstraSection());
    container.appendChild(this.createValuesSection());
    container.appendChild(this.createTimelineSection());
    container.appendChild(this.createTeamSection());
    container.appendChild(this.createCtaSection());

    this.injectStyles();

    return container;
  }

  private createHeroSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'about-hero';
    section.setAttribute('aria-labelledby', 'about-hero-title');

    const container = document.createElement('div');
    container.className = 'container';

    const content = document.createElement('div');
    content.className = 'about-hero-content';

    const badge = document.createElement('div');
    badge.className = 'about-hero-badge';
    badge.innerHTML = `
      <span class="about-hero-badge-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      </span>
      <span>About the Project</span>
    `;

    const title = document.createElement('h1');
    title.id = 'about-hero-title';
    title.className = 'about-hero-title';
    title.innerHTML = `Bringing the <span class="text-gradient">cosmos</span> to everyone`;

    const description = document.createElement('p');
    description.className = 'about-hero-description';
    description.textContent =
      'AstraSolaris is an open-source platform for astronomical simulation, built around Astra—a domain-specific scripting language that lets anyone describe space scenarios in plain English and create stunning interactive 3D visualizations.';

    const stats = this.createHeroStats();

    content.appendChild(badge);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(stats);

    container.appendChild(content);
    section.appendChild(this.createHeroDecoration());
    section.appendChild(container);

    return section;
  }

  private createHeroDecoration(): HTMLElement {
    const decoration = document.createElement('div');
    decoration.className = 'about-hero-decoration';
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="about-hero-glow about-hero-glow-1"></div>
      <div class="about-hero-glow about-hero-glow-2"></div>
      <div class="about-hero-orbital">
        <svg viewBox="0 0 500 500" class="about-hero-orbital-svg">
          <defs>
            <linearGradient id="about-orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--color-primary-500)" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="var(--color-secondary-500)" stop-opacity="0.3"/>
            </linearGradient>
          </defs>
          <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="url(#about-orbit-gradient)" stroke-width="1" transform="rotate(-15 250 250)" class="about-orbit-1"/>
          <ellipse cx="250" cy="250" rx="160" ry="60" fill="none" stroke="url(#about-orbit-gradient)" stroke-width="1" transform="rotate(-15 250 250)" class="about-orbit-2"/>
          <ellipse cx="250" cy="250" rx="120" ry="40" fill="none" stroke="url(#about-orbit-gradient)" stroke-width="1" transform="rotate(-15 250 250)" class="about-orbit-3"/>
          <circle cx="250" cy="250" r="20" fill="var(--color-accent-400)" class="about-sun"/>
        </svg>
      </div>
    `;

    return decoration;
  }

  private createHeroStats(): HTMLElement {
    const stats = document.createElement('div');
    stats.className = 'about-hero-stats';

    const statsData = [
      { value: '100%', label: 'Open Source' },
      { value: '0', label: 'Server Dependencies' },
      { value: 'MIT', label: 'Licensed' },
    ];

    statsData.forEach((stat) => {
      const item = document.createElement('div');
      item.className = 'about-hero-stat';

      const value = document.createElement('span');
      value.className = 'about-hero-stat-value';
      value.textContent = stat.value;

      const label = document.createElement('span');
      label.className = 'about-hero-stat-label';
      label.textContent = stat.label;

      item.appendChild(value);
      item.appendChild(label);
      stats.appendChild(item);
    });

    return stats;
  }

  private createMissionSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'about-mission section reveal-section';
    section.setAttribute('aria-labelledby', 'mission-title');

    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('div');
    header.className = 'section-header';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </span>
      <span>Our Mission</span>
    `;

    const title = document.createElement('h2');
    title.id = 'mission-title';
    title.className = 'section-title';
    title.innerHTML = `Democratizing <span class="text-gradient">astronomical visualization</span>`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      'We believe that the wonders of the universe should be accessible to everyone—students, educators, researchers, and enthusiasts alike. AstraSolaris removes the technical barriers between people and the cosmos.';

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const grid = document.createElement('div');
    grid.className = 'about-mission-grid';

    this.missionPoints.forEach((point, index) => {
      const card = this.createMissionCard(point, index);
      grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);
    section.appendChild(this.createSectionDecoration('mission'));
    section.appendChild(container);

    return section;
  }

  private createMissionCard(point: MissionPoint, index: number): HTMLElement {
    const card = document.createElement('div');
    card.className = 'about-mission-card reveal-item';
    card.style.setProperty('--card-index', String(index));

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'about-mission-card-icon';
    iconWrapper.innerHTML = point.icon;

    const content = document.createElement('div');
    content.className = 'about-mission-card-content';

    const title = document.createElement('h3');
    title.className = 'about-mission-card-title';
    title.textContent = point.title;

    const description = document.createElement('p');
    description.className = 'about-mission-card-description';
    description.textContent = point.description;

    content.appendChild(title);
    content.appendChild(description);

    card.appendChild(iconWrapper);
    card.appendChild(content);

    return card;
  }

  private createAstraSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'about-astra section reveal-section';
    section.setAttribute('aria-labelledby', 'astra-title');

    const container = document.createElement('div');
    container.className = 'container';

    const content = document.createElement('div');
    content.className = 'about-astra-content';

    const textContent = document.createElement('div');
    textContent.className = 'about-astra-text';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      </span>
      <span>The Astra Language</span>
    `;

    const title = document.createElement('h2');
    title.id = 'astra-title';
    title.className = 'about-astra-title';
    title.innerHTML = `A language designed for<br><span class="text-gradient">human understanding</span>`;

    const description = document.createElement('div');
    description.className = 'about-astra-description';
    description.innerHTML = `
      <p>
        At the heart of AstraSolaris is <strong>Astra</strong>—a domain-specific language that reads like natural English. 
        No cryptic syntax, no steep learning curve. Just describe what you want to see, and watch it come to life.
      </p>
      <p>
        Astra was designed with one principle in mind: <em>if you can describe it, you can visualize it</em>. 
        Whether you're a student exploring the solar system for the first time or a researcher presenting complex orbital mechanics, 
        Astra speaks your language.
      </p>
    `;

    const features = document.createElement('ul');
    features.className = 'about-astra-features';

    const featureItems = [
      'Human-readable syntax—no programming experience required',
      'Define celestial objects, observers, and outputs naturally',
      'Extensible with custom definitions and functions',
      'Formally specified with comprehensive documentation',
    ];

    featureItems.forEach((text) => {
      const item = document.createElement('li');
      item.className = 'about-astra-feature';
      item.innerHTML = `
        <span class="about-astra-feature-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
        <span>${text}</span>
      `;
      features.appendChild(item);
    });

    textContent.appendChild(badge);
    textContent.appendChild(title);
    textContent.appendChild(description);
    textContent.appendChild(features);

    const codeExample = this.createAstraCodeExample();

    content.appendChild(textContent);
    content.appendChild(codeExample);

    container.appendChild(content);
    section.appendChild(this.createSectionDecoration('astra'));
    section.appendChild(container);

    return section;
  }

  private createAstraCodeExample(): HTMLElement {
    const codeWrapper = document.createElement('div');
    codeWrapper.className = 'about-astra-code reveal-item';

    const codeHeader = document.createElement('div');
    codeHeader.className = 'about-astra-code-header';
    codeHeader.innerHTML = `
      <div class="about-astra-code-dots">
        <span class="about-astra-code-dot red"></span>
        <span class="about-astra-code-dot yellow"></span>
        <span class="about-astra-code-dot green"></span>
      </div>
      <span class="about-astra-code-filename">solar-system.astra</span>
    `;

    const codeBody = document.createElement('div');
    codeBody.className = 'about-astra-code-body';

    const codeContent = `<span class="syntax-comment"># Visualize our cosmic neighborhood</span>
<span class="syntax-keyword">Start</span> <span class="syntax-keyword">space</span>
  <span class="syntax-variable">Sun</span>
  <span class="syntax-variable">Mercury</span>
  <span class="syntax-variable">Venus</span>
  <span class="syntax-variable">Earth</span>
  <span class="syntax-variable">Mars</span>
<span class="syntax-keyword">End</span> <span class="syntax-keyword">space</span>

<span class="syntax-keyword">Start</span> <span class="syntax-keyword">observer</span> <span class="syntax-property">heliocentric</span>
  <span class="syntax-property">show</span> <span class="syntax-property">all</span> <span class="syntax-property">orbits</span>
  <span class="syntax-property">at</span> <span class="syntax-property">distance</span> <span class="syntax-number">5</span> <span class="syntax-property">AU</span>
<span class="syntax-keyword">End</span> <span class="syntax-keyword">observer</span>

<span class="syntax-keyword">Start</span> <span class="syntax-keyword">output</span> <span class="syntax-property">scene</span>`;

    codeBody.innerHTML = `<pre><code>${codeContent}</code></pre>`;

    const codeFooter = document.createElement('div');
    codeFooter.className = 'about-astra-code-footer';
    codeFooter.innerHTML = `
      <span class="about-astra-code-hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        That's all it takes to create an interactive solar system!
      </span>
    `;

    codeWrapper.appendChild(codeHeader);
    codeWrapper.appendChild(codeBody);
    codeWrapper.appendChild(codeFooter);

    return codeWrapper;
  }

  private createValuesSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'about-values section reveal-section';
    section.setAttribute('aria-labelledby', 'values-title');

    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('div');
    header.className = 'section-header';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </span>
      <span>Our Values</span>
    `;

    const title = document.createElement('h2');
    title.id = 'values-title';
    title.className = 'section-title';
    title.innerHTML = `The principles that <span class="text-gradient">guide us</span>`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      'Every decision we make, from code architecture to community management, is guided by these core values.';

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const grid = document.createElement('div');
    grid.className = 'about-values-grid';

    this.values.forEach((value, index) => {
      const card = this.createValueCard(value, index);
      grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);
    section.appendChild(this.createSectionDecoration('values'));
    section.appendChild(container);

    return section;
  }

  private createValueCard(value: Value, index: number): HTMLElement {
    const card = document.createElement('div');
    card.className = 'about-value-card reveal-item';
    card.style.setProperty('--card-index', String(index));
    card.style.setProperty('--card-gradient', value.gradient);

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'about-value-card-icon';
    iconWrapper.innerHTML = value.icon;

    const title = document.createElement('h3');
    title.className = 'about-value-card-title';
    title.textContent = value.title;

    const description = document.createElement('p');
    description.className = 'about-value-card-description';
    description.textContent = value.description;

    card.appendChild(iconWrapper);
    card.appendChild(title);
    card.appendChild(description);

    return card;
  }

  private createTimelineSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'about-timeline section reveal-section';
    section.setAttribute('aria-labelledby', 'timeline-title');

    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('div');
    header.className = 'section-header';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </span>
      <span>Roadmap</span>
    `;

    const title = document.createElement('h2');
    title.id = 'timeline-title';
    title.className = 'section-title';
    title.innerHTML = `Our journey to <span class="text-gradient">the stars</span>`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      "We're building AstraSolaris in phases, with each milestone bringing us closer to our vision of accessible astronomical visualization.";

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const timelineEl = document.createElement('div');
    timelineEl.className = 'about-timeline-content';

    this.timeline.forEach((item, index) => {
      const timelineItem = this.createTimelineItem(item, index);
      timelineEl.appendChild(timelineItem);
    });

    container.appendChild(header);
    container.appendChild(timelineEl);
    section.appendChild(this.createSectionDecoration('timeline'));
    section.appendChild(container);

    return section;
  }

  private createTimelineItem(item: TimelineItem, index: number): HTMLElement {
    const element = document.createElement('div');
    element.className = `about-timeline-item about-timeline-item--${item.status} reveal-item`;
    element.style.setProperty('--item-index', String(index));

    const marker = document.createElement('div');
    marker.className = 'about-timeline-marker';

    if (item.status === 'completed') {
      marker.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    } else if (item.status === 'in-progress') {
      marker.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      `;
    } else {
      marker.innerHTML = `<span class="about-timeline-marker-dot"></span>`;
    }

    const content = document.createElement('div');
    content.className = 'about-timeline-item-content';

    const phase = document.createElement('span');
    phase.className = 'about-timeline-phase';
    phase.textContent = item.phase;

    const title = document.createElement('h3');
    title.className = 'about-timeline-item-title';
    title.textContent = item.title;

    const description = document.createElement('p');
    description.className = 'about-timeline-item-description';
    description.textContent = item.description;

    const status = document.createElement('span');
    status.className = `about-timeline-status about-timeline-status--${item.status}`;

    const statusText =
      item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Upcoming';
    status.textContent = statusText;

    content.appendChild(phase);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(status);

    element.appendChild(marker);
    element.appendChild(content);

    return element;
  }

  private createTeamSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'about-team section reveal-section';
    section.setAttribute('aria-labelledby', 'team-title');

    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('div');
    header.className = 'section-header';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </span>
      <span>Community Driven</span>
    `;

    const title = document.createElement('h2');
    title.id = 'team-title';
    title.className = 'section-title';
    title.innerHTML = `Built by a <span class="text-gradient">global community</span>`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      "AstraSolaris isn't built by a company—it's built by passionate individuals around the world who share a love for astronomy and open source software.";

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const principlesGrid = document.createElement('div');
    principlesGrid.className = 'about-team-principles';

    this.teamPrinciples.forEach((principle, index) => {
      const card = this.createPrincipleCard(principle, index);
      principlesGrid.appendChild(card);
    });

    const contribution = this.createContributionCta();

    container.appendChild(header);
    container.appendChild(principlesGrid);
    container.appendChild(contribution);
    section.appendChild(this.createSectionDecoration('team'));
    section.appendChild(container);

    return section;
  }

  private createPrincipleCard(principle: TeamPrinciple, index: number): HTMLElement {
    const card = document.createElement('div');
    card.className = 'about-principle-card reveal-item';
    card.style.setProperty('--card-index', String(index));

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'about-principle-card-icon';
    iconWrapper.innerHTML = principle.icon;

    const title = document.createElement('h3');
    title.className = 'about-principle-card-title';
    title.textContent = principle.title;

    const description = document.createElement('p');
    description.className = 'about-principle-card-description';
    description.textContent = principle.description;

    card.appendChild(iconWrapper);
    card.appendChild(title);
    card.appendChild(description);

    return card;
  }

  private createContributionCta(): HTMLElement {
    const cta = document.createElement('div');
    cta.className = 'about-contribution-cta reveal-item';

    const content = document.createElement('div');
    content.className = 'about-contribution-content';

    const title = document.createElement('h3');
    title.className = 'about-contribution-title';
    title.textContent = 'Want to contribute?';

    const description = document.createElement('p');
    description.className = 'about-contribution-description';
    description.textContent =
      "We welcome contributions from everyone—scientists, developers, educators, artists, and enthusiasts. There's a place for you in our community.";

    const actions = document.createElement('div');
    actions.className = 'about-contribution-actions';

    const primaryBtn = document.createElement('a');
    primaryBtn.href = 'https://github.com/astra-solaris/astra-solaris';
    primaryBtn.target = '_blank';
    primaryBtn.rel = 'noopener noreferrer';
    primaryBtn.className = 'btn btn-primary btn-lg';
    primaryBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      <span>View on GitHub</span>
    `;

    const secondaryBtn = document.createElement('a');
    secondaryBtn.href = '/docs/contributing/';
    secondaryBtn.className = 'btn btn-secondary btn-lg';
    secondaryBtn.innerHTML = `
      <span>Contributing Guide</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    actions.appendChild(primaryBtn);
    actions.appendChild(secondaryBtn);

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(actions);

    cta.appendChild(content);

    return cta;
  }

  private createCtaSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'about-cta section reveal-section';
    section.setAttribute('aria-labelledby', 'about-cta-title');

    const container = document.createElement('div');
    container.className = 'container';

    const content = document.createElement('div');
    content.className = 'about-cta-content';

    const title = document.createElement('h2');
    title.id = 'about-cta-title';
    title.className = 'about-cta-title';
    title.innerHTML = `Ready to explore<br><span class="text-gradient">the cosmos?</span>`;

    const description = document.createElement('p');
    description.className = 'about-cta-description';
    description.textContent =
      'Start your journey with AstraSolaris today. No downloads, no installations—just open your browser and begin.';

    const actions = document.createElement('div');
    actions.className = 'about-cta-actions';

    const primaryBtn = document.createElement('a');
    primaryBtn.href = '/playground/';
    primaryBtn.className = 'btn btn-primary btn-xl';
    primaryBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
      <span>Launch Playground</span>
    `;

    const secondaryBtn = document.createElement('a');
    secondaryBtn.href = '/docs/guide/quick-start';
    secondaryBtn.className = 'btn btn-secondary btn-xl';
    secondaryBtn.innerHTML = `
      <span>Quick Start Guide</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    actions.appendChild(primaryBtn);
    actions.appendChild(secondaryBtn);

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(actions);

    container.appendChild(content);
    section.appendChild(this.createCtaDecoration());
    section.appendChild(container);

    return section;
  }

  private createCtaDecoration(): HTMLElement {
    const decoration = document.createElement('div');
    decoration.className = 'about-cta-decoration';
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="about-cta-glow"></div>
      <svg viewBox="0 0 400 400" class="about-cta-orbits">
        <defs>
          <linearGradient id="cta-orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--color-primary-500)" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="var(--color-secondary-500)" stop-opacity="0.2"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="200" rx="180" ry="80" fill="none" stroke="url(#cta-orbit-grad)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit-1"/>
        <ellipse cx="200" cy="200" rx="140" ry="60" fill="none" stroke="url(#cta-orbit-grad)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit-2"/>
        <ellipse cx="200" cy="200" rx="100" ry="40" fill="none" stroke="url(#cta-orbit-grad)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit-3"/>
        <circle cx="200" cy="200" r="15" fill="var(--color-accent-400)" class="cta-sun"/>
        <circle cx="200" cy="200" r="25" fill="var(--color-accent-400)" opacity="0.3" class="cta-sun-glow"/>
      </svg>
    `;

    return decoration;
  }

  private createSectionDecoration(sectionId: string): HTMLElement {
    const decoration = document.createElement('div');
    decoration.className = `about-section-decoration about-section-decoration-${sectionId}`;
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="about-section-glow about-section-glow-1"></div>
      <div class="about-section-glow about-section-glow-2"></div>
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
    const styleId = 'about-page-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .about-page {
        position: relative;
      }

      /* ========================================
         About Hero Section
         ======================================== */

      .about-hero {
        position: relative;
        min-height: 80vh;
        display: flex;
        align-items: center;
        padding-top: calc(var(--header-height) + var(--space-16));
        padding-bottom: var(--space-20);
        overflow: hidden;
      }

      .about-hero-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
      }

      .about-hero-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.3;
      }

      .about-hero-glow-1 {
        width: 600px;
        height: 600px;
        top: 20%;
        left: -10%;
        background: var(--color-primary-500);
      }

      .about-hero-glow-2 {
        width: 500px;
        height: 500px;
        bottom: 10%;
        right: -10%;
        background: var(--color-secondary-500);
      }

      .about-hero-orbital {
        position: absolute;
        top: 50%;
        right: -5%;
        transform: translateY(-50%);
        width: 500px;
        height: 500px;
        opacity: 0.3;
      }

      .about-hero-orbital-svg {
        width: 100%;
        height: 100%;
      }

      .about-orbit-1,
      .about-orbit-2,
      .about-orbit-3 {
        animation: about-orbit-rotate 30s linear infinite;
        transform-origin: center;
      }

      .about-orbit-1 {
        animation-duration: 40s;
      }

      .about-orbit-2 {
        animation-duration: 30s;
        animation-direction: reverse;
      }

      .about-orbit-3 {
        animation-duration: 20s;
      }

      .about-sun {
        animation: about-sun-pulse 4s ease-in-out infinite;
      }

      @keyframes about-orbit-rotate {
        from {
          transform: rotate(-15deg);
        }
        to {
          transform: rotate(345deg);
        }
      }

      @keyframes about-sun-pulse {
        0%, 100% {
          opacity: 1;
          r: 20;
        }
        50% {
          opacity: 0.8;
          r: 22;
        }
      }

      .about-hero-content {
        position: relative;
        z-index: var(--z-raised);
        max-width: 48rem;
      }

      .about-hero-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-1-5) var(--space-4);
        background: rgba(99, 102, 241, 0.15);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: var(--radius-full);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        color: var(--color-primary-300);
        margin-bottom: var(--space-6);
        animation: fade-in-up var(--duration-slow) var(--ease-out);
      }

      .about-hero-badge-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .about-hero-title {
        font-size: var(--text-6xl);
        font-weight: var(--font-bold);
        line-height: var(--leading-tight);
        margin-bottom: var(--space-6);
        animation: fade-in-up var(--duration-slow) var(--ease-out) 0.1s both;
      }

      .about-hero-description {
        font-size: var(--text-xl);
        color: var(--text-secondary);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-8);
        animation: fade-in-up var(--duration-slow) var(--ease-out) 0.2s both;
      }

      .about-hero-stats {
        display: flex;
        gap: var(--space-8);
        animation: fade-in-up var(--duration-slow) var(--ease-out) 0.3s both;
      }

      .about-hero-stat {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .about-hero-stat-value {
        font-family: var(--font-display);
        font-size: var(--text-3xl);
        font-weight: var(--font-bold);
        background: var(--gradient-text-cosmic);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .about-hero-stat-label {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wide);
      }

      /* ========================================
         Section Decorations
         ======================================== */

      .about-section-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
        overflow: hidden;
      }

      .about-section-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.15;
      }

      .about-section-glow-1 {
        width: 500px;
        height: 500px;
        background: var(--color-primary-500);
      }

      .about-section-glow-2 {
        width: 400px;
        height: 400px;
        background: var(--color-secondary-500);
      }

      .about-section-decoration-mission .about-section-glow-1 {
        top: 10%;
        right: -10%;
      }

      .about-section-decoration-mission .about-section-glow-2 {
        bottom: 20%;
        left: -15%;
      }

      .about-section-decoration-astra .about-section-glow-1 {
        top: 30%;
        left: -10%;
      }

      .about-section-decoration-astra .about-section-glow-2 {
        bottom: 10%;
        right: -10%;
      }

      .about-section-decoration-values .about-section-glow-1 {
        top: 20%;
        right: -15%;
      }

      .about-section-decoration-values .about-section-glow-2 {
        bottom: 30%;
        left: -10%;
      }

      .about-section-decoration-timeline .about-section-glow-1 {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
      }

      .about-section-decoration-timeline .about-section-glow-2 {
        display: none;
      }

      .about-section-decoration-team .about-section-glow-1 {
        top: 10%;
        left: -10%;
      }

      .about-section-decoration-team .about-section-glow-2 {
        bottom: 10%;
        right: -10%;
      }

      /* ========================================
         Mission Section
         ======================================== */

      .about-mission {
        position: relative;
        background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      }

      .about-mission-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 768px) {
        .about-mission-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .about-mission-card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: var(--space-8);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--card-radius);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .about-mission-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 3px;
        background: var(--gradient-primary);
        border-radius: var(--radius-full);
        opacity: 0;
        transition: opacity var(--duration-normal) var(--ease-out);
      }

      .about-mission-card:hover {
        background: var(--card-bg-hover);
        border-color: var(--card-border-hover);
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
      }

      .about-mission-card:hover::before {
        opacity: 1;
      }

      .about-mission-card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
        border-radius: var(--radius-2xl);
        margin-bottom: var(--space-4);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .about-mission-card-icon svg {
        width: 2rem;
        height: 2rem;
        color: var(--color-primary-400);
      }

      .about-mission-card:hover .about-mission-card-icon {
        transform: scale(1.1);
        box-shadow: var(--glow-primary-sm);
      }

      .about-mission-card-title {
        font-size: var(--text-xl);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .about-mission-card-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        line-height: var(--leading-relaxed);
        margin-bottom: 0;
      }

      /* ========================================
         Astra Section
         ======================================== */

      .about-astra {
        position: relative;
        background: var(--bg-secondary);
      }

      .about-astra-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .about-astra-content {
          grid-template-columns: 1fr 1fr;
        }
      }

      .about-astra-title {
        font-size: var(--text-4xl);
        margin-bottom: var(--space-6);
      }

      .about-astra-description {
        margin-bottom: var(--space-6);
      }

      .about-astra-description p {
        font-size: var(--text-base);
        color: var(--text-secondary);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-4);
      }

      .about-astra-description strong {
        color: var(--text-primary);
      }

      .about-astra-description em {
        color: var(--color-primary-300);
        font-style: normal;
      }

      .about-astra-features {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .about-astra-feature {
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        font-size: var(--text-sm);
        color: var(--text-secondary);
      }

      .about-astra-feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        background: rgba(16, 185, 129, 0.2);
        border-radius: var(--radius-full);
        color: var(--color-success-400);
        flex-shrink: 0;
        margin-top: 2px;
      }

      .about-astra-code {
        background: var(--code-bg);
        border: 1px solid var(--code-border);
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: var(--shadow-xl);
      }

      .about-astra-code-header {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-4);
        background: rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid var(--border-subtle);
      }

      .about-astra-code-dots {
        display: flex;
        gap: var(--space-2);
      }

      .about-astra-code-dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: var(--radius-full);
      }

      .about-astra-code-dot.red {
        background: #ff5f56;
      }

      .about-astra-code-dot.yellow {
        background: #ffbd2e;
      }

      .about-astra-code-dot.green {
        background: #27c93f;
      }

      .about-astra-code-filename {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--text-muted);
      }

      .about-astra-code-body {
        padding: var(--space-4);
        overflow-x: auto;
      }

      .about-astra-code-body pre {
        margin: 0;
        padding: 0;
        background: none;
        border: none;
      }

      .about-astra-code-body code {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        line-height: var(--leading-relaxed);
        background: none;
        padding: 0;
      }

      .about-astra-code-footer {
        padding: var(--space-3) var(--space-4);
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid var(--border-subtle);
      }

      .about-astra-code-hint {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-xs);
        color: var(--color-primary-400);
      }

      /* ========================================
         Values Section
         ======================================== */

      .about-values {
        position: relative;
        background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      }

      .about-values-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 640px) {
        .about-values-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .about-value-card {
        position: relative;
        padding: var(--space-6);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--card-radius);
        transition: all var(--duration-normal) var(--ease-out);
        overflow: hidden;
      }

      .about-value-card::before {
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

      .about-value-card:hover {
        background: var(--card-bg-hover);
        border-color: var(--card-border-hover);
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
      }

      .about-value-card:hover::before {
        transform: scaleX(1);
      }

      .about-value-card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
        border-radius: var(--radius-xl);
        margin-bottom: var(--space-4);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .about-value-card-icon svg {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-primary-400);
      }

      .about-value-card:hover .about-value-card-icon {
        transform: scale(1.1);
        box-shadow: var(--glow-primary-sm);
      }

      .about-value-card-title {
        font-size: var(--text-lg);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .about-value-card-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        line-height: var(--leading-relaxed);
        margin-bottom: 0;
      }

      /* ========================================
         Timeline Section
         ======================================== */

      .about-timeline {
        position: relative;
        background: var(--bg-primary);
      }

      .about-timeline-content {
        position: relative;
        max-width: 48rem;
        margin: 0 auto;
      }

      .about-timeline-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 1.25rem;
        width: 2px;
        height: 100%;
        background: linear-gradient(
          180deg,
          var(--color-success-500) 0%,
          var(--color-primary-500) 40%,
          var(--border-subtle) 60%,
          var(--border-subtle) 100%
        );
        border-radius: var(--radius-full);
      }

      @media (min-width: 768px) {
        .about-timeline-content::before {
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .about-timeline-item {
        position: relative;
        display: flex;
        gap: var(--space-4);
        padding-bottom: var(--space-8);
      }

      @media (min-width: 768px) {
        .about-timeline-item {
          justify-content: center;
        }

        .about-timeline-item:nth-child(odd) {
          flex-direction: row-reverse;
        }

        .about-timeline-item:nth-child(odd) .about-timeline-item-content {
          text-align: right;
        }
      }

      .about-timeline-marker {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        background: var(--bg-primary);
        border: 2px solid var(--border-subtle);
        border-radius: var(--radius-full);
        flex-shrink: 0;
        z-index: 1;
        transition: all var(--duration-normal) var(--ease-out);
      }

      .about-timeline-item--completed .about-timeline-marker {
        background: var(--color-success-500);
        border-color: var(--color-success-500);
        color: var(--color-neutral-0);
      }

      .about-timeline-item--in-progress .about-timeline-marker {
        background: var(--color-primary-500);
        border-color: var(--color-primary-500);
        color: var(--color-neutral-0);
        animation: pulse-glow 2s ease-in-out infinite;
      }

      .about-timeline-marker-dot {
        width: 0.5rem;
        height: 0.5rem;
        background: var(--text-muted);
        border-radius: var(--radius-full);
      }

      @media (min-width: 768px) {
        .about-timeline-marker {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .about-timeline-item-content {
        flex: 1;
        max-width: 20rem;
        padding-top: var(--space-1);
      }

      @media (min-width: 768px) {
        .about-timeline-item-content {
          flex: none;
          width: calc(50% - 3rem);
        }
      }

      .about-timeline-phase {
        display: inline-block;
        font-size: var(--text-xs);
        font-weight: var(--font-semibold);
        color: var(--color-primary-400);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wide);
        margin-bottom: var(--space-1);
      }

      .about-timeline-item-title {
        font-size: var(--text-lg);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .about-timeline-item-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-3);
      }

      .about-timeline-status {
        display: inline-flex;
        align-items: center;
        padding: var(--space-1) var(--space-3);
        font-size: var(--text-xs);
        font-weight: var(--font-medium);
        border-radius: var(--radius-full);
      }

      .about-timeline-status--completed {
        background: rgba(16, 185, 129, 0.15);
        color: var(--color-success-400);
      }

      .about-timeline-status--in-progress {
        background: rgba(99, 102, 241, 0.15);
        color: var(--color-primary-400);
      }

      .about-timeline-status--upcoming {
        background: rgba(148, 163, 184, 0.1);
        color: var(--text-muted);
      }

      /* ========================================
         Team Section
         ======================================== */

      .about-team {
        position: relative;
        background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      }

      .about-team-principles {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        margin-bottom: var(--space-12);
      }

      @media (min-width: 768px) {
        .about-team-principles {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .about-principle-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: var(--space-6);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--card-radius);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .about-principle-card:hover {
        background: var(--card-bg-hover);
        border-color: var(--card-border-hover);
        transform: translateY(-4px);
      }

      .about-principle-card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
        border-radius: var(--radius-xl);
        margin-bottom: var(--space-4);
      }

      .about-principle-card-icon svg {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-primary-400);
      }

      .about-principle-card-title {
        font-size: var(--text-lg);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .about-principle-card-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        line-height: var(--leading-relaxed);
        margin-bottom: 0;
      }

      .about-contribution-cta {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: var(--radius-2xl);
        padding: var(--space-8);
        text-align: center;
      }

      .about-contribution-title {
        font-size: var(--text-2xl);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-3);
      }

      .about-contribution-description {
        font-size: var(--text-base);
        color: var(--text-secondary);
        max-width: 36rem;
        margin: 0 auto var(--space-6);
        line-height: var(--leading-relaxed);
      }

      .about-contribution-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-4);
      }

      /* ========================================
         CTA Section
         ======================================== */

      .about-cta {
        position: relative;
        background: var(--bg-secondary);
        overflow: hidden;
      }

      .about-cta .container {
        position: relative;
        z-index: var(--z-raised);
      }

      .about-cta-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
      }

      .about-cta-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
        border-radius: 50%;
      }

      .about-cta-orbits {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 500px;
        height: auto;
        opacity: 0.4;
      }

      .cta-orbit-1,
      .cta-orbit-2,
      .cta-orbit-3 {
        animation: about-orbit-rotate 30s linear infinite;
        transform-origin: center;
      }

      .cta-orbit-1 {
        animation-duration: 40s;
      }

      .cta-orbit-2 {
        animation-duration: 25s;
        animation-direction: reverse;
      }

      .cta-orbit-3 {
        animation-duration: 15s;
      }

      .cta-sun {
        animation: about-sun-pulse 3s ease-in-out infinite;
      }

      .cta-sun-glow {
        animation: about-sun-pulse 3s ease-in-out infinite 0.5s;
      }

      .about-cta-content {
        text-align: center;
        max-width: 42rem;
        margin: 0 auto;
      }

      .about-cta-title {
        font-size: var(--text-5xl);
        font-weight: var(--font-bold);
        line-height: var(--leading-tight);
        margin-bottom: var(--space-6);
      }

      .about-cta-description {
        font-size: var(--text-xl);
        color: var(--text-secondary);
        margin-bottom: var(--space-8);
        line-height: var(--leading-relaxed);
      }

      .about-cta-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-4);
      }

      /* ========================================
         Reveal Animations
         ======================================== */

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

      /* ========================================
         Responsive
         ======================================== */

      @media (max-width: 640px) {
        .about-hero {
          min-height: auto;
          padding-top: calc(var(--header-height) + var(--space-12));
          padding-bottom: var(--space-12);
        }

        .about-hero-title {
          font-size: var(--text-4xl);
        }

        .about-hero-stats {
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .about-hero-stat {
          flex: 1 1 40%;
        }

        .about-hero-orbital {
          display: none;
        }

        .about-astra-title br {
          display: none;
        }

        .about-cta-title {
          font-size: var(--text-3xl);
        }

        .about-cta-title br {
          display: none;
        }

        .about-cta-actions {
          flex-direction: column;
        }

        .about-cta-actions .btn {
          width: 100%;
          justify-content: center;
        }

        .about-contribution-actions {
          flex-direction: column;
        }

        .about-contribution-actions .btn {
          width: 100%;
          justify-content: center;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .reveal-section,
        .reveal-item {
          opacity: 1;
          transform: none;
        }

        .about-orbit-1,
        .about-orbit-2,
        .about-orbit-3,
        .about-sun,
        .cta-orbit-1,
        .cta-orbit-2,
        .cta-orbit-3,
        .cta-sun,
        .cta-sun-glow,
        .about-timeline-item--in-progress .about-timeline-marker {
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

export { AboutPage };
export type { MissionPoint, TimelineItem, Value, TeamPrinciple };