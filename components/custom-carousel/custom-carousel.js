var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
let CustomCarousel = class CustomCarousel extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Array of assets coming from AEM (JSON).
         */
        this.assets = [];
        /**
         * Current slide index.
         */
        this.currentIndex = 0;
    }
    // Filter assets that are marked for display
    get visibleAssets() {
        return (this.assets || []).filter(a => {
            if (typeof a.display === 'boolean')
                return a.display;
            return a.display === 'true';
        });
    }
    get numAssets() {
        return this.visibleAssets.length;
    }
    next() {
        if (this.currentIndex < this.numAssets - 1) {
            this.currentIndex++;
        }
    }
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }
    goTo(index) {
        if (index >= 0 && index < this.numAssets) {
            this.currentIndex = index;
        }
    }
    onKeydown(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.prev();
        }
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.next();
        }
    }
    render() {
        const assets = this.visibleAssets;
        if (!assets || assets.length === 0) {
            return html `
        <div class="cmp-custom-carousel__placeholder">
          <p>Please configure carousel assets in the dialog.</p>
        </div>
      `;
        }
        return html `
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
            return html `
                  <div
                    class="cmp-assets__item ${isActive ? 'is-active' : ''}"
                  >
                    <div class="cmp-assets__image-wrapper">
                      ${asset.linkURL
                ? html `
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
                : html `
                            <img
                              class="cmp-assets__image"
                              src=${asset.fileReference}
                              alt=${asset.alt || ''}
                              loading="lazy"
                            />
                          `}
                      ${asset.imageTitle || asset.description
                ? html `
                            <div class="cmp-assets__title">
                              ${asset.imageTitle
                    ? html `
                                    <span class="cmp-assets__image-text">
                                      ${asset.imageTitle}
                                    </span>
                                  `
                    : nothing}
                              ${asset.description
                    ? html `
                                    <span
                                      class="cmp-assets__description-text"
                                    >
                                      ${asset.description}
                                    </span>
                                  `
                    : nothing}
                              ${asset.linkURL
                    ? html `
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
            return html `
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
};
CustomCarousel.styles = css `
    :host {
      display: block;
    }
    /* Optional: minimal host styling only.
       You can keep your existing SCSS/CSS outside the component,
       since we keep the same class names. */
  `;
__decorate([
    property({ type: Array })
], CustomCarousel.prototype, "assets", void 0);
__decorate([
    state()
], CustomCarousel.prototype, "currentIndex", void 0);
CustomCarousel = __decorate([
    customElement('custom-carousel')
], CustomCarousel);
export { CustomCarousel };
//# sourceMappingURL=custom-carousel.js.map