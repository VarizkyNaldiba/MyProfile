/**
 * parallaxEngine.ts
 * High-performance, GPU-accelerated multi-layered Parallax Engine for Astro.
 * Synchronized with Lenis smooth scroll engine and standard RAF loops.
 * Strictly respects prefers-reduced-motion for zero-jank accessibility.
 */

export interface ParallaxItem {
  el: HTMLElement;
  type: 'scroll' | 'inner' | 'stagger' | 'mouse';
  speed: number;
  dir: number;
  mouseFactor: number;
  scrollYOffset: number;
  mouseXOffset: number;
  mouseYOffset: number;
  scale: number;
}

export class ParallaxManager {
  private items: ParallaxItem[] = [];
  private isReducedMotion: boolean = false;
  private isFinePointer: boolean = false;
  private isMobile: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private curMouseX: number = 0;
  private curMouseY: number = 0;
  private hasMouseMoved: boolean = false;
  private boundPointerMove: ((e: PointerEvent) => void) | null = null;
  private boundResize: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      this.isMobile = window.innerWidth < 768;
    }
  }

  public init(root: Document | HTMLElement = document) {
    if (this.isReducedMotion) {
      this.resetAll();
      return;
    }

    this.collectElements(root);
    this.bindEvents();
    this.updateOnScroll(window.innerHeight);
  }

  private collectElements(root: Document | HTMLElement) {
    this.items = [];

    // 1. Elements with explicit scroll velocity drift (data-parallax-speed)
    const speedElems = root.querySelectorAll<HTMLElement>('[data-parallax-speed]');
    speedElems.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0');
      const mouse = parseFloat(el.getAttribute('data-parallax-mouse') || '0');
      const dir = parseFloat(el.getAttribute('data-parallax-dir') || '1');
      this.items.push({
        el,
        type: 'scroll',
        speed,
        dir,
        mouseFactor: mouse,
        scrollYOffset: 0,
        mouseXOffset: 0,
        mouseYOffset: 0,
        scale: 1.0
      });
    });

    // 2. Inner-image window gliding (data-parallax-inner)
    const innerElems = root.querySelectorAll<HTMLElement>('[data-parallax-inner]');
    innerElems.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-inner') || '0.2');
      this.items.push({
        el,
        type: 'inner',
        speed,
        dir: 1,
        mouseFactor: 0,
        scrollYOffset: 0,
        mouseXOffset: 0,
        mouseYOffset: 0,
        scale: 1.12
      });
    });

    // 3. Staggered grid/card items (data-parallax-type="stagger")
    const staggerElems = root.querySelectorAll<HTMLElement>('[data-parallax-type="stagger"]');
    staggerElems.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed') || '24');
      const dir = parseFloat(el.getAttribute('data-parallax-dir') || '1');
      this.items.push({
        el,
        type: 'stagger',
        speed,
        dir,
        mouseFactor: 0,
        scrollYOffset: 0,
        mouseXOffset: 0,
        mouseYOffset: 0,
        scale: 1.0
      });
    });

    // 4. Standalone mouse-reactive items without scroll drift
    const mouseOnlyElems = root.querySelectorAll<HTMLElement>('[data-parallax-mouse]:not([data-parallax-speed])');
    mouseOnlyElems.forEach((el) => {
      const mouse = parseFloat(el.getAttribute('data-parallax-mouse') || '0.04');
      this.items.push({
        el,
        type: 'mouse',
        speed: 0,
        dir: 1,
        mouseFactor: mouse,
        scrollYOffset: 0,
        mouseXOffset: 0,
        mouseYOffset: 0,
        scale: 1.0
      });
    });
  }

  private bindEvents() {
    this.boundResize = () => {
      this.isMobile = window.innerWidth < 768;
      this.updateOnScroll(window.innerHeight);
    };
    window.addEventListener('resize', this.boundResize, { passive: true });

    if (this.isFinePointer && !this.isReducedMotion) {
      this.boundPointerMove = (e: PointerEvent) => {
        this.hasMouseMoved = true;
        // Normalize mouse coordinates from screen center [-1, 1]
        this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', this.boundPointerMove, { passive: true });
    }
  }

  public updateOnScroll(windowHeight: number = window.innerHeight) {
    if (this.isReducedMotion) return;

    // Mobile damping factor to ensure readability and battery efficiency
    const damping = this.isMobile ? 0.45 : 1.0;
    const viewCenter = windowHeight / 2;

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const rect = item.el.getBoundingClientRect();

      // Viewport culling: skip offscreen items
      if (rect.bottom < -120 || rect.top > windowHeight + 120) {
        continue;
      }

      const elementCenter = rect.top + rect.height / 2;
      const progress = (elementCenter - viewCenter) / windowHeight;

      if (item.type === 'scroll') {
        // Subtle vertical velocity drift (e.g. 50px amplitude max)
        const offset = progress * item.speed * 60 * damping;
        item.scrollYOffset = offset;
      } else if (item.type === 'inner') {
        // Inner image gliding inside container: clamp progress [-1, 1]
        const clampedProg = Math.max(-1, Math.min(1, progress));
        const offset = clampedProg * item.speed * 42 * damping;
        item.scrollYOffset = offset;
      } else if (item.type === 'stagger') {
        // Differential left/right translation
        const offset = progress * item.dir * item.speed * damping;
        item.scrollYOffset = offset;
      }

      this.applyTransform(item);
    }
  }

  public updateOnFrame() {
    if (this.isReducedMotion || !this.isFinePointer || !this.hasMouseMoved) return;

    // Smooth inertia interpolation for mouse tracking
    this.curMouseX += (this.mouseX - this.curMouseX) * 0.075;
    this.curMouseY += (this.mouseY - this.curMouseY) * 0.075;

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.mouseFactor > 0) {
        item.mouseXOffset = this.curMouseX * item.mouseFactor * 18;
        item.mouseYOffset = this.curMouseY * item.mouseFactor * 18;
        this.applyTransform(item);
      }
    }
  }

  private applyTransform(item: ParallaxItem) {
    const totalX = item.mouseXOffset;
    const totalY = item.scrollYOffset + item.mouseYOffset;

    if (item.scale !== 1.0) {
      item.el.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) scale(${item.scale})`;
    } else {
      item.el.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0)`;
    }
  }

  public resetAll() {
    for (const item of this.items) {
      item.el.style.transform = '';
    }
    this.items = [];
  }

  public destroy() {
    this.resetAll();
    if (this.boundPointerMove) {
      window.removeEventListener('pointermove', this.boundPointerMove);
    }
    if (this.boundResize) {
      window.removeEventListener('resize', this.boundResize);
    }
  }
}
