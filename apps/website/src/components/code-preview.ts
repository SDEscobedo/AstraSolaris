interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: 'astra';
}

interface CodeLine {
  number: number;
  content: string;
  tokens: CodeToken[];
}

interface CodeToken {
  type: 'keyword' | 'string' | 'number' | 'comment' | 'variable' | 'property' | 'operator' | 'punctuation' | 'text';
  value: string;
}

class CodePreview {
  private readonly element: HTMLElement;
  private readonly observer: IntersectionObserver | null = null;
  private activeExampleIndex = 0;
  private isRevealed = false;
  private typingAnimationFrame: number | null = null;

  private readonly examples: CodeExample[] = [
    {
      id: 'solar-system',
      title: 'Solar System',
      description: 'Visualize the entire solar system with orbital paths',
      code: `# Visualize the Solar System
Start space
  Sun
  Mercury
  Venus
  Earth
  Mars
  Jupiter
  Saturn
End space

Start observer heliocentric
  show all orbits
  at distance 30 AU
End observer

Start output scene`,
      language: 'astra',
    },
    {
      id: 'earth-moon',
      title: 'Earth & Moon',
      description: 'A detailed view of the Earth-Moon system',
      code: `# Earth-Moon System
Start space
  Earth
  Moon
End space

Start observer geocentric
  show Moon orbit
  show Earth rotational axis
  show labels
End observer

Start output scene`,
      language: 'astra',
    },
    {
      id: 'mars-mission',
      title: 'Mars Mission',
      description: 'Plan a Hohmann transfer to Mars',
      code: `# Mars Transfer Orbit
Start space
  Sun
  Earth
  Mars
End space

Start observer heliocentric
  show Earth orbit
  show Mars orbit
  at distance 3 AU
End observer

Start output scene`,
      language: 'astra',
    },
  ];

  private readonly astraKeywords = new Set([
    'Start',
    'End',
    'space',
    'observer',
    'output',
    'scene',
    'show',
    'at',
    'in',
    'front',
    'of',
    'all',
    'orbits',
    'orbit',
    'distance',
    'AU',
    'heliocentric',
    'geocentric',
    'rotational',
    'axis',
    'labels',
  ]);

  private readonly celestialBodies = new Set([
    'Sun',
    'Mercury',
    'Venus',
    'Earth',
    'Moon',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
    'Pluto',
  ]);

  constructor() {
    this.element = this.createElement();
    this.setupIntersectionObserver();
  }

  render(): HTMLElement {
    return this.element;
  }

  private createElement(): HTMLElement {
    const section = document.createElement('section');
    section.id = 'code-preview';
    section.className = 'code-preview section';
    section.setAttribute('aria-labelledby', 'code-preview-title');

    const container = document.createElement('div');
    container.className = 'container';

    const content = document.createElement('div');
    content.className = 'code-preview-container';

    content.appendChild(this.createTextContent());
    content.appendChild(this.createEditorSection());

    container.appendChild(content);
    section.appendChild(this.createBackgroundDecoration());
    section.appendChild(container);

    this.injectStyles();

    return section;
  }

