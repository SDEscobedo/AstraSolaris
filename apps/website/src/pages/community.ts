interface CommunityChannel {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  gradient: string;
  external: boolean;
}

interface ContributionTrack {
  id: string;
  title: string;
  audience: string;
  description: string;
  skills: string[];
  activities: string[];
  entryPoint: string;
  icon: string;
  gradient: string;
}

interface CommunityValue {
  title: string;
  description: string;
  icon: string;
}

interface ResourceLink {
  title: string;
  description: string;
  href: string;
  icon: string;
  external: boolean;
}

class CommunityPage {
  private readonly element: HTMLElement;
  private readonly observer: IntersectionObserver | null = null;
  private revealedSections: Set<HTMLElement> = new Set();

  private readonly channels: CommunityChannel[] = [
    {
      id: 'github',
      title: 'GitHub',
      description:
        'Star the repo, report issues, submit pull requests, and collaborate on code. Our entire codebase is open and welcoming contributions.',
      href: 'https://github.com/astra-solaris/astra-solaris',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #333333 0%, #24292e 100%)',
      external: true,
    },
    {
      id: 'discussions',
      title: 'Discussions',
      description:
        'Ask questions, share ideas, and engage with fellow community members. Perfect for proposals, Q&A, and general conversation.',
      href: 'https://github.com/astra-solaris/astra-solaris/discussions',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 9h8M8 13h6"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      external: true,
    },
    {
      id: 'discord',
      title: 'Discord',
      description:
        'Join our Discord server for real-time chat, community events, and direct interaction with core contributors.',
      href: 'https://discord.gg/astrasolaris',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #5865F2 0%, #7289da 100%)',
      external: true,
    },
    {
      id: 'twitter',
      title: 'Twitter / X',
      description:
        'Follow us for project updates, astronomical events, and community highlights. Share your creations with #AstraSolaris.',
      href: 'https://twitter.com/astrasolaris',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)',
      external: true,
    },
  ];

  private readonly contributionTracks: ContributionTrack[] = [
    {
      id: 'language-design',
      title: 'Language Design',
      audience: 'Scientists, Educators, Astronomers',
      description:
        'Help shape the Astra language to be both scientifically accurate and accessible to newcomers. Your domain expertise is invaluable.',
      skills: ['Domain knowledge in astronomy', 'No coding required', 'Clear communication'],
      activities: [
        'Review and validate specification accuracy',
        'Propose new object types and commands',
        'Write example scripts demonstrating use cases',
        'Verify scientific accuracy of outputs',
      ],
      entryPoint: 'spec/proposals/README.md',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
    {
      id: 'runtime-development',
      title: 'Runtime Development',
      audience: 'Software Developers',
      description:
        'Build the core runtime that brings Astra scripts to life. From lexer to interpreter, your code makes the magic happen.',
      skills: ['TypeScript proficiency', 'Parsing theory basics', 'Testing practices'],
      activities: [
        'Implement Astra commands per specification',
        'Write tests verifying spec compliance',
        'Improve error messages and diagnostics',
        'Performance optimization',
      ],
      entryPoint: 'packages/core/README.md',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    },
    {
      id: 'engine-graphics',
      title: 'Engine & Graphics',
      audience: '3D Graphics Developers',
      description:
        'Create stunning visualizations with Three.js. Optimize rendering, implement celestial mechanics, and push browser capabilities.',
      skills: ['Three.js / WebGL', 'Computer graphics', 'Performance optimization'],
      activities: [
        'Improve 3D object rendering',
        'Implement orbital mechanics visualization',
        'Optimize for various device capabilities',
        'Add new visual effects and features',
      ],
      entryPoint: 'packages/engine/README.md',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      audience: 'Artists, Educators, Writers',
      description:
        'Create textures, 3D models, educational scripts, and documentation. Make AstraSolaris beautiful and accessible.',
      skills: ['Varies by content type', 'Creativity', 'Attention to detail'],
      activities: [
        'Create and improve planet textures',
        'Develop 3D models for asteroids and spacecraft',
        'Write educational Astra scripts',
        'Create tutorials and documentation',
      ],
      entryPoint: 'assets/README.md',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>`,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    },
  ];

  private readonly communityValues: CommunityValue[] = [
    {
      title: 'Open & Transparent',
      description:
        'Every decision, every line of code, every roadmap update is public. We build in the open because science thrives on transparency.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>`,
    },
    {
      title: 'Inclusive & Welcoming',
      description:
        'Everyone who looks up at the stars belongs here. We actively work to make AstraSolaris accessible to people of all backgrounds.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>`,
    },
    {
      title: 'Scientifically Rigorous',
      description:
        'We care deeply about accuracy. Our community includes professional astronomers who help ensure everything we build reflects real science.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>`,
    },
    {
      title: 'Beginner Friendly',
      description:
        'Everyone was a beginner once. We provide mentorship, clear documentation, and patient support for newcomers learning the ropes.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>`,
    },
  ];

  private readonly resources: ResourceLink[] = [
    {
      title: 'Contributing Guide',
      description: 'Everything you need to know to start contributing to AstraSolaris.',
      href: '/docs/contributing/',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>`,
      external: false,
    },
    {
      title: 'Code of Conduct',
      description: 'Our commitment to a respectful and inclusive community.',
      href: 'https://github.com/astra-solaris/astra-solaris/blob/main/CODE_OF_CONDUCT.md',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>`,
      external: true,
    },
    {
      title: 'Good First Issues',
      description: 'Curated issues perfect for first-time contributors.',
      href: 'https://github.com/astra-solaris/astra-solaris/labels/good%20first%20issue',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>`,
      external: true,
    },
    {
      title: 'Roadmap',
      description: 'See what we are building and where we are headed.',
      href: 'https://github.com/astra-solaris/astra-solaris/projects',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
        <circle cx="6" cy="12" r="2" fill="currentColor"/>
        <circle cx="12" cy="6" r="2" fill="currentColor"/>
        <circle cx="18" cy="18" r="2" fill="currentColor"/>
      </svg>`,
      external: true,
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
    container.className = 'community-page';

    container.appendChild(this.createHeroSection());
    container.appendChild(this.createChannelsSection());
    container.appendChild(this.createTracksSection());
    container.appendChild(this.createValuesSection());
    container.appendChild(this.createResourcesSection());
    container.appendChild(this.createCtaSection());

    this.injectStyles();

    return container;
  }

  private createHeroSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'community-hero';
    section.setAttribute('aria-labelledby', 'community-hero-title');

    const container = document.createElement('div');
    container.className = 'container';

    const content = document.createElement('div');
    content.className = 'community-hero-content';

    const badge = document.createElement('div');
    badge.className = 'community-hero-badge';
    badge.innerHTML = `
      <span class="community-hero-badge-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </span>
      <span>Join Our Community</span>
    `;

    const title = document.createElement('h1');
    title.id = 'community-hero-title';
    title.className = 'community-hero-title';
    title.innerHTML = `Together, we explore<br><span class="text-gradient">the infinite</span>`;

    const description = document.createElement('p');
    description.className = 'community-hero-description';
    description.textContent =
      'AstraSolaris is built by a global community of scientists, developers, educators, and space enthusiasts. Whether you contribute code, content, or ideas—there\'s a place for you among the stars.';

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
    decoration.className = 'community-hero-decoration';
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="community-hero-glow community-hero-glow-1"></div>
      <div class="community-hero-glow community-hero-glow-2"></div>
      <div class="community-hero-constellation">
        <svg viewBox="0 0 400 400" class="constellation-svg">
          <defs>
            <radialGradient id="community-star-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="var(--color-primary-400)" stop-opacity="1"/>
              <stop offset="100%" stop-color="var(--color-primary-400)" stop-opacity="0"/>
            </radialGradient>
          </defs>
          
          <!-- Connection lines -->
          <line x1="100" y1="80" x2="180" y2="150" stroke="var(--color-primary-500)" stroke-width="1" opacity="0.3" class="constellation-line"/>
          <line x1="180" y1="150" x2="250" y2="100" stroke="var(--color-primary-500)" stroke-width="1" opacity="0.3" class="constellation-line"/>
          <line x1="180" y1="150" x2="200" y2="250" stroke="var(--color-primary-500)" stroke-width="1" opacity="0.3" class="constellation-line"/>
          <line x1="200" y1="250" x2="300" y2="220" stroke="var(--color-primary-500)" stroke-width="1" opacity="0.3" class="constellation-line"/>
          <line x1="200" y1="250" x2="120" y2="300" stroke="var(--color-primary-500)" stroke-width="1" opacity="0.3" class="constellation-line"/>
          <line x1="300" y1="220" x2="350" y2="280" stroke="var(--color-primary-500)" stroke-width="1" opacity="0.3" class="constellation-line"/>
          
          <!-- Star nodes -->
          <circle cx="100" cy="80" r="6" fill="url(#community-star-glow)" class="constellation-star"/>
          <circle cx="100" cy="80" r="3" fill="var(--color-primary-300)" class="constellation-star-core"/>
          
          <circle cx="180" cy="150" r="8" fill="url(#community-star-glow)" class="constellation-star"/>
          <circle cx="180" cy="150" r="4" fill="var(--color-primary-300)" class="constellation-star-core"/>
          
          <circle cx="250" cy="100" r="5" fill="url(#community-star-glow)" class="constellation-star"/>
          <circle cx="250" cy="100" r="2.5" fill="var(--color-primary-300)" class="constellation-star-core"/>
          
          <circle cx="200" cy="250" r="10" fill="url(#community-star-glow)" class="constellation-star"/>
          <circle cx="200" cy="250" r="5" fill="var(--color-accent-400)" class="constellation-star-core"/>
          
          <circle cx="300" cy="220" r="6" fill="url(#community-star-glow)" class="constellation-star"/>
          <circle cx="300" cy="220" r="3" fill="var(--color-primary-300)" class="constellation-star-core"/>
          
          <circle cx="120" cy="300" r="5" fill="url(#community-star-glow)" class="constellation-star"/>
          <circle cx="120" cy="300" r="2.5" fill="var(--color-primary-300)" class="constellation-star-core"/>
          
          <circle cx="350" cy="280" r="7" fill="url(#community-star-glow)" class="constellation-star"/>
          <circle cx="350" cy="280" r="3.5" fill="var(--color-secondary-400)" class="constellation-star-core"/>
        </svg>
      </div>
    `;

    return decoration;
  }

  private createHeroStats(): HTMLElement {
    const stats = document.createElement('div');
    stats.className = 'community-hero-stats';

    const statsData = [
      { value: 'MIT', label: 'Open Source' },
      { value: '100%', label: 'Community Driven' },
      { value: '∞', label: 'Possibilities' },
    ];

    statsData.forEach((stat) => {
      const item = document.createElement('div');
      item.className = 'community-hero-stat';

      const value = document.createElement('span');
      value.className = 'community-hero-stat-value';
      value.textContent = stat.value;

      const label = document.createElement('span');
      label.className = 'community-hero-stat-label';
      label.textContent = stat.label;

      item.appendChild(value);
      item.appendChild(label);
      stats.appendChild(item);
    });

    return stats;
  }

  private createChannelsSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'community-channels section reveal-section';
    section.setAttribute('aria-labelledby', 'channels-title');

    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('div');
    header.className = 'section-header';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </span>
      <span>Connect With Us</span>
    `;

    const title = document.createElement('h2');
    title.id = 'channels-title';
    title.className = 'section-title';
    title.innerHTML = `Find your <span class="text-gradient">home base</span>`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      'Join the conversation wherever you\'re most comfortable. Our community spans multiple platforms, each with its own strengths.';

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const grid = document.createElement('div');
    grid.className = 'channels-grid';

    this.channels.forEach((channel, index) => {
      const card = this.createChannelCard(channel, index);
      grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);
    section.appendChild(this.createSectionDecoration('channels'));
    section.appendChild(container);

    return section;
  }

  private createChannelCard(channel: CommunityChannel, index: number): HTMLElement {
    const card = document.createElement('a');
    card.className = 'channel-card reveal-item';
    card.href = channel.href;
    card.style.setProperty('--card-index', String(index));
    card.style.setProperty('--card-gradient', channel.gradient);

    if (channel.external) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'channel-card-icon';
    iconWrapper.innerHTML = channel.icon;

    const content = document.createElement('div');
    content.className = 'channel-card-content';

    const title = document.createElement('h3');
    title.className = 'channel-card-title';
    title.textContent = channel.title;

    if (channel.external) {
      title.innerHTML += `
        <svg class="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      `;
    }

    const description = document.createElement('p');
    description.className = 'channel-card-description';
    description.textContent = channel.description;

    const action = document.createElement('span');
    action.className = 'channel-card-action';
    action.innerHTML = `
      <span>Join now</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(action);

    card.appendChild(iconWrapper);
    card.appendChild(content);

    return card;
  }

  private createTracksSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'community-tracks section reveal-section';
    section.setAttribute('aria-labelledby', 'tracks-title');

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
      <span>Contribution Tracks</span>
    `;

    const title = document.createElement('h2');
    title.id = 'tracks-title';
    title.className = 'section-title';
    title.innerHTML = `Multiple paths to <span class="text-gradient">contribute</span>`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      'AstraSolaris welcomes contributions from everyone. Choose the track that matches your skills and interests—or explore multiple!';

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const grid = document.createElement('div');
    grid.className = 'tracks-grid';

    this.contributionTracks.forEach((track, index) => {
      const card = this.createTrackCard(track, index);
      grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);
    section.appendChild(this.createSectionDecoration('tracks'));
    section.appendChild(container);

    return section;
  }

  private createTrackCard(track: ContributionTrack, index: number): HTMLElement {
    const card = document.createElement('article');
    card.className = 'track-card reveal-item';
    card.style.setProperty('--card-index', String(index));
    card.style.setProperty('--card-gradient', track.gradient);

    const header = document.createElement('div');
    header.className = 'track-card-header';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'track-card-icon';
    iconWrapper.innerHTML = track.icon;

    const titleGroup = document.createElement('div');
    titleGroup.className = 'track-card-title-group';

    const title = document.createElement('h3');
    title.className = 'track-card-title';
    title.textContent = track.title;

    const audience = document.createElement('span');
    audience.className = 'track-card-audience';
    audience.textContent = track.audience;

    titleGroup.appendChild(title);
    titleGroup.appendChild(audience);

    header.appendChild(iconWrapper);
    header.appendChild(titleGroup);

    const description = document.createElement('p');
    description.className = 'track-card-description';
    description.textContent = track.description;

    const skillsSection = document.createElement('div');
    skillsSection.className = 'track-card-skills';

    const skillsTitle = document.createElement('span');
    skillsTitle.className = 'track-card-section-title';
    skillsTitle.textContent = 'Skills';

    const skillsList = document.createElement('ul');
    skillsList.className = 'track-card-skills-list';
    track.skills.forEach((skill) => {
      const item = document.createElement('li');
      item.textContent = skill;
      skillsList.appendChild(item);
    });

    skillsSection.appendChild(skillsTitle);
    skillsSection.appendChild(skillsList);

    const activitiesSection = document.createElement('div');
    activitiesSection.className = 'track-card-activities';

    const activitiesTitle = document.createElement('span');
    activitiesTitle.className = 'track-card-section-title';
    activitiesTitle.textContent = 'What you\'ll do';

    const activitiesList = document.createElement('ul');
    activitiesList.className = 'track-card-activities-list';
    track.activities.slice(0, 3).forEach((activity) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>${activity}</span>
      `;
      activitiesList.appendChild(item);
    });

    activitiesSection.appendChild(activitiesTitle);
    activitiesSection.appendChild(activitiesList);

    const footer = document.createElement('div');
    footer.className = 'track-card-footer';

    const entryPoint = document.createElement('a');
    entryPoint.className = 'track-card-link';
    entryPoint.href = `https://github.com/astra-solaris/astra-solaris/blob/main/${track.entryPoint}`;
    entryPoint.target = '_blank';
    entryPoint.rel = 'noopener noreferrer';
    entryPoint.innerHTML = `
      <span>Get started</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    footer.appendChild(entryPoint);

    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(skillsSection);
    card.appendChild(activitiesSection);
    card.appendChild(footer);

    return card;
  }

  private createValuesSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'community-values section reveal-section';
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
    title.innerHTML = `What we <span class="text-gradient">stand for</span>`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      'These principles guide everything we do—from code reviews to community discussions to how we welcome newcomers.';

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const grid = document.createElement('div');
    grid.className = 'values-grid';

    this.communityValues.forEach((value, index) => {
      const card = this.createValueCard(value, index);
      grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);
    section.appendChild(this.createSectionDecoration('values'));
    section.appendChild(container);

    return section;
  }

  private createValueCard(value: CommunityValue, index: number): HTMLElement {
    const card = document.createElement('div');
    card.className = 'value-card reveal-item';
    card.style.setProperty('--card-index', String(index));

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'value-card-icon';
    iconWrapper.innerHTML = value.icon;

    const title = document.createElement('h3');
    title.className = 'value-card-title';
    title.textContent = value.title;

    const description = document.createElement('p');
    description.className = 'value-card-description';
    description.textContent = value.description;

    card.appendChild(iconWrapper);
    card.appendChild(title);
    card.appendChild(description);

    return card;
  }

  private createResourcesSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'community-resources section reveal-section';
    section.setAttribute('aria-labelledby', 'resources-title');

    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('div');
    header.className = 'section-header';

    const badge = document.createElement('div');
    badge.className = 'section-badge';
    badge.innerHTML = `
      <span class="section-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      </span>
      <span>Resources</span>
    `;

    const title = document.createElement('h2');
    title.id = 'resources-title';
    title.className = 'section-title';
    title.innerHTML = `Everything you need to <span class="text-gradient">get started</span>`;

    const description = document.createElement('p');
    description.className = 'section-description';
    description.textContent =
      'From contribution guides to good first issues, we have resources to help you make your first (or hundredth) contribution.';

    header.appendChild(badge);
    header.appendChild(title);
    header.appendChild(description);

    const grid = document.createElement('div');
    grid.className = 'resources-grid';

    this.resources.forEach((resource, index) => {
      const card = this.createResourceCard(resource, index);
      grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);
    section.appendChild(this.createSectionDecoration('resources'));
    section.appendChild(container);

    return section;
  }

  private createResourceCard(resource: ResourceLink, index: number): HTMLElement {
    const card = document.createElement('a');
    card.className = 'resource-card reveal-item';
    card.href = resource.href;
    card.style.setProperty('--card-index', String(index));

    if (resource.external) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'resource-card-icon';
    iconWrapper.innerHTML = resource.icon;

    const content = document.createElement('div');
    content.className = 'resource-card-content';

    const title = document.createElement('h3');
    title.className = 'resource-card-title';
    title.textContent = resource.title;

    if (resource.external) {
      title.innerHTML += `
        <svg class="external-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      `;
    }

    const description = document.createElement('p');
    description.className = 'resource-card-description';
    description.textContent = resource.description;

    content.appendChild(title);
    content.appendChild(description);

    const arrow = document.createElement('div');
    arrow.className = 'resource-card-arrow';
    arrow.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    card.appendChild(iconWrapper);
    card.appendChild(content);
    card.appendChild(arrow);

    return card;
  }

  private createCtaSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'community-cta section reveal-section';
    section.setAttribute('aria-labelledby', 'community-cta-title');

    const container = document.createElement('div');
    container.className = 'container';

    const content = document.createElement('div');
    content.className = 'community-cta-content';

    const title = document.createElement('h2');
    title.id = 'community-cta-title';
    title.className = 'community-cta-title';
    title.innerHTML = `Ready to join the<br><span class="text-gradient">cosmic community?</span>`;

    const description = document.createElement('p');
    description.className = 'community-cta-description';
    description.textContent =
      'Whether you\'re a seasoned developer or just discovering your love for astronomy, there\'s a place for you here. Let\'s explore the universe together.';

    const actions = document.createElement('div');
    actions.className = 'community-cta-actions';

    const primaryBtn = document.createElement('a');
    primaryBtn.href = 'https://github.com/astra-solaris/astra-solaris';
    primaryBtn.target = '_blank';
    primaryBtn.rel = 'noopener noreferrer';
    primaryBtn.className = 'btn btn-primary btn-xl';
    primaryBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      <span>Star on GitHub</span>
    `;

    const secondaryBtn = document.createElement('a');
    secondaryBtn.href = 'https://discord.gg/astrasolaris';
    secondaryBtn.target = '_blank';
    secondaryBtn.rel = 'noopener noreferrer';
    secondaryBtn.className = 'btn btn-secondary btn-xl';
    secondaryBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
      <span>Join Discord</span>
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
    decoration.className = 'community-cta-decoration';
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="community-cta-glow"></div>
      <svg viewBox="0 0 400 400" class="community-cta-orbits">
        <defs>
          <linearGradient id="cta-community-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--color-primary-500)" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="var(--color-secondary-500)" stop-opacity="0.2"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="200" rx="180" ry="80" fill="none" stroke="url(#cta-community-gradient)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit-1"/>
        <ellipse cx="200" cy="200" rx="140" ry="60" fill="none" stroke="url(#cta-community-gradient)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit-2"/>
        <ellipse cx="200" cy="200" rx="100" ry="40" fill="none" stroke="url(#cta-community-gradient)" stroke-width="1" transform="rotate(-20 200 200)" class="cta-orbit-3"/>
        <circle cx="200" cy="200" r="15" fill="var(--color-accent-400)" class="cta-sun"/>
        <circle cx="200" cy="200" r="25" fill="var(--color-accent-400)" opacity="0.3" class="cta-sun-glow"/>
      </svg>
    `;

    return decoration;
  }

  private createSectionDecoration(sectionId: string): HTMLElement {
    const decoration = document.createElement('div');
    decoration.className = `community-section-decoration community-section-decoration-${sectionId}`;
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="community-section-glow community-section-glow-1"></div>
      <div class="community-section-glow community-section-glow-2"></div>
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
    const styleId = 'community-page-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .community-page {
        position: relative;
      }

      /* ========================================
         Community Hero Section
         ======================================== */

      .community-hero {
        position: relative;
        min-height: 80vh;
        display: flex;
        align-items: center;
        padding-top: calc(var(--header-height) + var(--space-16));
        padding-bottom: var(--space-20);
        overflow: hidden;
      }

      .community-hero-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
      }

      .community-hero-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.3;
      }

      .community-hero-glow-1 {
        width: 600px;
        height: 600px;
        top: 10%;
        left: -10%;
        background: var(--color-primary-500);
      }

      .community-hero-glow-2 {
        width: 500px;
        height: 500px;
        bottom: 10%;
        right: -10%;
        background: var(--color-secondary-500);
      }

      .community-hero-constellation {
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
        width: 400px;
        height: 400px;
        opacity: 0.5;
      }

      .constellation-svg {
        width: 100%;
        height: 100%;
      }

      .constellation-star {
        animation: constellation-twinkle 3s ease-in-out infinite;
      }

      .constellation-star:nth-child(odd) {
        animation-delay: 0.5s;
      }

      .constellation-star:nth-child(even) {
        animation-delay: 1s;
      }

      .constellation-line {
        animation: constellation-pulse 4s ease-in-out infinite;
      }

      @keyframes constellation-twinkle {
        0%, 100% {
          opacity: 0.6;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
      }

      @keyframes constellation-pulse {
        0%, 100% {
          opacity: 0.2;
        }
        50% {
          opacity: 0.5;
        }
      }

      .community-hero-content {
        position: relative;
        z-index: var(--z-raised);
        max-width: 48rem;
      }

      .community-hero-badge {
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

      .community-hero-badge-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .community-hero-title {
        font-size: var(--text-6xl);
        font-weight: var(--font-bold);
        line-height: var(--leading-tight);
        margin-bottom: var(--space-6);
        animation: fade-in-up var(--duration-slow) var(--ease-out) 0.1s both;
      }

      .community-hero-description {
        font-size: var(--text-xl);
        color: var(--text-secondary);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-8);
        animation: fade-in-up var(--duration-slow) var(--ease-out) 0.2s both;
      }

      .community-hero-stats {
        display: flex;
        gap: var(--space-8);
        animation: fade-in-up var(--duration-slow) var(--ease-out) 0.3s both;
      }

      .community-hero-stat {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .community-hero-stat-value {
        font-family: var(--font-display);
        font-size: var(--text-3xl);
        font-weight: var(--font-bold);
        background: var(--gradient-text-cosmic);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .community-hero-stat-label {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wide);
      }

      /* ========================================
         Section Decorations
         ======================================== */

      .community-section-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
        overflow: hidden;
      }

      .community-section-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.15;
      }

      .community-section-glow-1 {
        width: 500px;
        height: 500px;
        background: var(--color-primary-500);
      }

      .community-section-glow-2 {
        width: 400px;
        height: 400px;
        background: var(--color-secondary-500);
      }

      .community-section-decoration-channels .community-section-glow-1 {
        top: 20%;
        right: -10%;
      }

      .community-section-decoration-channels .community-section-glow-2 {
        bottom: 10%;
        left: -15%;
      }

      .community-section-decoration-tracks .community-section-glow-1 {
        top: 30%;
        left: -10%;
      }

      .community-section-decoration-tracks .community-section-glow-2 {
        bottom: 20%;
        right: -10%;
      }

      .community-section-decoration-values .community-section-glow-1 {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
      }

      .community-section-decoration-values .community-section-glow-2 {
        display: none;
      }

      .community-section-decoration-resources .community-section-glow-1 {
        top: 10%;
        left: -10%;
      }

      .community-section-decoration-resources .community-section-glow-2 {
        bottom: 10%;
        right: -10%;
      }

      /* ========================================
         Channels Section
         ======================================== */

      .community-channels {
        position: relative;
        background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      }

      .channels-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 640px) {
        .channels-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .channel-card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        padding: var(--space-6);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--card-radius);
        text-decoration: none;
        transition: all var(--duration-normal) var(--ease-out);
        overflow: hidden;
      }

      .channel-card::before {
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

      .channel-card:hover {
        background: var(--card-bg-hover);
        border-color: var(--card-border-hover);
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
      }

      .channel-card:hover::before {
        transform: scaleX(1);
      }

      .channel-card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
        border-radius: var(--radius-xl);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .channel-card-icon svg {
        width: 1.75rem;
        height: 1.75rem;
        color: var(--color-primary-400);
      }

      .channel-card:hover .channel-card-icon {
        transform: scale(1.1);
        box-shadow: var(--glow-primary-sm);
      }

      .channel-card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .channel-card-title {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-xl);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .channel-card-title .external-icon {
        opacity: 0.5;
      }

      .channel-card-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-4);
        flex: 1;
      }

      .channel-card-action {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        color: var(--color-primary-400);
        opacity: 0;
        transform: translateX(-8px);
        transition: all var(--duration-normal) var(--ease-out);
      }

      .channel-card:hover .channel-card-action {
        opacity: 1;
        transform: translateX(0);
      }

      .channel-card-action svg {
        transition: transform var(--duration-fast) var(--ease-out);
      }

      .channel-card:hover .channel-card-action svg {
        transform: translateX(4px);
      }

      /* ========================================
         Tracks Section
         ======================================== */

      .community-tracks {
        position: relative;
        background: var(--bg-secondary);
      }

      .tracks-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 768px) {
        .tracks-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .track-card {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: var(--space-6);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--card-radius);
        transition: all var(--duration-normal) var(--ease-out);
        overflow: hidden;
      }

      .track-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--card-gradient);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--duration-normal) var(--ease-out);
      }

      .track-card:hover {
        background: var(--card-bg-hover);
        border-color: var(--card-border-hover);
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
      }

      .track-card:hover::before {
        transform: scaleX(1);
      }

      .track-card-header {
        display: flex;
        align-items: flex-start;
        gap: var(--space-4);
        margin-bottom: var(--space-4);
      }

      .track-card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
        border-radius: var(--radius-xl);
        flex-shrink: 0;
        transition: all var(--duration-normal) var(--ease-out);
      }

      .track-card-icon svg {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-primary-400);
      }

      .track-card:hover .track-card-icon {
        transform: scale(1.1);
        box-shadow: var(--glow-primary-sm);
      }

      .track-card-title-group {
        flex: 1;
      }

      .track-card-title {
        font-size: var(--text-lg);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-1);
      }

      .track-card-audience {
        font-size: var(--text-xs);
        color: var(--color-primary-400);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wide);
      }

      .track-card-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        line-height: var(--leading-relaxed);
        margin-bottom: var(--space-4);
      }

      .track-card-section-title {
        display: block;
        font-size: var(--text-xs);
        font-weight: var(--font-semibold);
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: var(--tracking-wide);
        margin-bottom: var(--space-2);
      }

      .track-card-skills {
        margin-bottom: var(--space-4);
      }

      .track-card-skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        list-style: none;
      }

      .track-card-skills-list li {
        padding: var(--space-1) var(--space-2);
        background: rgba(99, 102, 241, 0.1);
        border-radius: var(--radius-md);
        font-size: var(--text-xs);
        color: var(--text-secondary);
      }

      .track-card-activities {
        margin-bottom: var(--space-6);
        flex: 1;
      }

      .track-card-activities-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        list-style: none;
      }

      .track-card-activities-list li {
        display: flex;
        align-items: flex-start;
        gap: var(--space-2);
        font-size: var(--text-sm);
        color: var(--text-tertiary);
      }

      .track-card-activities-list li svg {
        flex-shrink: 0;
        margin-top: 3px;
        color: var(--color-success-400);
      }

      .track-card-footer {
        margin-top: auto;
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-subtle);
      }

      .track-card-link {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        color: var(--color-primary-400);
        text-decoration: none;
        transition: all var(--duration-fast) var(--ease-out);
      }

      .track-card-link:hover {
        color: var(--color-primary-300);
      }

      .track-card-link svg {
        transition: transform var(--duration-fast) var(--ease-out);
      }

      .track-card-link:hover svg {
        transform: translateX(4px);
      }

      /* ========================================
         Values Section
         ======================================== */

      .community-values {
        position: relative;
        background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      }

      .values-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 640px) {
        .values-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .value-card {
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

      .value-card:hover {
        background: var(--card-bg-hover);
        border-color: var(--card-border-hover);
        transform: translateY(-4px);
      }

      .value-card-icon {
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

      .value-card-icon svg {
        width: 2rem;
        height: 2rem;
        color: var(--color-primary-400);
      }

      .value-card:hover .value-card-icon {
        transform: scale(1.1);
        box-shadow: var(--glow-primary-sm);
      }

      .value-card-title {
        font-size: var(--text-xl);
        font-weight: var(--font-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .value-card-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        line-height: var(--leading-relaxed);
        margin-bottom: 0;
      }

      /* ========================================
         Resources Section
         ======================================== */

      .community-resources {
        position: relative;
        background: var(--bg-primary);
      }

      .resources-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .resources-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .resource-card {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-4) var(--space-5);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--radius-xl);
        text-decoration: none;
        transition: all var(--duration-normal) var(--ease-out);
      }

      .resource-card:hover {
        background: var(--card-bg-hover);
        border-color: var(--card-border-hover);
        transform: translateX(4px);
      }

      .resource-card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        background: rgba(99, 102, 241, 0.15);
        border-radius: var(--radius-lg);
        flex-shrink: 0;
      }

      .resource-card-icon svg {
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-primary-400);
      }

      .resource-card-content {
        flex: 1;
        min-width: 0;
      }

      .resource-card-title {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        font-size: var(--text-base);
        font-weight: var(--font-medium);
        color: var(--text-primary);
        margin-bottom: var(--space-0-5);
      }

      .resource-card-title .external-icon {
        opacity: 0.5;
      }

      .resource-card-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        margin-bottom: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .resource-card-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        opacity: 0;
        transform: translateX(-8px);
        transition: all var(--duration-fast) var(--ease-out);
      }

      .resource-card:hover .resource-card-arrow {
        opacity: 1;
        transform: translateX(0);
        color: var(--color-primary-400);
      }

      /* ========================================
         CTA Section
         ======================================== */

      .community-cta {
        position: relative;
        background: var(--bg-secondary);
        overflow: hidden;
      }

      .community-cta .container {
        position: relative;
        z-index: var(--z-raised);
      }

      .community-cta-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
      }

      .community-cta-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
        border-radius: 50%;
      }

      .community-cta-orbits {
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
        animation: community-orbit-rotate 30s linear infinite;
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
        animation: community-sun-pulse 3s ease-in-out infinite;
      }

      .cta-sun-glow {
        animation: community-sun-pulse 3s ease-in-out infinite 0.5s;
      }

      @keyframes community-orbit-rotate {
        from {
          transform: rotate(-20deg);
        }
        to {
          transform: rotate(340deg);
        }
      }

      @keyframes community-sun-pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }

      .community-cta-content {
        text-align: center;
        max-width: 42rem;
        margin: 0 auto;
      }

      .community-cta-title {
        font-size: var(--text-5xl);
        font-weight: var(--font-bold);
        line-height: var(--leading-tight);
        margin-bottom: var(--space-6);
      }

      .community-cta-description {
        font-size: var(--text-xl);
        color: var(--text-secondary);
        margin-bottom: var(--space-8);
        line-height: var(--leading-relaxed);
      }

      .community-cta-actions {
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
        .community-hero {
          min-height: auto;
          padding-top: calc(var(--header-height) + var(--space-12));
          padding-bottom: var(--space-12);
        }

        .community-hero-title {
          font-size: var(--text-4xl);
        }

        .community-hero-stats {
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .community-hero-stat {
          flex: 1 1 40%;
        }

        .community-hero-constellation {
          display: none;
        }

        .community-cta-title {
          font-size: var(--text-3xl);
        }

        .community-cta-title br {
          display: none;
        }

        .community-cta-actions {
          flex-direction: column;
        }

        .community-cta-actions .btn {
          width: 100%;
          justify-content: center;
        }

        .channel-card-action {
          opacity: 1;
          transform: translateX(0);
        }

        .resource-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .reveal-section,
        .reveal-item {
          opacity: 1;
          transform: none;
        }

        .constellation-star,
        .constellation-line,
        .cta-orbit-1,
        .cta-orbit-2,
        .cta-orbit-3,
        .cta-sun,
        .cta-sun-glow {
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

export { CommunityPage };
export type { CommunityChannel, ContributionTrack, CommunityValue, ResourceLink };