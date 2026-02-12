import { css } from 'lit';
export const carouselStyles = css `
  .cmp-custom-carousel {
    width: 100%;
    position: relative;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #d4dad9;
    color: #252525;
    overflow: hidden;
  }

  .cmp-custom-carousel__placeholder {
    padding: 20px;
    text-align: center;
    background-color: #f5f5f5;
    border: 2px dashed #ccc;
    border-radius: 4px;
    color: #666;
  }

  .cmp-title {
    text-align: center;
    margin-bottom: 20px;
  }

  .cmp-title__text {
    font-size: 20px;
    margin: 0;
  }

  .carousel-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .cmp-assets__track {
    display: flex;
    overflow: hidden;
    width: 100%;
  }

  .cmp-assets__item {
    display: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
  }

  .cmp-assets__item.is-active {
    display: block;
  }

  .cmp-assets__image-wrapper {
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
  }

  .cmp-assets__image-wrapper a {
    display: block;
    width: 100%;
    height: 100%;
  }

  .cmp-assets__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .cmp-assets__description {
    margin-top: 10px;
    font-size: 1.25rem;
    margin: 10px 0 20px 0;
    line-height: 1.5;
    display: flex;
  }

  .cmp-assets__description-text {
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  .cmp-assets__indicators {
    margin-top: 10px;
    text-align: center;
  }

  .cmp-link__screen-reader-only {
    display: none !important;
  }

  .cmp-assets__indicators {
    position: absolute;
    bottom: 2.6rem;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    text-align: center;
    z-index: 10;
  }

  .cmp-assets__indicators-list {
    display: inline-flex;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .cmp-assets__indicator button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background-color: #ccc;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.3s ease;
  }

  .cmp-assets__indicator.is-active button {
    background-color: #6aa1f5;
  }

  .cmp-assets__indicator button[aria-current='true'],
  .cmp-assets__item.is-active ~ .cmp-assets__indicators .cmp-assets__indicator:first-child button {
    background-color: #fff;
  }

  .cmp-assets__title {
    margin-bottom: 10px;
    position: absolute;
    top: 40%;
    margin-left: 1.5rem;
  }

  .cmp-assets__image-text {
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }

  .cmp-assets__image-link--disabled {
    pointer-events: none;
    cursor: default;
  }

  .cmp-assets_button-container {
    appearance: none;
    backface-visibility: hidden;
    background-color: #2f80ed;
    border-radius: 10px;
    border-style: none;
    box-shadow: none;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: Inter, -apple-system, system-ui, 'Segoe UI', Helvetica, Arial,
      sans-serif;
    font-size: 15px;
    font-weight: 500;
    height: 50px;
    letter-spacing: normal;
    line-height: 1.5;
    outline: none;
    overflow: hidden;
    padding: 14px 30px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transform: translate3d(0, 0, 0);
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
    margin-top: 3rem;
  }

  .cmp-assets_button-container:hover {
    background-color: #1366d6;
    box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px,
      rgba(0, 0, 0, 0.05) 0 1px 4px;
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
  }

  .cmp-assets_button-container:active {
    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0,
      rgba(0, 0, 0, 0.1) 0 0 10px 0,
      rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
    transform: translateY(2px);
    transition-duration: 0.35s;
  }

  .carousel-controls-prev,
  .carousel-controls-next {
    flex-shrink: 0;
  }

  .carousel-controls-prev.hidden,
  .carousel-controls-next.hidden {
    display: none;
  }

  .carousel-controls-prev button,
  .carousel-controls-next button {
    background-color: transparent;
    border: none;
    color: #000;
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 10px;
    min-width: 40px;
    min-height: 40px;
  }

  .carousel-controls-prev button:disabled,
  .carousel-controls-next button:disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .carousel-controls-prev button:hover:not(:disabled),
  .carousel-controls-next button:hover:not(:disabled) {
    color: #ff0000;
  }

  .carousel-controls-prev button::before {
    content: '❮';
  }

  .carousel-controls-next button::before {
    content: '❯';
  }

  @media (max-width: 991px) {
    .cmp-assets__item {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    .cmp-assets__item {
      width: 100%;
    }

    .carousel-container {
      gap: 10px;
    }
  }
`;
//# sourceMappingURL=custom-carousel.styles.js.map