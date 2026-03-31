interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterNavSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

class Footer {
  private readonly element: HTMLElement;
  private readonly currentYear: number;

  private readonly navSections: FooterNavSection[] = [
    {
      title: 'Platform',
      links: [
        { label: 'Explorer', href: '/explorer/' },
        { label: 'Playground', href: '/playground/' },
        { label: 'Orbital Elements', href: '/orbital-elements/' },
        { label: 'Documentation', href: '/docs/' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Quick Start', href: '/docs/guide/quick-start' },
        { label: 'Astra Language', href: '/docs/language/' },
        { label: 'API Reference', href: '/docs/api/' },
        { label: 'Examples', href: '/docs/examples/' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: 'https://github.com/astra-solaris/astra-solaris', external: true },
        { label: 'Discussions', href: 'https://github.com/astra-solaris/astra-solaris/discussions', external: true },
        { label: 'Contributing', href: '/docs/contributing/' },
        { label: 'Code of Conduct', href: 'https://github.com/astra-solaris/astra-solaris/blob/main/CODE_OF_CONDUCT.md', external: true },
      ],
    },
  ];

  private readonly socialLinks: SocialLink[] = [
    {
      platform: 'github',
      href: 'https://github.com/astra-solaris/astra-solaris',
      ariaLabel: 'AstraSolaris on GitHub',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>`,
    },
    {
      platform: 'twitter',
      href: 'https://twitter.com/astrasolaris',
      ariaLabel: 'AstraSolaris on Twitter',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>`,
    },
    {
      platform: 'discord',
      href: 'https://discord.gg/astrasolaris',
      ariaLabel: 'AstraSolaris Discord Server',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>`,
    },
    {
      platform: 'youtube',
      href: 'https://youtube.com/@astrasolaris',
      ariaLabel: 'AstraSolaris on YouTube',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>`,
    },
  ];

  constructor() {
    this.currentYear = new Date().getFullYear();
    this.element = this.createElement();
  }

  render(): HTMLElement {
    return this.element;
  }

  private createElement(): HTMLElement {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.setAttribute('role', 'contentinfo');

    const container = document.createElement('div');
    container.className = 'container';

    container.appendChild(this.createMainGrid());
    container.appendChild(this.createDivider());
    container.appendChild(this.createBottomSection());

    footer.appendChild(container);

    return footer;
  }

  private createMainGrid(): HTMLElement {
    const grid = document.createElement('div');
    grid.className = 'footer-grid';

    grid.appendChild(this.createBrandSection());

    this.navSections.forEach((section) => {
      grid.appendChild(this.createNavSection(section));
    });

    return grid;
  }

  private createBrandSection(): HTMLElement {
    const brand = document.createElement('div');
    brand.className = 'footer-brand';

    const logo = document.createElement('div');
    logo.className = 'footer-brand-logo';
    logo.innerHTML = `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="50" cy="50" r="45" stroke="url(#footer-orbit-gradient)" stroke-width="1.5" fill="none" opacity="0.6"/>
        <ellipse cx="50" cy="50" rx="35" ry="20" stroke="url(#footer-orbit-gradient)" stroke-width="1" fill="none" transform="rotate(-20 50 50)" opacity="0.4"/>
        <circle cx="50" cy="50" r="12" fill="url(#footer-sun-gradient)"/>
        <circle cx="50" cy="50" r="16" fill="url(#footer-glow-gradient)" opacity="0.5"/>
        <circle cx="78" cy="38" r="5" fill="url(#footer-planet-gradient)"/>
        <defs>
          <linearGradient id="footer-orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1"/>
            <stop offset="100%" stop-color="#8b5cf6"/>
          </linearGradient>
          <radialGradient id="footer-sun-gradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stop-color="#fbbf24"/>
            <stop offset="70%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d97706"/>
          </radialGradient>
          <radialGradient id="footer-glow-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="footer-planet-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#60a5fa"/>
            <stop offset="100%" stop-color="#3b82f6"/>
          </linearGradient>
        </defs>
      </svg>
      <span>AstraSolaris</span>
    `;

    const description = document.createElement('p');
    description.className = 'footer-brand-description';
    description.textContent =
      'An open-source platform for astronomical simulation. Describe space scenarios in plain English with the Astra language and create stunning interactive 3D visualizations.';

    const newsletter = this.createNewsletterSection();

    brand.appendChild(logo);
    brand.appendChild(description);
    brand.appendChild(newsletter);

    return brand;
  }

  private createNewsletterSection(): HTMLElement {
    const newsletter = document.createElement('div');
    newsletter.className = 'footer-newsletter';

    const title = document.createElement('p');
    title.className = 'footer-newsletter-title';
    title.textContent = 'Stay updated with cosmic discoveries';

    const form = document.createElement('form');
    form.className = 'footer-newsletter-form';
    form.setAttribute('action', '#');
    form.setAttribute('method', 'POST');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleNewsletterSubmit(form);
    });

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'footer-newsletter-input-wrapper';

