import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { carouselStyles } from './custom-carousel.styles';

interface CarouselAsset {
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

  static override styles = [carouselStyles];

  @state()
  private currentIndex = 0;

  private get visibleAssets(): CarouselAsset[] {
    return (this.assets || []).filter(a => {
      if (typeof a.display === 'boolean') return a.display;
      return a.display === 'true';
    });
  }

  private get numAssets(): number {
    return this.visibleAssets.length;
  }

  private next() {
    if (this.currentIndex < this.numAssets - 1) {
      this.currentIndex++;
    }
  }

  private prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  private goTo(index: number) {
    if (index >= 0 && index < this.numAssets) {
      this.currentIndex = index;
    }
  }

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
            <!-- Prev button -->
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

            <!-- Track -->
            <div class="cmp-assets__track">
              ${assets.map((asset, index) => {
                const isActive = index === this.currentIndex;
                return html`
                  <div
                    class="cmp-assets__item ${isActive ? 'is-active' : ''}"
                  >
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
                                ? html`
                                    <span class="cmp-assets__image-text">
                                      ${asset.imageTitle}
                                    </span>
                                  `
                                : nothing}
                              ${asset.description
                                ? html`
                                    <span
                                      class="cmp-assets__description-text"
                                    >
                                      ${asset.description}
                                    </span>
                                  `
                                : nothing}
                              ${asset.linkURL
                                ? html`
                                    <a
                                      class="cmp-assets_button-container"
                                      href=${asset.linkURL}
                                      target="_blank"
                                    >
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

            <!-- Next button -->
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

            <!-- Indicators -->
            <div class="cmp-assets__indicators">
              <ol class="cmp-assets__indicators-list">
                ${assets.map((_asset, index) => {
                  const isActive = index === this.currentIndex;
                  return html`
                    <li
                      class="cmp-assets__indicator ${isActive
                        ? 'is-active'
                        : ''}"
                    >
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