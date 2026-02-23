import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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

  static override styles = css`
    :host {
      display: block;
      background-color: #212429; 
      padding: 32px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #ffffff;
      box-sizing: border-box;
    }

    * {
      box-sizing: border-box;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .car-card {
      background-color: #2a2e33;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .car-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px rgba(0,0,0,0.2);
    }

    /* Badge Styles */
    .badge {
      position: absolute;
      top: 16px;
      left: 16px;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      z-index: 1;
    }

    .badge.electric { background-color: #1eb3f7; }
    .badge.new { background-color: #1eb3f7; } /* Matches the blue NEW in the center card */
    .badge.new-red { background-color: #f03e3e; } /* Add "NEW-RED" in AEM if you want the right card's style */

    /* Image */
    .image-container {
      position: relative;
      width: 100%;
      height: 200px;
    }
    
    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Typography & Content Wrapper */
    .card-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 24px;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 24px 0;
      letter-spacing: 0.3px;
    }

    .stats-row {
      display: flex;
      justify-content: flex-start;
      gap: 32px;
      margin-bottom: 24px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .stat .value {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }

    /* Target the specific blue text from your design */
    .stat .value.blue-text {
      color: #1eb3f7;
    }

    .stat .label {
      font-size: 11px;
      color: #9aa0a6;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Footer */
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto; /* Pushes footer to the bottom */
      padding-top: 16px;
    }

    .price {
      font-size: 18px;
      font-weight: 700;
    }

    .configure-btn {
      background-color: #3f5263;
      color: #ffffff;
      text-decoration: none;
      font-size: 12px;
      font-weight: 600;
      padding: 10px 16px;
      border-radius: 6px;
      transition: background-color 0.2s ease;
    }

    .configure-btn:hover {
      background-color: #4f667a;
    }
  `;

  override render() {
    return html`
      <div class="grid-container">
        ${this.cars.map(car => html`
          <div class="car-card">
            
            <div class="image-container">
              ${car.categoryFlag && car.categoryFlag !== 'NONE' ? 
                html`<span class="badge ${car.categoryFlag.toLowerCase()}">${car.categoryFlag}</span>` : 
                nothing}
                <span>${car.image}</span>
              <img src="${car.image}" alt="${car.title}" loading="lazy" />
            </div>
            
            <div class="card-content">
              <h3>${car.title}</h3>
              
              <div class="stats-row">
                ${car.acceleration ? html`
                  <div class="stat">
                    <span class="value">${car.acceleration}</span>
                    <span class="label">0-60 mph</span>
                  </div>
                ` : nothing}
                
                ${car.rangeOrSpeed ? html`
                  <div class="stat">
                    <span class="value">${car.rangeOrSpeed}</span>
                    <span class="label">${car.rangeLabel}</span>
                  </div>
                ` : nothing}
                
                ${car.power ? html`
                  <div class="stat">
                    <span class="value ${car.power.toLowerCase().includes('v8') ? 'blue-text' : ''}">
                      ${car.power}
                    </span>
                    <span class="label">${car.powerLabel}</span>
                  </div>
                ` : nothing}
              </div>
              
              <div class="card-footer">
                <span class="price">${car.price}</span>
                <a href="${car.link}" class="configure-btn">CONFIGURE ></a>
              </div>
            </div>

          </div>
        `)}
      </div>
    `;
  }
}