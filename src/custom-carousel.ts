import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { carouselStyles } from './custom-carousel.styles';

/**
 * Represents a single slide asset authored in the AEM dialog.
 */
interface CarouselAsset {
  /** Determines if the slide should be rendered. Can be a boolean or a string ('true'/'false'). */
  display: string | boolean;
  /** The URL or path to the image file. */
  fileReference: string;
  /** Alternative text for the image for screen readers. */
  alt?: string;
  /** The headline or title displayed over the image. */
  imageTitle?: string;
  /** Subtext or description displayed below the title. */
  description?: string;
  /** Destination URL if the slide or "Discover" button should be clickable. */
  linkURL?: string;
}

/**
 * An accessible, keyboard-navigable image carousel component.
 * * @element custom-carousel
 */
@customElement('custom-carousel')
export class CustomCarousel extends LitElement {
  
  /**
   * The array of slide assets to be displayed in the carousel.
   * Typically injected as a JSON array via AEM's HTL/Sling Models.
   */
  @property({ type: Array })
  assets: CarouselAsset[] = [];

  static override styles = [carouselStyles];

  /** The index of the currently active slide. */
  @state()
  private currentIndex = 0;

  /**
   * Filters the raw assets array to only include those marked for display.
   * Handles both boolean and string representations of 'true'.
   */
  private get visibleAssets(): CarouselAsset[] {
    return (this.assets || []).filter(a => {
      if (typeof a.display === 'boolean') return a.display;
      return a.display === 'true';
    });
  }

  /** The total number of currently visible slides. */
  private get numAssets(): number {
    return this.visibleAssets.length;
  }

  /** Advances the carousel to the next slide if not at the end. */
  private next() {
    if (this.currentIndex < this.numAssets - 1) {
      this.currentIndex++;
    }
  }

  /** Returns the carousel to the previous slide if not at the beginning. */
  private prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  /**
   * Jumps directly to a specific slide index.
   * @param index - The target slide index.
   */
  private goTo(index: number) {
    if (index >= 0 && index < this.numAssets) {
      this.currentIndex = index;
    }
  }

  /**
   * Handles keyboard navigation for accessibility.
   * Allows users to cycle through slides using the Left and Right arrow keys.
   */
  private onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.next();
    }
  }

  override render() {
    const assets = this.visibleAssets;

    // Fallback UI when no valid assets are provided
    if (!assets || assets.length === 0) {
      return html`
        <div class="cmp-custom-carousel__placeholder">
          <p>Please configure carousel assets in the dialog.</p>
        </div>
      `;
    }

    return html`
      <div
        class="cmp-custom-carousel"
        tabindex="0"
        @keydown=${this.onKeydown}
      >
        <div class="cmp-assets">
          <div class="carousel-container">
            <div
              class="carousel-controls-prev ${this.numAssets > 1 ? '' : 'hidden'}"
            >
              <button
                type="button"
                @click=${this.prev}
                ?disabled=${this.currentIndex === 0}
                aria-label="Previous slide"
              ></button>
            </div>

            <div class="cmp-assets__track">
              ${assets.map((asset, index) => {
                const isActive = index === this.currentIndex;
                return html`
                  <div class="cmp-assets__item ${isActive ? 'is-active' : ''}">
                    <div class="cmp-assets__image-wrapper">
                      ${asset.linkURL
                        ? html`
                            <a
                              class="cmp-assets__image-link cmp-assets__image-link--disabled"
                              href=${asset.linkURL}
                              target="_blank"
                            >
                              <img
                                class="cmp-assets__image"
                                src=${asset.fileReference}
                                alt=${asset.alt || ''}
                                loading="lazy"
                              />
                            </a>
                          `
                        : html`
                            <img
                              class="cmp-assets__image"
                              src=${asset.fileReference}
                              alt=${asset.alt || ''}
                              loading="lazy"
                            />
                          `}
                      
                      ${asset.imageTitle || asset.description
                        ? html`
                            <div class="cmp-assets__title">
                              ${asset.imageTitle
                                ? html`<span class="cmp-assets__image-text">${asset.imageTitle}</span>`
                                : nothing}
                              ${asset.description
                                ? html`<span class="cmp-assets__description-text">${asset.description}</span>`
                                : nothing}
                              ${asset.linkURL
                                ? html`
                                    <a class="cmp-assets_button-container" href=${asset.linkURL} target="_blank">
                                      Discover
                                    </a>
                                  `
                                : nothing}
                            </div>
                          `
                        : nothing}
                    </div>
                  </div>
                `;
              })}
            </div>

            <div
              class="carousel-controls-next ${this.numAssets > 1 ? '' : 'hidden'}"
            >
              <button
                type="button"
                @click=${this.next}
                ?disabled=${this.currentIndex >= this.numAssets - 1}
                aria-label="Next slide"
              ></button>
            </div>

            <div class="cmp-assets__indicators">
              <ol class="cmp-assets__indicators-list">
                ${assets.map((_asset, index) => {
                  const isActive = index === this.currentIndex;
                  return html`
                    <li class="cmp-assets__indicator ${isActive ? 'is-active' : ''}">
                      <button
                        type="button"
                        @click=${() => this.goTo(index)}
                        aria-label=${`Go to slide ${index}`}
                        aria-current=${isActive ? 'true' : 'false'}
                      ></button>
                    </li>
                  `;
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}