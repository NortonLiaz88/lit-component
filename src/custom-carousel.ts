import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tokenStyles } from './design-tokens.js';
import { carouselStyles } from './custom-carousel.styles.js';

export interface CarouselAsset {
  display: string | boolean;
  fileReference: string;
  alt?: string;
  imageTitle?: string;
  description?: string;
  linkURL?: string;
}

@customElement('custom-carousel')
export class CustomCarousel extends LitElement {
  @property({ type: Array })
  assets: CarouselAsset[] = [];

  /** Accessible name for the carousel region. Overridable via the `label` attribute. */
  @property({ type: String })
  label = 'Image carousel';

  static override styles = [tokenStyles, carouselStyles];

  @state()
  private currentIndex = 0;

  private touchStartX = 0;
  private touchEndX = 0;
  private readonly minSwipeDistance = 50;

  private get visibleAssets(): CarouselAsset[] {
    return (this.assets || []).filter(asset =>
      typeof asset.display === 'boolean' ? asset.display : asset.display === 'true'
    );
  }

  private get numAssets(): number {
    return this.visibleAssets.length;
  }

  private next() {
    if (this.currentIndex < this.numAssets - 1) this.currentIndex++;
  }

  private prev() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  private goTo(index: number) {
    if (index >= 0 && index < this.numAssets) {
      this.currentIndex = index;
    }
  }

  // Handles arrow keys bubbled from any focused child inside the section.
  // tabindex="0" is intentionally removed from the section — children provide
  // the focus targets, and their keydown events bubble up here.
  private onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.next();
        break;
      case 'Home':
        e.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        e.preventDefault();
        this.goTo(this.numAssets - 1);
        break;
    }
  }

  private handleTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
  }

  private handleTouchMove(e: TouchEvent) {
    this.touchEndX = e.touches[0].clientX;
  }

  private handleTouchEnd() {
    const swipeDistance = this.touchStartX - this.touchEndX;
    if (!this.touchEndX || Math.abs(swipeDistance) < this.minSwipeDistance) return;

    if (swipeDistance > 0) {
      this.next();
    } else {
      this.prev();
    }

    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  private renderImage(asset: CarouselAsset, index: number, isActive: boolean) {
    // Fall back through alt → imageTitle → positional label so no image is ever unnamed.
    const alt = asset.alt || asset.imageTitle || `Slide ${index + 1}`;

    const img = html`
      <img
        class="cmp-assets__image"
        src=${asset.fileReference}
        alt=${alt}
        loading="lazy"
      />
    `;

    if (asset.linkURL) {
      return html`
        <a
          class="cmp-assets__image-link"
          href=${asset.linkURL}
          target="_blank"
          rel="noopener noreferrer"
          tabindex=${isActive ? '0' : '-1'}
        >${img}</a>
      `;
    }

    return img;
  }

  private renderNavButton(direction: 'prev' | 'next') {
    const isPrev = direction === 'prev';
    const isDisabled = isPrev
      ? this.currentIndex === 0
      : this.currentIndex === this.numAssets - 1;
    const path = isPrev ? 'M10 4L6 8L10 12' : 'M6 4L10 8L6 12';

    return html`
      <button
        type="button"
        class="cmp-custom-carousel__nav-btn cmp-custom-carousel__nav-btn--${direction}"
        aria-label=${isPrev ? 'Previous slide' : 'Next slide'}
        ?disabled=${isDisabled}
        @click=${isPrev ? this.prev : this.next}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
          <path d=${path} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;
  }

  private renderSlideContent(asset: CarouselAsset, isActive: boolean) {
    const hasContent = asset.imageTitle || asset.description;
    if (!hasContent) return nothing;

    return html`
      <div class="cmp-assets__title">
        ${asset.imageTitle
          ? html`<span class="cmp-assets__image-text">${asset.imageTitle}</span>`
          : nothing}
        ${asset.description
          ? html`<span class="cmp-assets__description-text" title=${asset.description}>${asset.description}</span>`
          : nothing}
        ${asset.linkURL
          ? html`
            <a
              class="cmp-assets_button-container"
              href=${asset.linkURL}
              target="_blank"
              rel="noopener noreferrer"
              tabindex=${isActive ? '0' : '-1'}
            >Discover</a>`
          : nothing}
      </div>
    `;
  }

  private renderSlide(asset: CarouselAsset, index: number) {
    const isActive = index === this.currentIndex;

    return html`
      <div
        class="cmp-assets__item ${isActive ? 'is-active' : ''}"
        role="group"
        aria-roledescription="slide"
        aria-label="Slide ${index + 1} of ${this.numAssets}"
        aria-hidden=${ifDefined(!isActive ? 'true' : undefined)}
      >
        <div class="cmp-assets__image-wrapper">
          ${this.renderImage(asset, index, isActive)}
          ${this.renderSlideContent(asset, isActive)}
        </div>
      </div>
    `;
  }

  private renderIndicators(assets: CarouselAsset[]) {
    return html`
      <div class="cmp-assets__indicators">
        <ol class="cmp-assets__indicators-list">
          ${assets.map((_asset, index) => {
            const isActive = index === this.currentIndex;
            return html`
              <li class="cmp-assets__indicator ${isActive ? 'is-active' : ''}">
                <button
                  type="button"
                  tabindex=${isActive ? '0' : '-1'}
                  aria-label="Go to slide ${index + 1}"
                  aria-current=${ifDefined(isActive ? 'true' : undefined)}
                  @click=${() => this.goTo(index)}
                ></button>
              </li>
            `;
          })}
        </ol>
      </div>
    `;
  }

  /** Prev/next buttons and dot indicators. Omitted entirely when there is only one slide. */
  private renderNavigation(assets: CarouselAsset[]) {
    if (assets.length <= 1) return nothing;
    return html`
      ${this.renderNavButton('prev')}
      ${this.renderNavButton('next')}
      ${this.renderIndicators(assets)}
    `;
  }

  private renderLiveRegion() {
    return html`
      <div class="visually-hidden" aria-live="polite" aria-atomic="true">
        Slide ${this.currentIndex + 1} of ${this.numAssets}
      </div>
    `;
  }

  override render() {
    const assets = this.visibleAssets;

    if (!assets || assets.length === 0) {
      return html`
        <div class="cmp-custom-carousel__placeholder">
          <p>Please configure carousel assets in the dialog.</p>
        </div>
      `;
    }

    return html`
      <section
        class="cmp-custom-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label=${this.label}
        @keydown=${this.onKeydown}
      >
        ${this.renderLiveRegion()}

        <div
          class="carousel-container"
          @touchstart=${this.handleTouchStart}
          @touchmove=${this.handleTouchMove}
          @touchend=${this.handleTouchEnd}
        >
          <div class="cmp-assets__track">
            ${assets.map((asset, index) => this.renderSlide(asset, index))}
          </div>
          ${this.renderNavigation(assets)}
        </div>
      </section>
    `;
  }
}