    const input = document.createElement('input');
    input.type = 'email';
    input.name = 'email';
    input.placeholder = 'Enter your email';
    input.className = 'footer-newsletter-input';
    input.setAttribute('aria-label', 'Email address for newsletter');
    input.required = true;

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'footer-newsletter-btn';
    button.innerHTML = `
      <span>Subscribe</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(button);
    form.appendChild(inputWrapper);

    newsletter.appendChild(title);
    newsletter.appendChild(form);

    this.injectNewsletterStyles();

    return newsletter;
  }

  private handleNewsletterSubmit(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const email = formData.get('email') as string;

    if (email) {
      console.info('Newsletter subscription:', email);
      const input = form.querySelector('input');
      if (input) {
        input.value = '';
      }

      const message = document.createElement('p');
      message.className = 'footer-newsletter-success';
      message.textContent = '✨ Thanks for subscribing!';

      const existingMessage = form.parentElement?.querySelector('.footer-newsletter-success');
      if (existingMessage) {
        existingMessage.remove();
      }

      form.parentElement?.appendChild(message);

      setTimeout(() => {
        message.remove();
      }, 3000);
    }
  }

  private injectNewsletterStyles(): void {
    const styleId = 'footer-newsletter-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .footer-newsletter {
        margin-top: var(--space-6);
      }

      .footer-newsletter-title {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        margin-bottom: var(--space-3);
      }

      .footer-newsletter-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .footer-newsletter-input-wrapper {
        display: flex;
        gap: var(--space-2);
      }

      .footer-newsletter-input {
        flex: 1;
        min-width: 0;
        padding: var(--space-2-5) var(--space-3);
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        color: var(--text-primary);
        font-size: var(--text-sm);
        transition: all var(--duration-fast) var(--ease-out);
      }

      .footer-newsletter-input::placeholder {
        color: var(--text-muted);
      }

      .footer-newsletter-input:focus {
        outline: none;
        border-color: var(--color-primary-500);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      .footer-newsletter-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2-5) var(--space-4);
        background: var(--gradient-primary);
        border: none;
        border-radius: var(--radius-lg);
        color: var(--color-neutral-0);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        cursor: pointer;
        transition: all var(--duration-fast) var(--ease-out);
        white-space: nowrap;
      }

      .footer-newsletter-btn:hover {
        transform: translateY(-1px);
        box-shadow: var(--glow-primary-sm);
      }

      .footer-newsletter-btn:active {
        transform: translateY(0);
      }

      .footer-newsletter-btn svg {
        transition: transform var(--duration-fast) var(--ease-out);
      }

      .footer-newsletter-btn:hover svg {
        transform: translateX(2px);
      }

      .footer-newsletter-success {
        font-size: var(--text-sm);
        color: var(--color-success-400);
        margin-top: var(--space-2);
        animation: fade-in-up var(--duration-normal) var(--ease-out);
      }

      @media (max-width: 480px) {
        .footer-newsletter-input-wrapper {
          flex-direction: column;
        }

        .footer-newsletter-btn {
          justify-content: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private createNavSection(section: FooterNavSection): HTMLElement {
    const nav = document.createElement('nav');
    nav.className = 'footer-nav-section';
    nav.setAttribute('aria-label', section.title);

    const title = document.createElement('h3');
    title.className = 'footer-nav-title';
    title.textContent = section.title;

    const list = document.createElement('ul');
    list.className = 'footer-nav-list';

    section.links.forEach((link) => {
      const item = document.createElement('li');

      const anchor = document.createElement('a');
      anchor.className = 'footer-nav-link';
      anchor.href = link.href;
      anchor.textContent = link.label;

      if (link.external) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';

        const externalIcon = document.createElement('span');
        externalIcon.className = 'footer-external-icon';
        externalIcon.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        `;
        anchor.appendChild(externalIcon);