  private createBackgroundDecoration(): HTMLElement {
    const decoration = document.createElement('div');
    decoration.className = 'code-preview-decoration';
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <div class="code-preview-glow code-preview-glow-1"></div>
      <div class="code-preview-glow code-preview-glow-2"></div>
      <div class="code-preview-grid"></div>
    `;

    return decoration;
  }

  private createTextContent(): HTMLElement {
    const content = document.createElement('div');
    content.className = 'code-preview-content reveal';

    const badge = document.createElement('div');
    badge.className = 'code-preview-badge';
    badge.innerHTML = `
      <span class="code-preview-badge-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      </span>
      <span>The Astra Language</span>
    `;

    const title = document.createElement('h2');
    title.id = 'code-preview-title';
    title.className = 'code-preview-title';
    title.innerHTML = `Write space scenarios in<br><span class="text-gradient">plain English</span>`;

    const description = document.createElement('p');
    description.className = 'code-preview-description';
    description.textContent =
      'Astra is a domain-specific language designed to make astronomical visualization accessible. Describe celestial objects, set your observer position, and produce stunning 3D scenes—all with human-readable syntax.';

    const features = this.createFeaturesList();

    const actions = document.createElement('div');
    actions.className = 'code-preview-actions';

    const primaryBtn = document.createElement('a');
    primaryBtn.href = '/docs/language/';
    primaryBtn.className = 'btn btn-primary btn-lg';
    primaryBtn.innerHTML = `
      <span>Learn Astra</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    `;

    const secondaryBtn = document.createElement('a');
    secondaryBtn.href = '/playground/';
    secondaryBtn.className = 'btn btn-secondary btn-lg';
    secondaryBtn.innerHTML = `
      <span>Try Playground</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
    `;

    actions.appendChild(primaryBtn);
    actions.appendChild(secondaryBtn);

    content.appendChild(badge);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(features);
    content.appendChild(actions);

    return content;
  }

  private createFeaturesList(): HTMLElement {
    const features = document.createElement('ul');
    features.className = 'code-preview-features';

    const featureItems = [
      'No programming experience required',
      'Real-time 3D visualization',
      'Scientific accuracy built-in',
      'Runs entirely in your browser',
    ];

    featureItems.forEach((text) => {
      const item = document.createElement('li');
      item.className = 'code-preview-feature';

      const icon = document.createElement('span');
      icon.className = 'code-preview-feature-icon';
      icon.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;

      const label = document.createElement('span');
      label.textContent = text;

      item.appendChild(icon);
      item.appendChild(label);
      features.appendChild(item);
    });

    return features;
  }

  private createEditorSection(): HTMLElement {
    const editorSection = document.createElement('div');
    editorSection.className = 'code-preview-editor reveal';

    editorSection.appendChild(this.createTabs());
    editorSection.appendChild(this.createEditor());

    return editorSection;
  }

  private createTabs(): HTMLElement {
    const tabs = document.createElement('div');
    tabs.className = 'code-editor-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Code examples');

    this.examples.forEach((example, index) => {
      const tab = document.createElement('button');
      tab.className = 'code-editor-tab';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(index === this.activeExampleIndex));
      tab.setAttribute('aria-controls', `code-panel-${example.id}`);
      tab.setAttribute('data-index', String(index));

      if (index === this.activeExampleIndex) {
        tab.classList.add('active');
      }

      const icon = this.getExampleIcon(example.id);
      tab.innerHTML = `
        <span class="code-editor-tab-icon">${icon}</span>
        <span class="code-editor-tab-label">${example.title}</span>
      `;

      tab.addEventListener('click', () => this.switchExample(index));

      tabs.appendChild(tab);
    });

    return tabs;
  }

  private getExampleIcon(id: string): string {
    const icons: Record<string, string> = {
      'solar-system': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <circle cx="12" cy="12" r="8" stroke-dasharray="2 4"/>
        <circle cx="12" cy="12" r="11" stroke-dasharray="1 3"/>
      </svg>`,
      'earth-moon': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="10" cy="12" r="6"/>
        <circle cx="18" cy="8" r="3"/>
      </svg>`,
      'mars-mission': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>`,
    };
    return icons[id] ?? icons['solar-system'];
  }

  private createEditor(): HTMLElement {
    const editor = document.createElement('div');
    editor.className = 'code-editor';

    editor.appendChild(this.createEditorHeader());
    editor.appendChild(this.createEditorBody());
    editor.appendChild(this.createEditorFooter());
    editor.appendChild(this.createOrbitalDecoration());

    return editor;
  }

  private createEditorHeader(): HTMLElement {
    const header = document.createElement('div');
    header.className = 'code-editor-header';

    const dots = document.createElement('div');
    dots.className = 'code-editor-dots';
    dots.innerHTML = `
      <span class="code-editor-dot red"></span>
      <span class="code-editor-dot yellow"></span>
      <span class="code-editor-dot green"></span>
    `;

    const filename = document.createElement('span');
    filename.className = 'code-editor-filename';
    filename.textContent = `${this.examples[this.activeExampleIndex].id}.astra`;

    const actions = document.createElement('div');
    actions.className = 'code-editor-actions';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-editor-action-btn';
    copyBtn.setAttribute('aria-label', 'Copy code');
    copyBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
    `;
    copyBtn.addEventListener('click', () => this.copyCode());

    actions.appendChild(copyBtn);

    header.appendChild(dots);
    header.appendChild(filename);
    header.appendChild(actions);

    return header;
  }

  private createEditorBody(): HTMLElement {
    const body = document.createElement('div');
    body.className = 'code-editor-body';
    body.setAttribute('role', 'tabpanel');
    body.id = `code-panel-${this.examples[this.activeExampleIndex].id}`;

    const example = this.examples[this.activeExampleIndex];
    const lines = this.parseCode(example.code);

    const pre = document.createElement('pre');
    pre.className = 'code-editor-pre';

    const code = document.createElement('code');
    code.className = 'code-editor-code';

    lines.forEach((line) => {
      const lineEl = this.createCodeLine(line);
      code.appendChild(lineEl);
    });

    pre.appendChild(code);
    body.appendChild(pre);

    return body;
  }

  private createCodeLine(line: CodeLine): HTMLElement {
    const lineEl = document.createElement('div');
    lineEl.className = 'code-editor-line';

    const lineNumber = document.createElement('span');
    lineNumber.className = 'code-editor-line-number';
    lineNumber.textContent = String(line.number);

    const lineContent = document.createElement('span');
    lineContent.className = 'code-editor-line-content';

    line.tokens.forEach((token) => {
      const tokenEl = document.createElement('span');
      tokenEl.className = `syntax-${token.type}`;
      tokenEl.textContent = token.value;
      lineContent.appendChild(tokenEl);
    });

    if (line.tokens.length === 0) {
      lineContent.innerHTML = '&nbsp;';
    }

    lineEl.appendChild(lineNumber);
    lineEl.appendChild(lineContent);

    return lineEl;
  }

  private createEditorFooter(): HTMLElement {
    const footer = document.createElement('div');
    footer.className = 'code-editor-footer';

    const example = this.examples[this.activeExampleIndex];

    const description = document.createElement('p');
    description.className = 'code-editor-description';
    description.textContent = example.description;

    const runHint = document.createElement('div');
    runHint.className = 'code-editor-hint';
    runHint.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
      <span>Try this in the Playground</span>
    `;

    footer.appendChild(description);
    footer.appendChild(runHint);

    return footer;
  }

  private createOrbitalDecoration(): HTMLElement {
    const decoration = document.createElement('div');
    decoration.className = 'code-editor-orbital-decoration';
    decoration.setAttribute('aria-hidden', 'true');

    decoration.innerHTML = `
      <svg viewBox="0 0 200 200" class="orbital-svg">
        <defs>
          <linearGradient id="orbit-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--color-primary-500)" stop-opacity="0.5"/>
            <stop offset="50%" stop-color="var(--color-secondary-500)" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="var(--color-primary-500)" stop-opacity="0.5"/>
          </linearGradient>
          <radialGradient id="planet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--color-accent-400)" stop-opacity="1"/>
            <stop offset="100%" stop-color="var(--color-accent-400)" stop-opacity="0"/>
          </radialGradient>
        </defs>
        
        <!-- Orbital paths -->
        <ellipse cx="100" cy="100" rx="60" ry="35" fill="none" stroke="url(#orbit-line-gradient)" stroke-width="1" transform="rotate(-15 100 100)" class="orbit-path orbit-1"/>
        <ellipse cx="100" cy="100" rx="80" ry="45" fill="none" stroke="url(#orbit-line-gradient)" stroke-width="0.5" transform="rotate(-15 100 100)" class="orbit-path orbit-2"/>
        
        <!-- Central star glow -->
        <circle cx="100" cy="100" r="12" fill="url(#planet-glow)" class="central-glow"/>
        <circle cx="100" cy="100" r="6" fill="var(--color-accent-400)" class="central-star"/>
        
        <!-- Orbiting planets -->
        <circle cx="160" cy="90" r="4" fill="var(--color-primary-400)" class="orbiting-planet planet-1"/>
        <circle cx="45" cy="120" r="3" fill="var(--color-info-400)" class="orbiting-planet planet-2"/>
      </svg>
    `;

    return decoration;
  }

  private parseCode(code: string): CodeLine[] {
    const lines = code.split('\n');
    return lines.map((content, index) => ({
      number: index + 1,
      content,
      tokens: this.tokenizeLine(content),
    }));
  }

  private tokenizeLine(line: string): CodeToken[] {
    const tokens: CodeToken[] = [];

    if (line.trim().startsWith('#')) {
      tokens.push({ type: 'comment', value: line });
      return tokens;
    }

    const regex = /(\s+)|([A-Za-z_][A-Za-z0-9_]*)|(\d+(?:\.\d+)?)|([^\s\w])/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      const [fullMatch, whitespace, word, number, punctuation] = match;

      if (whitespace) {
        tokens.push({ type: 'text', value: whitespace });
      } else if (word) {
        if (this.astraKeywords.has(word)) {
          tokens.push({ type: 'keyword', value: word });
        } else if (this.celestialBodies.has(word)) {
          tokens.push({ type: 'variable', value: word });
        } else {
          tokens.push({ type: 'property', value: word });
        }
      } else if (number) {
        tokens.push({ type: 'number', value: number });
      } else if (punctuation) {
        tokens.push({ type: 'punctuation', value: fullMatch });
      }
    }

    return tokens;
  }

  private switchExample(index: number): void {
    if (index === this.activeExampleIndex) {
      return;
    }

    this.activeExampleIndex = index;
    this.updateEditor();
    this.updateTabs();
  }

  private updateEditor(): void {
    const editor = this.element.querySelector('.code-editor');
    if (!editor) {
      return;
    }

    const filename = editor.querySelector('.code-editor-filename');
    if (filename) {
      filename.textContent = `${this.examples[this.activeExampleIndex].id}.astra`;
    }

    const body = editor.querySelector('.code-editor-body');
    if (body) {
      const example = this.examples[this.activeExampleIndex];
      const lines = this.parseCode(example.code);

      body.id = `code-panel-${example.id}`;

      const code = body.querySelector('.code-editor-code');
      if (code) {
        code.innerHTML = '';
        lines.forEach((line) => {
          const lineEl = this.createCodeLine(line);
          code.appendChild(lineEl);
        });
      }
    }

    const description = editor.querySelector('.code-editor-description');
    if (description) {
      description.textContent = this.examples[this.activeExampleIndex].description;
    }
  }

  private updateTabs(): void {
    const tabs = this.element.querySelectorAll('.code-editor-tab');
    tabs.forEach((tab, index) => {
      const isActive = index === this.activeExampleIndex;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
  }

  private async copyCode(): Promise<void> {
    const code = this.examples[this.activeExampleIndex].code;

    try {
      await navigator.clipboard.writeText(code);
      this.showCopyFeedback();
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }

  private showCopyFeedback(): void {
    const copyBtn = this.element.querySelector('.code-editor-action-btn');
    if (!copyBtn) {
      return;
    }

    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    `;
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
      copyBtn.classList.remove('copied');
    }, 2000);
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isRevealed) {
            this.isRevealed = true;
            this.revealContent();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    requestAnimationFrame(() => {
      observer.observe(this.element);
    });
  }

  private revealContent(): void {
    const reveals = this.element.querySelectorAll('.reveal');
    reveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 200);
    });
  }

  private injectStyles(): void {
    const styleId = 'code-preview-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .code-preview {
        position: relative;
        overflow: hidden;
        background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      }

      .code-preview-decoration {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: var(--z-behind);
      }

      .code-preview-glow {
        position: absolute;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.2;
      }

      .code-preview-glow-1 {
        top: 20%;
        right: -10%;
        background: var(--color-secondary-500);
      }

      .code-preview-glow-2 {
        bottom: 10%;
        left: -10%;
        background: var(--color-primary-500);
      }

      .code-preview-grid {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(rgba(99, 102, 241, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.02) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
        -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      }

      .code-preview-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .code-preview-container {
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-16);
        }
      }

      .code-preview-content {
        order: 2;
      }

      @media (min-width: 1024px) {
        .code-preview-content {
          order: 1;
        }
      }

      .code-preview-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-1-5) var(--space-4);
        background: rgba(168, 85, 247, 0.1);
        border: 1px solid rgba(168, 85, 247, 0.2);
        border-radius: var(--radius-full);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        color: var(--color-secondary-400);
        margin-bottom: var(--space-6);
      }

      .code-preview-badge-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .code-preview-title {
        font-size: var(--text-4xl);
        line-height: var(--leading-tight);
        margin-bottom: var(--space-4);
      }

      .code-preview-description {
        font-size: var(--text-lg);
        color: var(--text-secondary);
        margin-bottom: var(--space-6);
        line-height: var(--leading-relaxed);
      }

      .code-preview-features {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-bottom: var(--space-8);
      }

      .code-preview-feature {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        font-size: var(--text-sm);
        color: var(--text-secondary);
      }

      .code-preview-feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        background: rgba(16, 185, 129, 0.2);
        border-radius: var(--radius-full);
        color: var(--color-success-400);
        flex-shrink: 0;
      }

      .code-preview-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-4);
      }

      .code-preview-editor {
        order: 1;
        position: relative;
      }

      @media (min-width: 1024px) {
        .code-preview-editor {
          order: 2;
        }
      }

      .code-editor-tabs {
        display: flex;
        gap: var(--space-2);
        margin-bottom: var(--space-4);
        padding: var(--space-1);
        background: rgba(30, 41, 59, 0.4);
        border-radius: var(--radius-xl);
        overflow-x: auto;
        scrollbar-width: none;
      }

      .code-editor-tabs::-webkit-scrollbar {
        display: none;
      }

      .code-editor-tab {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-4);
        background: transparent;
        border: none;
        border-radius: var(--radius-lg);
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        color: var(--text-tertiary);
        cursor: pointer;
        white-space: nowrap;
        transition: all var(--duration-fast) var(--ease-out);
      }

      .code-editor-tab:hover {
        color: var(--text-secondary);
        background: rgba(255, 255, 255, 0.05);
      }

      .code-editor-tab.active {
        color: var(--text-primary);
        background: rgba(99, 102, 241, 0.15);
      }

      .code-editor-tab-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
      }

      .code-editor-tab.active .code-editor-tab-icon {
        opacity: 1;
        color: var(--color-primary-400);
      }

      .code-editor {
        position: relative;
        background: var(--code-bg);
        border: 1px solid var(--code-border);
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: var(--shadow-xl), var(--glow-primary-sm);
      }

      .code-editor-header {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-4);
        background: rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid var(--border-subtle);
      }

      .code-editor-dots {
        display: flex;
        gap: var(--space-2);
      }

      .code-editor-dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: var(--radius-full);
      }

      .code-editor-dot.red {
        background: #ff5f56;
      }

      .code-editor-dot.yellow {
        background: #ffbd2e;
      }

      .code-editor-dot.green {
        background: #27c93f;
      }

      .code-editor-filename {
        flex: 1;
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--text-muted);
      }

      .code-editor-actions {
        display: flex;
        gap: var(--space-2);
      }

      .code-editor-action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        background: transparent;
        border: none;
        border-radius: var(--radius-md);
        color: var(--text-muted);
        cursor: pointer;
        transition: all var(--duration-fast) var(--ease-out);
      }

      .code-editor-action-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
      }

      .code-editor-action-btn.copied {
        color: var(--color-success-400);
      }

      .code-editor-body {
        padding: var(--space-4);
        max-height: 400px;
        overflow-y: auto;
      }

      .code-editor-pre {
        margin: 0;
        padding: 0;
        background: none;
        border: none;
      }

      .code-editor-code {
        display: flex;
        flex-direction: column;
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        line-height: var(--leading-relaxed);
      }

      .code-editor-line {
        display: flex;
        gap: var(--space-4);
        min-height: 1.5rem;
      }

      .code-editor-line-number {
        user-select: none;
        color: var(--text-disabled);
        min-width: 1.5rem;
        text-align: right;
        flex-shrink: 0;
      }

      .code-editor-line-content {
        flex: 1;
      }

      .code-editor-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding: var(--space-3) var(--space-4);
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid var(--border-subtle);
      }

      .code-editor-description {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
        margin: 0;
      }

      .code-editor-hint {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-xs);
        color: var(--color-primary-400);
        white-space: nowrap;
      }

      .code-editor-hint svg {
        flex-shrink: 0;
      }

      .code-editor-orbital-decoration {
        position: absolute;
        top: 50%;
        right: -60px;
        transform: translateY(-50%);
        width: 200px;
        height: 200px;
        opacity: 0.3;
        pointer-events: none;
        display: none;
      }

      @media (min-width: 1280px) {
        .code-editor-orbital-decoration {
          display: block;
        }
      }

      .orbital-svg {
        width: 100%;
        height: 100%;
      }

      .orbit-path {
        animation: orbit-rotate 20s linear infinite;
        transform-origin: center;
      }

      .orbit-1 {
        animation-duration: 15s;
      }

      .orbit-2 {
        animation-duration: 25s;
        animation-direction: reverse;
      }

      .central-star {
        animation: star-pulse 3s ease-in-out infinite;
      }

      .central-glow {
        animation: glow-pulse 3s ease-in-out infinite;
      }

      .orbiting-planet {
        animation: planet-orbit 10s linear infinite;
        transform-origin: 100px 100px;
      }

      .planet-1 {
        animation-duration: 8s;
      }

      .planet-2 {
        animation-duration: 12s;
        animation-direction: reverse;
      }

      @keyframes orbit-rotate {
        from {
          transform: rotate(-15deg);
        }
        to {
          transform: rotate(345deg);
        }
      }

      @keyframes star-pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }

      @keyframes glow-pulse {
        0%, 100% {
          opacity: 0.5;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.2);
        }
      }

      @keyframes planet-orbit {
        from {
          transform: rotate(0deg) translateX(60px) rotate(0deg);
        }
        to {
          transform: rotate(360deg) translateX(60px) rotate(-360deg);
        }
      }

      /* Syntax Highlighting */
      .syntax-keyword {
        color: var(--syntax-keyword);
      }

      .syntax-string {
        color: var(--syntax-string);
      }

      .syntax-number {
        color: var(--syntax-number);
      }

      .syntax-comment {
        color: var(--syntax-comment);
        font-style: italic;
      }

      .syntax-variable {
        color: var(--color-accent-400);
        font-weight: var(--font-medium);
      }

      .syntax-property {
        color: var(--syntax-property);
      }

      .syntax-operator {
        color: var(--syntax-operator);
      }

      .syntax-punctuation {
        color: var(--syntax-punctuation);
      }

      .syntax-text {
        color: var(--text-primary);
      }

      /* Reveal animations */
      .code-preview-content.reveal,
      .code-preview-editor.reveal {
        opacity: 0;
        transform: translateY(30px);
      }

      .code-preview-content.reveal.revealed,
      .code-preview-editor.reveal.revealed {
        opacity: 1;
        transform: translateY(0);
        transition: opacity var(--duration-slow) var(--ease-out),
                    transform var(--duration-slow) var(--ease-out);
      }

      .code-preview-content.reveal.revealed {
        transition-delay: 0ms;
      }

      .code-preview-editor.reveal.revealed {
        transition-delay: 200ms;
      }

      /* Responsive adjustments */
      @media (max-width: 640px) {
        .code-preview-title {
          font-size: var(--text-2xl);
        }

        .code-preview-title br {
          display: none;
        }

        .code-preview-actions {
          flex-direction: column;
        }

        .code-preview-actions .btn {
          width: 100%;
          justify-content: center;
        }

        .code-editor-footer {
          flex-direction: column;
          align-items: flex-start;
        }

        .code-editor-body {
          max-height: 300px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .code-preview-content.reveal,
        .code-preview-editor.reveal {
          opacity: 1;
          transform: none;
        }

        .orbit-path,
        .central-star,
        .central-glow,
        .orbiting-planet {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  destroy(): void {
    if (this.typingAnimationFrame !== null) {
      cancelAnimationFrame(this.typingAnimationFrame);
    }
    this.element.remove();
  }
}

export { CodePreview };
export type { CodeExample, CodeLine, CodeToken };