import { css } from 'lit';

export const carouselStyles = css`
  /* --- Variáveis e Base --- */
  .cmp-custom-carousel {
    width: 100%;
    position: relative;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #d4dad9;
    color: #252525;
    overflow: hidden;
  }

  /* Classe padrão para esconder elementos apenas visualmente (mantendo acessíveis para leitores de tela) */
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
    padding: 20px;
    text-align: center;
    background-color: #f5f5f5;
    border: 2px dashed #ccc;
    border-radius: 4px;
    color: #666;
  }

  /* --- Layout do Carousel --- */
  .carousel-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    /* Mobile: Melhora a experiência de swipe naitvo */
    touch-action: pan-y; /* Permite scroll vertical da página, mas gerencia swipe horizontal */
  }

  .cmp-assets__track {
    display: flex;
    overflow: hidden;
    flex: 1;
    min-width: 0;
  }

  /* --- Itens e Imagens --- */
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
    /* No mobile, uma altura fixa de 400px pode ser muito grande. Usamos vh (viewport height). */
    height: 400px;
    max-height: 70vh; /* Não deixa passar de 70% da altura da tela */
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

  /* Removi o pointer-events: none; do link desativado. 
     Para a11y, é melhor gerenciar via tabindex no JS para que o leitor de tela nem foque nele. */
  .cmp-assets__image-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }

  /* --- Textos e Conteúdo sobre a Imagem --- */
  .cmp-assets__title {
    margin-bottom: 10px;
    position: absolute;
    top: 50%; /* Centraliza verticalmente */
    transform: translateY(-50%);
    left: 2rem;
    right: 2rem; /* Garante padding nas laterais no mobile */
    text-align: center;
  }

  .cmp-assets__image-text {
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;
    display: block; /* Garante que quebre linha */
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Melhora leitura sobre a imagem */
  }

  .cmp-assets__description {
    margin: 10px 0 20px 0;
    font-size: 1.25rem;
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
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  /* --- Botão "Discover" --- */
  .cmp-assets_button-container {
    appearance: none;
    background-color: #2f80ed;
    border-radius: 10px;
    border-style: none;
    color: #fff !important; /* !important para garantir sobre regras de links globais */
    cursor: pointer;
    display: inline-block;
    font-family: Inter, -apple-system, system-ui, sans-serif;
    font-size: 15px;
    font-weight: 500;
    height: 50px;
    line-height: 1.5;
    padding: 14px 30px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    white-space: nowrap;
    margin-top: 1.5rem; /* Reduzido para caber melhor no mobile */
  }

  .cmp-assets_button-container:hover {
    background-color: #1366d6;
    box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px, rgba(0, 0, 0, 0.05) 0 1px 4px;
    transform: translateY(-2px); /* Efeito mais visível */
  }

  .cmp-assets_button-container:focus-visible {
    outline: 3px solid #6aa1f5;
    outline-offset: 2px;
  }

  /* --- Indicadores (Bolinhas) --- */
  .cmp-assets__indicators {
    position: absolute;
    bottom: 1.5rem; /* Subiu um pouco para não bater na borda da tela */
    left: 50%;
    transform: translateX(-50%);
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
    width: 12px; /* Ligeiramente maior para facilitar toque no mobile */
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff; /* Adicionado contraste */
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 0;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .cmp-assets__indicator button:hover {
    transform: scale(1.1);
  }

  .cmp-assets__indicator.is-active button,
  .cmp-assets__indicator button[aria-current='true'] {
    background-color: #fff;
    width: 14px; /* Destaque visual */
    height: 14px;
  }

  /* --- Responsividade --- */
  @media (max-width: 991px) {
    .cmp-assets__item {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    .cmp-assets__image-wrapper {
      height: 300px; /* Altura menor no mobile portrait */
    }

    .cmp-assets__image-text {
      font-size: 1.5rem; /* Fonte menor */
    }

    .carousel-container {
      gap: 10px;
    }
  }
`;