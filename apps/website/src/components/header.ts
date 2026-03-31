type PageName = 'home' | 'about' | 'community';

interface HeaderOptions {
  onNavigate: (page: PageName) => void;
  currentPage: PageName;
}

interface NavItem {
  label: string;
  page?: PageName;
  href?: string;
  external?: boolean;
}

class Header {
  private readonly element: HTMLElement;
  private readonly onNavigate: (page: PageName) => void;
  private currentPage: PageName;
  private navLinks: Map<PageName, HTMLAnchorElement> = new Map();
  private mobileMenuOpen = false;
  private mobileMenu: HTMLElement | null = null;
  private mobileOverlay: HTMLElement | null = null;
  private scrolled = false;

  private readonly navItems: NavItem[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Community', page: 'community' },
    { label: 'Docs', href: '/docs/', external: false },
    { label: 'Playground', href: '/playground/', external: false },
  ];

  constructor(options: HeaderOptions) {
    this.onNavigate = options.onNavigate;
    this.currentPage = options.currentPage;
    this.element = this.createElement();
    this.setupScrollListener();
  }

  render(): HTMLElement {
    return this.element;
  }

  setActivePage(page: PageName): void {
    this.currentPage = page;
    this.updateActiveStates();
  }

  private createElement(): HTMLElement {
    const header = document.createElement('header');
    header.className = 'header';
    header.setAttribute('role', 'banner');

    const inner = document.createElement('div');
    inner.className = 'header-inner';

    inner.appendChild(this.createLogo());
    inner.appendChild(this.createNavigation());
    inner.appendChild(this.createActions());

    header.appendChild(inner);

    this.createMobileMenu();

    return header;
  }

