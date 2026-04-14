import { css } from 'lit';

export const carouselStyles = css`
  /* --- Base --- */
  .cmp-custom-carousel {
    width: 100%;
    position: relative;
    font-family: var(--font-family-base);
    background-color: var(--color-bg-light);
    color: var(--color-text-dark);
    overflow: hidden;
  }

  .visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  .cmp-custom-carousel__placeholder {
    padding: var(--space-20);
    text-align: center;
    background-color: var(--color-bg-subtle);
    border: 2px dashed var(--color-border-default);
    border-radius: var(--space-4);
    color: var(--color-text-muted);
  }

  /* --- Layout --- */
  .carousel-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-16);
    width: 100%;
    touch-action: pan-y;
  }

  .cmp-assets__track {
    display: flex;
    overflow: hidden;
    flex: 1;
    min-width: 0;
  }

  /* --- Items & Images --- */
  .cmp-assets__item {
    display: none;
    width: 100%;
    box-sizing: border-box;
  }

  .cmp-assets__item.is-active {
    display: block;
  }

  .cmp-assets__image-wrapper {
    width: 100%;
    height: 400px;
    max-height: 70vh;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cmp-assets__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .cmp-assets__image-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }

  /* --- Text overlays --- */
  .cmp-assets__title {
    margin-bottom: var(--space-10);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: var(--space-32);
    right: var(--space-32);
    text-align: center;
  }

  .cmp-assets__image-text {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    display: block;
    text-shadow: 0 var(--space-2) var(--space-4) var(--color-shadow-xl);
  }

  .cmp-assets__description {
    margin: var(--space-10) 0 var(--space-20) 0;
    font-size: var(--font-size-xl);
    line-height: var(--line-height-normal);
    display: flex;
  }

  .cmp-assets__description-text {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
    text-align: center;
    color: var(--color-text-primary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    text-shadow: 0 1px var(--space-2) var(--color-shadow-xl);
  }

  /* --- CTA Button --- */
  .cmp-assets_button-container {
    appearance: none;
    background-color: var(--color-brand-secondary);
    border-radius: var(--space-10);
    border-style: none;
    color: var(--color-text-primary) !important;
    cursor: pointer;
    display: inline-block;
    font-family: var(--font-family-base);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    height: 50px;
    line-height: var(--line-height-normal);
    padding: var(--space-14) var(--space-30);
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    white-space: nowrap;
    margin-top: var(--space-24);
  }

  .cmp-assets_button-container:hover {
    background-color: var(--color-interactive-hover-dark);
    box-shadow: var(--color-shadow-xs) 0 5px 30px, var(--color-shadow-xs) 0 1px 4px;
    transform: translateY(calc(var(--space-2) * -1));
  }

  .cmp-assets_button-container:focus-visible {
    outline: 3px solid var(--color-interactive-focus);
    outline-offset: var(--space-2);
  }

  /* --- Indicators --- */
  .cmp-assets__indicators {
    position: absolute;
    bottom: var(--space-24);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .cmp-assets__indicators-list {
    display: inline-flex;
    gap: var(--space-8);
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .cmp-assets__indicator button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--color-text-primary);
    background-color: var(--color-overlay-light);
    cursor: pointer;
    padding: 0;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .cmp-assets__indicator button:hover {
    transform: scale(1.1);
  }

  .cmp-assets__indicator.is-active button,
  .cmp-assets__indicator button[aria-current='true'] {
    background-color: var(--color-text-primary);
    width: 14px;
    height: 14px;
  }

  /* --- Responsive --- */
  @media (max-width: 991px) {
    .cmp-assets__item {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    .cmp-assets__image-wrapper {
      height: 300px;
    }

    .cmp-assets__image-text {
      font-size: var(--font-size-3xl);
    }

    .carousel-container {
      gap: var(--space-10);
    }
  }
`;
