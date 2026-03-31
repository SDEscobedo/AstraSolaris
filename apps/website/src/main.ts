import { CodePreview } from '@components/code-preview';
import { FeatureCards } from '@components/feature-cards';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Hero } from '@components/hero';
import { Starfield } from '@components/starfield';
import { AboutPage } from '@pages/about';
import { CommunityPage } from '@pages/community';
import { HomePage } from '@pages/home';

import '@styles/variables.css';
import '@styles/main.css';

type PageName = 'home' | 'about' | 'community';

interface AppState {
  currentPage: PageName;
  isLoading: boolean;
  starfield: Starfield | null;
}

class AstraSolarisApp {
  private readonly state: AppState = {
    currentPage: 'home',
    isLoading: true,
    starfield: null,
  };

  private readonly appElement: HTMLElement;
  private readonly loadingElement: HTMLElement | null;
  private readonly starfieldCanvas: HTMLCanvasElement | null;

  private header: Header | null = null;
  private footer: Footer | null = null;
  private mainContent: HTMLElement | null = null;

  constructor() {
    const appElement = document.getElementById('app');
    if (!appElement) {
      throw new Error('App root element not found');
    }
    this.appElement = appElement;
    this.loadingElement = document.getElementById('app-loading');
    this.starfieldCanvas = document.getElementById('starfield-canvas') as HTMLCanvasElement | null;
  }

  async initialize(): Promise<void> {
    try {
      this.initializeStarfield();
      this.setupStructure();
      this.setupRouting();
      await this.renderCurrentPage();
      this.hideLoadingScreen();
      this.setupGlobalEventListeners();

      if (__DEV__) {
        console.info(`AstraSolaris v${__APP_VERSION__} initialized`);
      }
    } catch (error) {
      console.error('Failed to initialize AstraSolaris:', error);
      this.showErrorState();
    }
  }

  private initializeStarfield(): void {
    if (!this.starfieldCanvas) {
      return;
    }

    this.state.starfield = new Starfield(this.starfieldCanvas, {
      starCount: 800,
      speed: 0.3,
      depth: 1000,
      colors: ['#ffffff', '#a5b4fc', '#818cf8', '#c4b5fd', '#fbbf24'],
      enableShootingStars: true,
      shootingStarInterval: 8000,
    });

    this.state.starfield.start();
  }

  private setupStructure(): void {
    this.clearAppContent();

    this.header = new Header({
      onNavigate: (page: PageName) => this.navigateTo(page),
      currentPage: this.state.currentPage,
    });

    this.mainContent = document.createElement('main');
    this.mainContent.id = 'main-content';
    this.mainContent.setAttribute('role', 'main');
    this.mainContent.className = 'main-content';

    this.footer = new Footer();

    this.appElement.appendChild(this.header.render());
    this.appElement.appendChild(this.mainContent);
    this.appElement.appendChild(this.footer.render());
  }

  private clearAppContent(): void {
    const loading = this.loadingElement;
    while (this.appElement.firstChild) {
      if (this.appElement.firstChild !== loading) {
        this.appElement.removeChild(this.appElement.firstChild);
      } else {
        break;
      }
    }
  }

  private setupRouting(): void {
    window.addEventListener('hashchange', () => {
      const page = this.getPageFromHash();
      void this.navigateTo(page);
    });

    window.addEventListener('popstate', () => {
      const page = this.getPageFromHash();
      void this.navigateTo(page, false);
    });
  }

  private getPageFromHash(): PageName {
    const hash = window.location.hash.slice(1).toLowerCase();
    const validPages: PageName[] = ['home', 'about', 'community'];

    if (validPages.includes(hash as PageName)) {
      return hash as PageName;
    }

    return 'home';
  }

  async navigateTo(page: PageName, updateHistory = true): Promise<void> {
    if (page === this.state.currentPage) {
      return;
    }

    this.state.currentPage = page;

    if (updateHistory) {
      const hash = page === 'home' ? '' : `#${page}`;
      window.history.pushState({ page }, '', hash || window.location.pathname);
    }

    this.header?.setActivePage(page);
    await this.renderCurrentPage();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private async renderCurrentPage(): Promise<void> {
    if (!this.mainContent) {
      return;
    }

    this.mainContent.classList.add('page-transitioning');

    await this.delay(150);

    this.mainContent.innerHTML = '';

    const pageContent = this.createPageContent(this.state.currentPage);
    this.mainContent.appendChild(pageContent);

    this.mainContent.classList.remove('page-transitioning');
  }

  private createPageContent(page: PageName): HTMLElement {
    const container = document.createElement('div');
    container.className = 'page-container';

    switch (page) {
      case 'home':
        return this.createHomePage(container);
      case 'about':
        return this.createAboutPage(container);
      case 'community':
        return this.createCommunityPage(container);
      default:
        return this.createHomePage(container);
    }
  }

  private createHomePage(container: HTMLElement): HTMLElement {
    const homePage = new HomePage();
    const hero = new Hero({
      onExploreClick: () => this.scrollToFeatures(),
      onPlaygroundClick: () => this.openPlayground(),
    });
    const featureCards = new FeatureCards();
    const codePreview = new CodePreview();

    container.appendChild(hero.render());
    container.appendChild(featureCards.render());
    container.appendChild(codePreview.render());
    container.appendChild(homePage.render());

    return container;
  }

  private createAboutPage(container: HTMLElement): HTMLElement {
    const aboutPage = new AboutPage();
    container.appendChild(aboutPage.render());
    return container;
  }

  private createCommunityPage(container: HTMLElement): HTMLElement {
    const communityPage = new CommunityPage();
    container.appendChild(communityPage.render());
    return container;
  }

  private scrollToFeatures(): void {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private openPlayground(): void {
    window.open('/playground/', '_blank');
  }

  private hideLoadingScreen(): void {
    if (!this.loadingElement) {
      return;
    }

    this.loadingElement.classList.add('hidden');

    setTimeout(() => {
      this.loadingElement?.remove();
    }, 500);

    this.state.isLoading = false;
  }

  private showErrorState(): void {
    this.hideLoadingScreen();

    if (!this.mainContent) {
      return;
    }

    this.mainContent.innerHTML = `
      <div class="error-state">
        <div class="error-content">
          <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h2>Something went wrong</h2>
          <p>We encountered an error while loading AstraSolaris. Please try refreshing the page.</p>
          <button class="btn btn-primary" onclick="window.location.reload()">
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }

  private setupGlobalEventListeners(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.closeAnyOpenModals();
      }
    });

    window.addEventListener('resize', this.handleResize.bind(this));

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.state.starfield?.pause();
      } else {
        this.state.starfield?.resume();
      }
    });

    this.setupSmoothScrolling();
  }

  private setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event: Event) => {
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (!href || href === '#') {
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  private handleResize(): void {
    this.state.starfield?.resize();
  }

  private closeAnyOpenModals(): void {
    const modals = document.querySelectorAll('.modal.open');
    modals.forEach((modal) => {
      modal.classList.remove('open');
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  destroy(): void {
    this.state.starfield?.stop();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}

declare const __APP_VERSION__: string;
declare const __DEV__: boolean;

const initializeApp = async (): Promise<void> => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
      const app = new AstraSolarisApp();
      await app.initialize();

      if (__DEV__) {
        (window as unknown as { astraSolaris: AstraSolarisApp }).astraSolaris = app;
      }
    });
  } else {
    const app = new AstraSolarisApp();
    await app.initialize();

    if (__DEV__) {
      (window as unknown as { astraSolaris: AstraSolarisApp }).astraSolaris = app;
    }
  }
};

void initializeApp();

export { AstraSolarisApp };