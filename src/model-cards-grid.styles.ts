import { css } from 'lit';

export const modelCardsGridStyles = css`
  :host {
    display: block;
    background-color: var(--color-bg-base);
    padding: var(--space-32);
    font-family: var(--font-family-base);
    color: var(--color-text-primary);
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }

  .model-cards-grid__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-24);
    max-width: 1200px;
    margin: 0 auto;
  }

  .model-cards-grid__card {
    background-color: var(--color-bg-surface);
    border-radius: var(--space-8);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 var(--space-4) var(--space-6) var(--color-shadow-sm);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .model-cards-grid__card:hover {
    transform: translateY(calc(var(--space-4) * -1));
    box-shadow: 0 var(--space-12) var(--space-20) var(--color-shadow-lg);
  }

  /* Badge */
  .model-cards-grid__badge {
    position: absolute;
    top: var(--space-16);
    left: var(--space-16);
    color: var(--color-text-primary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    padding: var(--space-4) var(--space-8);
    border-radius: var(--space-4);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-normal);
    z-index: 1;
  }

  .model-cards-grid__badge--electric { background-color: var(--color-brand-primary); }
  .model-cards-grid__badge--new      { background-color: var(--color-brand-primary); }
  .model-cards-grid__badge--new-red  { background-color: var(--color-status-danger); }

  /* Image */
  .model-cards-grid__image-wrapper {
    position: relative;
    width: 100%;
    height: 200px;
  }

  .model-cards-grid__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Content */
  .model-cards-grid__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: var(--space-24);
  }

  .model-cards-grid__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-medium);
    margin: 0 0 var(--space-24) 0;
    letter-spacing: var(--letter-spacing-tight);
  }

  .model-cards-grid__stats {
    display: flex;
    justify-content: flex-start;
    gap: var(--space-32);
    margin-bottom: var(--space-24);
  }

  .model-cards-grid__stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .model-cards-grid__stat-value {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-4);
    letter-spacing: var(--letter-spacing-normal);
  }

  .model-cards-grid__stat-value--highlight {
    color: var(--color-brand-primary);
  }

  .model-cards-grid__stat-label {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-normal);
  }

  /* Footer */
  .model-cards-grid__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: var(--space-16);
  }

  .model-cards-grid__price {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  .model-cards-grid__btn {
    background-color: var(--color-interactive-default);
    color: var(--color-text-primary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    padding: var(--space-10) var(--space-16);
    border-radius: var(--space-6);
    transition: background-color 0.2s ease;
  }

  .model-cards-grid__btn:hover {
    background-color: var(--color-interactive-hover);
  }
`;
