import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokenStyles } from './design-tokens.js';
import { modelCardsGridStyles } from './model-cards-grid.styles.js';

interface CarData {
  title: string;
  link: string;
  categoryFlag: string;
  image: string;
  acceleration: string;
  rangeOrSpeed: string;
  rangeLabel: string;
  power: string;
  powerLabel: string;
  price: string;
}

@customElement('model-cards-grid')
export class ModelCardsGrid extends LitElement {

  @property({ type: Array })
  cars: CarData[] = [];

  static override styles = [tokenStyles, modelCardsGridStyles];

  override render() {
    return html`
      <div class="model-cards-grid__grid">
        ${this.cars.map(car => html`
          <div class="model-cards-grid__card">

            <div class="model-cards-grid__image-wrapper">
              ${car.categoryFlag && car.categoryFlag !== 'NONE' ?
                html`<span class="model-cards-grid__badge model-cards-grid__badge--${car.categoryFlag.toLowerCase()}">${car.categoryFlag}</span>` :
                nothing}
              <img class="model-cards-grid__image" src="${car.image}" alt="${car.title}" loading="lazy" />
            </div>

            <div class="model-cards-grid__content">
              <h3 class="model-cards-grid__title">${car.title}</h3>

              <div class="model-cards-grid__stats">
                ${car.acceleration ? html`
                  <div class="model-cards-grid__stat">
                    <span class="model-cards-grid__stat-value">${car.acceleration}</span>
                    <span class="model-cards-grid__stat-label">0-60 mph</span>
                  </div>
                ` : nothing}

                ${car.rangeOrSpeed ? html`
                  <div class="model-cards-grid__stat">
                    <span class="model-cards-grid__stat-value">${car.rangeOrSpeed}</span>
                    <span class="model-cards-grid__stat-label">${car.rangeLabel}</span>
                  </div>
                ` : nothing}

                ${car.power ? html`
                  <div class="model-cards-grid__stat">
                    <span class="model-cards-grid__stat-value ${car.power.toLowerCase().includes('v8') ? 'model-cards-grid__stat-value--highlight' : ''}">
                      ${car.power}
                    </span>
                    <span class="model-cards-grid__stat-label">${car.powerLabel}</span>
                  </div>
                ` : nothing}
              </div>

              <div class="model-cards-grid__footer">
                <span class="model-cards-grid__price">${car.price}</span>
                <a href="${car.link}" class="model-cards-grid__btn">CONFIGURE ></a>
              </div>
            </div>

          </div>
        `)}
      </div>
    `;
  }
}