        this.injectExternalIconStyles();
      }

      item.appendChild(anchor);
      list.appendChild(item);
    });

    nav.appendChild(title);
    nav.appendChild(list);

    return nav;
  }

  private injectExternalIconStyles(): void {
    const styleId = 'footer-external-icon-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .footer-external-icon {
        display: inline-flex;
        margin-left: var(--space-1);
        opacity: 0.5;
        transition: opacity var(--duration-fast) var(--ease-out);
      }

      .footer-nav-link:hover .footer-external-icon {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  private createDivider(): HTMLElement {
    const divider = document.createElement('div');
    divider.className = 'footer-divider';
    divider.setAttribute('role', 'separator');

    this.injectDividerStyles();

    return divider;
  }

  private injectDividerStyles(): void {
    const styleId = 'footer-divider-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .footer-divider {
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          var(--border-subtle) 20%,
          var(--border-default) 50%,
          var(--border-subtle) 80%,
          transparent 100%
        );
        margin: var(--space-8) 0;
      }
    `;
    document.head.appendChild(style);
  }

  private createBottomSection(): HTMLElement {
    const bottom = document.createElement('div');
    bottom.className = 'footer-bottom';

    const leftSection = document.createElement('div');
    leftSection.className = 'footer-bottom-left';

    const copyright = document.createElement('p');
    copyright.className = 'footer-copyright';
    copyright.innerHTML = `© ${this.currentYear} AstraSolaris. Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>.`;

    const builtWith = document.createElement('p');
    builtWith.className = 'footer-built-with';
    builtWith.innerHTML = `Built with <span class="footer-heart" aria-label="love">💫</span> for the cosmic community`;

    leftSection.appendChild(copyright);
    leftSection.appendChild(builtWith);

    const social = this.createSocialLinks();

    bottom.appendChild(leftSection);
    bottom.appendChild(social);

    this.injectBottomStyles();

    return bottom;
  }

  private injectBottomStyles(): void {
    const styleId = 'footer-bottom-extra-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .footer-bottom-left {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }

      .footer-copyright a {
        color: var(--text-tertiary);
        text-decoration: underline;
        text-underline-offset: 2px;
        transition: color var(--duration-fast) var(--ease-out);
      }

      .footer-copyright a:hover {
        color: var(--text-primary);
      }

      .footer-built-with {
        font-size: var(--text-sm);
        color: var(--text-muted);
        margin-bottom: 0;
      }

      .footer-heart {
        display: inline-block;
        animation: pulse-heart 2s ease-in-out infinite;
      }

      @keyframes pulse-heart {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }

      @media (max-width: 768px) {
        .footer-bottom {
          text-align: center;
        }

        .footer-bottom-left {
          align-items: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private createSocialLinks(): HTMLElement {
    const social = document.createElement('div');
    social.className = 'footer-social';
    social.setAttribute('role', 'list');
    social.setAttribute('aria-label', 'Social media links');

    this.socialLinks.forEach((link) => {
      const anchor = document.createElement('a');
      anchor.className = 'footer-social-link';
      anchor.href = link.href;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.setAttribute('aria-label', link.ariaLabel);
      anchor.setAttribute('role', 'listitem');
      anchor.innerHTML = link.icon;

      social.appendChild(anchor);
    });

    return social;
  }

  destroy(): void {
    this.element.remove();
  }
}

export { Footer };
export type { FooterLink, FooterNavSection, SocialLink };