  private createLogo(): HTMLAnchorElement {
    const logo = document.createElement('a');
    logo.className = 'header-logo';
    logo.href = '#';
    logo.setAttribute('aria-label', 'AstraSolaris Home');
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      this.onNavigate('home');
    });

    logo.innerHTML = `
      <svg class="header-logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="50" cy="50" r="45" stroke="url(#header-orbit-gradient)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <ellipse cx="50" cy="50" rx="35" ry="20" stroke="url(#header-orbit-gradient)" stroke-width="1" fill="none" transform="rotate(-20 50 50)" opacity="0.4"/>
        <circle cx="50" cy="50" r="12" fill="url(#header-sun-gradient)"/>
        <circle cx="50" cy="50" r="16" fill="url(#header-glow-gradient)" opacity="0.5"/>
        <circle cx="78" cy="38" r="5" fill="url(#header-planet-gradient)"/>
        <defs>
          <linearGradient id="header-orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1"/>
            <stop offset="100%" stop-color="#8b5cf6"/>
          </linearGradient>
          <radialGradient id="header-sun-gradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stop-color="#fbbf24"/>
            <stop offset="70%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d97706"/>
          </radialGradient>
          <radialGradient id="header-glow-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="header-planet-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#60a5fa"/>
            <stop offset="100%" stop-color="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
      <span>AstraSolaris</span>
    `;

    return logo;
  }

  private createNavigation(): HTMLElement {
    const nav = document.createElement('nav');
    nav.className = 'header-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');

    this.navItems.forEach((item) => {
      const link = document.createElement('a');
      link.className = 'header-nav-link';
      link.textContent = item.label;

      if (item.page) {
        link.href = item.page === 'home' ? '#' : `#${item.page}`;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.onNavigate(item.page!);
        });

        if (item.page === this.currentPage) {
          link.classList.add('active');
        }

        this.navLinks.set(item.page, link);
      } else if (item.href) {
        link.href = item.href;
        if (item.external) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      }

      nav.appendChild(link);
    });

    return nav;
  }

  private createActions(): HTMLElement {
    const actions = document.createElement('div');
    actions.className = 'header-actions';

    const githubLink = document.createElement('a');
    githubLink.className = 'btn btn-ghost btn-icon';
    githubLink.href = 'https://github.com/astra-solaris/astra-solaris';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.setAttribute('aria-label', 'View on GitHub');
    githubLink.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    `;

    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'header-mobile-toggle';
    mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.innerHTML = `
      <svg class="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
      <svg class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: none;">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    `;
    mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

    actions.appendChild(githubLink);
    actions.appendChild(mobileToggle);

    return actions;
  }

  private createMobileMenu(): void {
    this.mobileOverlay = document.createElement('div');
    this.mobileOverlay.className = 'mobile-menu-overlay';
    this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());

    this.mobileMenu = document.createElement('div');
    this.mobileMenu.className = 'mobile-menu';
    this.mobileMenu.setAttribute('role', 'dialog');
    this.mobileMenu.setAttribute('aria-modal', 'true');
    this.mobileMenu.setAttribute('aria-label', 'Mobile navigation');

    const menuContent = document.createElement('nav');
    menuContent.className = 'mobile-menu-content';

    this.navItems.forEach((item) => {
      const link = document.createElement('a');
      link.className = 'mobile-menu-link';
      link.textContent = item.label;

      if (item.page) {
        link.href = item.page === 'home' ? '#' : `#${item.page}`;
        if (item.page === this.currentPage) {
          link.classList.add('active');
        }
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeMobileMenu();
          this.onNavigate(item.page!);
        });
      } else if (item.href) {
        link.href = item.href;
        if (item.external) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        link.addEventListener('click', () => this.closeMobileMenu());
      }

      menuContent.appendChild(link);
    });

    const githubLink = document.createElement('a');
    githubLink.className = 'mobile-menu-link mobile-menu-github';
    githubLink.href = 'https://github.com/astra-solaris/astra-solaris';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      <span>GitHub</span>
    `;
    menuContent.appendChild(githubLink);

    this.mobileMenu.appendChild(menuContent);

    this.injectMobileMenuStyles();
  }

  private injectMobileMenuStyles(): void {
    const styleId = 'header-mobile-menu-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .mobile-menu-overlay {
        position: fixed;
        inset: 0;
        background: rgba(10, 14, 23, 0.8);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 299;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .mobile-menu-overlay.open {
        opacity: 1;
        visibility: visible;
      }

      .mobile-menu {
        position: fixed;
        top: var(--header-height, 4rem);
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.98);
        border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        z-index: 300;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
      }

      .mobile-menu.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .mobile-menu-content {
        display: flex;
        flex-direction: column;
        padding: 1rem 1.5rem 1.5rem;
        max-height: calc(100vh - var(--header-height, 4rem) - 2rem);
        overflow-y: auto;
      }

      .mobile-menu-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 0;
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--text-secondary, #cbd5e1);
        text-decoration: none;
        border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        transition: color 0.2s ease;
      }

      .mobile-menu-link:last-child {
        border-bottom: none;
      }

      .mobile-menu-link:hover,
      .mobile-menu-link.active {
        color: var(--text-primary, #f1f5f9);
      }

      .mobile-menu-link.active {
        color: var(--color-primary-400, #818cf8);
      }

      .mobile-menu-github {
        margin-top: 0.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(148, 163, 184, 0.2);
        border-bottom: none;
      }

      .mobile-menu-github svg {
        flex-shrink: 0;
      }

      @media (min-width: 768px) {
        .mobile-menu-overlay,
        .mobile-menu {
          display: none !important;
        }
      }

      body.mobile-menu-open {
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  }

  private toggleMobileMenu(): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  private openMobileMenu(): void {
    if (!this.mobileMenu || !this.mobileOverlay) {
      return;
    }

    if (!this.mobileMenu.parentNode) {
      document.body.appendChild(this.mobileOverlay);
      document.body.appendChild(this.mobileMenu);
    }

    this.mobileMenuOpen = true;
    this.mobileOverlay.classList.add('open');
    this.mobileMenu.classList.add('open');
    document.body.classList.add('mobile-menu-open');

    const toggle = this.element.querySelector('.header-mobile-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      const menuIcon = toggle.querySelector('.menu-icon') as HTMLElement;
      const closeIcon = toggle.querySelector('.close-icon') as HTMLElement;
      if (menuIcon) {
        menuIcon.style.display = 'none';
      }
      if (closeIcon) {
        closeIcon.style.display = 'block';
      }
    }

    const firstLink = this.mobileMenu.querySelector('.mobile-menu-link') as HTMLElement;
    if (firstLink) {
      firstLink.focus();
    }

    this.setupMobileMenuTrap();
  }

  private closeMobileMenu(): void {
    if (!this.mobileMenu || !this.mobileOverlay) {
      return;
    }

    this.mobileMenuOpen = false;
    this.mobileOverlay.classList.remove('open');
    this.mobileMenu.classList.remove('open');
    document.body.classList.remove('mobile-menu-open');

    const toggle = this.element.querySelector('.header-mobile-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      const menuIcon = toggle.querySelector('.menu-icon') as HTMLElement;
      const closeIcon = toggle.querySelector('.close-icon') as HTMLElement;
      if (menuIcon) {
        menuIcon.style.display = 'block';
      }
      if (closeIcon) {
        closeIcon.style.display = 'none';
      }
    }

    this.removeMobileMenuTrap();
  }

  private setupMobileMenuTrap(): void {
    document.addEventListener('keydown', this.handleMobileMenuKeydown);
  }

  private removeMobileMenuTrap(): void {
    document.removeEventListener('keydown', this.handleMobileMenuKeydown);
  }

  private handleMobileMenuKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.closeMobileMenu();
      const toggle = this.element.querySelector('.header-mobile-toggle') as HTMLElement;
      if (toggle) {
        toggle.focus();
      }
    }

    if (event.key === 'Tab' && this.mobileMenu) {
      const focusableElements = this.mobileMenu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  private updateActiveStates(): void {
    this.navLinks.forEach((link, page) => {
      if (page === this.currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (this.mobileMenu) {
      const mobileLinks = this.mobileMenu.querySelectorAll('.mobile-menu-link');
      mobileLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const linkPage = href === '#' ? 'home' : href?.replace('#', '');
        if (linkPage === this.currentPage) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  private setupScrollListener(): void {
    let ticking = false;

    const handleScroll = (): void => {
      const shouldBeScrolled = window.scrollY > 50;

      if (shouldBeScrolled !== this.scrolled) {
        this.scrolled = shouldBeScrolled;
        if (this.scrolled) {
          this.element.classList.add('scrolled');
        } else {
          this.element.classList.remove('scrolled');
        }
      }

      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(handleScroll);
          ticking = true;
        }
      },
      { passive: true }
    );

    handleScroll();
  }

  destroy(): void {
    this.removeMobileMenuTrap();
    this.mobileOverlay?.remove();
    this.mobileMenu?.remove();
    this.element.remove();
  }
}

export { Header };
export type { HeaderOptions, PageName };