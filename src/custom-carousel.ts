import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { carouselStyles } from './custom-carousel.styles';

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

  static override styles = [carouselStyles];

  @state()
  private currentIndex = 0;

  // -- Variáveis para gerenciar o Swipe Mobile --
  private touchStartX = 0;
  private touchEndX = 0;
  private readonly minSwipeDistance = 50; // Distância mínima em pixels para considerar um swipe

  private get visibleAssets(): CarouselAsset[] {
    return (this.assets || []).filter(asset => {
      return typeof asset.display === 'boolean' ? asset.display : asset.display === 'true';
    });
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

  /**
   * Gerencia navegação por teclado (Acessibilidade).
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

  // --- Lógica de Swipe Mobile (Eventos de Toque) ---

  /** Captura onde o usuário tocou inicialmente. */
  private handleTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
  }

  /** Atualiza a posição final enquanto o usuário arrasta. */
  private handleTouchMove(e: TouchEvent) {
    this.touchEndX = e.touches[0].clientX;
  }

  /**
   * Quando o usuário solta o dedo, calcula a distância e direção.
   * Se for maior que o mínimo, troca de slide.
   */
  private handleTouchEnd() {
    const swipeDistance = this.touchStartX - this.touchEndX;

    // Se o movimento foi nulo ou muito pequeno, não faz nada
    if (!this.touchEndX || Math.abs(swipeDistance) < this.minSwipeDistance) {
      return;
    }

    if (swipeDistance > 0) {
      // Arrastou para a esquerda -> Próximo
      this.next();
    } else {
      // Arrastou para a direita -> Anterior
      this.prev();
    }

    // Reseta os valores para o próximo toque
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  // --- Sub-métodos de Renderização (Refatorados para Acessibilidade) ---

  /** Renderiza a imagem e o link. Adiciona tabindex="-1" se o slide não estiver ativo. */
  private renderImage(asset: CarouselAsset, isActive: boolean) {
    const imageTemplate = html`
      <img
        class="cmp-assets__image"
        src=${asset.fileReference}
        alt=${asset.alt || ''}
        loading="lazy"
      />
    `;

    if (asset.linkURL) {
      return html`
        <a
          class="cmp-assets__image-link"
          href=${asset.linkURL}
          target="_blank"
          tabindex=${isActive ? '0' : '-1'}
        >
          ${imageTemplate}
        </a>
      `;
    }

    return imageTemplate;
  }

  /** Renderiza o texto e botão "Discover". Garante que links internos tenham tabindex="-1" se inativos. */
  private renderSlideContent(asset: CarouselAsset, isActive: boolean) {
    const hasContent = asset.imageTitle || asset.description;
    if (!hasContent) return nothing;

    return html`
      <div class="cmp-assets__title">
        ${asset.imageTitle ? html`<span class="cmp-assets__image-text">${asset.imageTitle}</span>` : nothing}
        ${asset.description ? html`<span class="cmp-assets__description-text">${asset.description}</span>` : nothing}
        ${asset.linkURL
          ? html`
            <a
              class="cmp-assets_button-container"
              href=${asset.linkURL}
              target="_blank"
              tabindex=${isActive ? '0' : '-1'}
            >
              Discover
            </a>`
          : nothing}
      </div>
    `;
  }

  /** Renderiza um único slide inteiro. Usa aria-roledescription para Leitores de Tela. */
  private renderSlide(asset: CarouselAsset, index: number) {
    const isActive = index === this.currentIndex;

    return html`
      <div
        class="cmp-assets__item ${isActive ? 'is-active' : ''}"
        role="group"
        aria-roledescription="slide"
        aria-label="${index + 1} de ${this.numAssets}"
        aria-hidden=${!isActive}
      >
        <div class="cmp-assets__image-wrapper">
          ${this.renderImage(asset, isActive)}
          ${this.renderSlideContent(asset, isActive)}
        </div>
      </div>
    `;
  }

  /** Renderiza os indicadores (bolinhas). Botões inativos devem ter aria-current="false". */
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
                  @click=${() => this.goTo(index)}
                  aria-label=${`Ir para slide ${index + 1}`}
                  aria-current=${isActive ? 'true' : 'false'}
                ></button>
              </li>
            `;
          })}
        </ol>
      </div>
    `;
  }

  /**
   * Renderiza uma região "Live" que avisa leitores de tela quando o slide muda.
   * Visualmente escondido via CSS.
   */
  private renderLiveRegion() {
    return html`
      <div
        class="cmp-custom-carousel__live-region visually-hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        Slide ${this.currentIndex + 1} de ${this.numAssets}
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
        tabindex="0"
        @keydown=${this.onKeydown}
        aria-roledescription="carousel"
        aria-label="Destaques da página"
      >
        ${this.renderLiveRegion()}

        <div class="cmp-assets">
          <div
            class="carousel-container"
            @touchstart=${this.handleTouchStart}
            @touchmove=${this.handleTouchMove}
            @touchend=${this.handleTouchEnd}
          >
            <div class="cmp-assets__track">
              ${assets.map((asset, index) => this.renderSlide(asset, index))}
            </div>
            ${this.renderIndicators(assets)}
          </div>
        </div>
      </section>
    `;
  }
}