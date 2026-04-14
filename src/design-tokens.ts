import { css, unsafeCSS } from 'lit';

// ─────────────────────────────────────────────────────────────────────────────
// Font loading — Material / Google Fonts CDN
// Injected into <head> once on first import (browser-only, SSR-safe).
// ─────────────────────────────────────────────────────────────────────────────

const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Roboto+Mono:wght@400;500&display=swap';

export function loadMaterialFonts(): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`link[href="${GOOGLE_FONTS_HREF}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = GOOGLE_FONTS_HREF;
  document.head.appendChild(link);
}

// Auto-load when this module is imported in a browser context
loadMaterialFonts();

// ─────────────────────────────────────────────────────────────────────────────
// Primitive color scales
// Raw values — use semantic tokens in components, not these directly.
// ─────────────────────────────────────────────────────────────────────────────

export const primitiveColors = {
  // White / Black
  white: '#ffffff',
  black: '#000000',

  // Blue scale
  blue200: '#91baf8',
  blue300: '#6aa1f5',
  blue400: '#1ea7fd',
  blue500: '#1eb3f7',
  blue600: '#2f80ed',
  blue700: '#1366d6',
  blue800: '#555ab9',

  // Gray scale
  gray100: '#f5f5f5',
  gray150: '#f4f4f4',
  gray200: '#d4dad9',
  gray300: '#cccccc',
  gray400: '#9aa0a6',
  gray500: '#999999',
  gray600: '#666666',
  gray700: '#333333',
  gray800: '#252525',
  gray850: '#2a2e33',
  gray900: '#212429',

  // Teal / Slate (interactive surfaces)
  teal600: '#3f5263',
  teal700: '#4f667a',

  // Red scale
  red400: '#f03e3e',
  red600: '#d32f2f',

  // Green scale
  green100: '#e7fdd8',
  green400: '#00c853',
  green600: '#357a14',

  // Overlays
  overlayDarkXs:  'rgba(0, 0, 0, 0.05)',
  overlayDarkSm:  'rgba(0, 0, 0, 0.10)',
  overlayDarkMd:  'rgba(0, 0, 0, 0.15)',
  overlayDarkLg:  'rgba(0, 0, 0, 0.20)',
  overlayDarkXl:  'rgba(0, 0, 0, 0.50)',
  overlayLightMd: 'rgba(255, 255, 255, 0.50)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Semantic color tokens
// Named by intent, aliased to primitives.
// ─────────────────────────────────────────────────────────────────────────────

export const colorTokens = {
  // --- Brand ---
  colorBrandPrimary:   primitiveColors.blue500,
  colorBrandSecondary: primitiveColors.blue600,
  colorBrandAccent:    primitiveColors.blue800,

  // --- Backgrounds ---
  colorBgBase:    primitiveColors.gray900,
  colorBgSurface: primitiveColors.gray850,
  colorBgLight:   primitiveColors.gray200,
  colorBgSubtle:  primitiveColors.gray100,
  colorBgFaint:   primitiveColors.gray150,

  // --- Interactive elements ---
  colorInteractiveDefault:   primitiveColors.teal600,
  colorInteractiveHover:     primitiveColors.teal700,
  colorInteractiveFocus:     primitiveColors.blue300,
  colorInteractiveHoverDark: primitiveColors.blue700,

  // --- Text ---
  colorTextPrimary:   primitiveColors.white,
  colorTextSecondary: primitiveColors.gray400,
  colorTextMuted:     primitiveColors.gray600,
  colorTextDark:      primitiveColors.gray800,
  colorTextSubtle:    primitiveColors.gray700,

  // --- Borders ---
  colorBorderDefault: primitiveColors.gray300,
  colorBorderMuted:   primitiveColors.overlayDarkSm,

  // --- Status ---
  colorStatusSuccess:     primitiveColors.green400,
  colorStatusSuccessBg:   primitiveColors.green100,
  colorStatusSuccessText: primitiveColors.green600,
  colorStatusDanger:      primitiveColors.red400,
  colorStatusError:       primitiveColors.red600,

  // --- Shadows / Overlays ---
  colorShadowXs:     primitiveColors.overlayDarkXs,
  colorShadowSm:     primitiveColors.overlayDarkSm,
  colorShadowMd:     primitiveColors.overlayDarkMd,
  colorShadowLg:     primitiveColors.overlayDarkLg,
  colorShadowXl:     primitiveColors.overlayDarkXl,
  colorOverlayLight: primitiveColors.overlayLightMd,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Spacing scale
// Base: 16px = 1rem. All values are multiples of 2px, from 2px to 42px.
// ─────────────────────────────────────────────────────────────────────────────

export const primitiveSpacing = {
  space2:  '0.125rem',  //  2px
  space4:  '0.25rem',   //  4px
  space6:  '0.375rem',  //  6px
  space8:  '0.5rem',    //  8px
  space10: '0.625rem',  // 10px
  space12: '0.75rem',   // 12px
  space14: '0.875rem',  // 14px
  space16: '1rem',      // 16px
  space18: '1.125rem',  // 18px
  space20: '1.25rem',   // 20px
  space22: '1.375rem',  // 22px
  space24: '1.5rem',    // 24px
  space26: '1.625rem',  // 26px
  space28: '1.75rem',   // 28px
  space30: '1.875rem',  // 30px
  space32: '2rem',      // 32px
  space34: '2.125rem',  // 34px
  space36: '2.25rem',   // 36px
  space38: '2.375rem',  // 38px
  space40: '2.5rem',    // 40px
  space42: '2.625rem',  // 42px
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Typography scale
// Font families loaded from Google Fonts (Material / Roboto).
// Type scale aligned with Material Design 3.
// ─────────────────────────────────────────────────────────────────────────────

export const primitiveTypography = {
  // Families
  fontFamilyBase: "'Roboto', sans-serif",
  fontFamilyMono: "'Roboto Mono', monospace",

  // Weights
  fontWeightLight:   '300',
  fontWeightRegular: '400',
  fontWeightMedium:  '500',
  fontWeightBold:    '700',

  // Sizes (Material Design 3 type scale, converted to rem @ 16px base)
  fontSizeXs:   '0.6875rem',  // 11px — Label Small
  fontSizeSm:   '0.75rem',    // 12px — Label Medium
  fontSizeMd:   '0.875rem',   // 14px — Body Medium / Label Large
  fontSizeBase: '1rem',       // 16px — Body Large / Title Medium
  fontSizeLg:   '1.125rem',   // 18px — (between Title Medium and Title Large)
  fontSizeXl:   '1.25rem',    // 20px — Title Large (approx.)
  fontSize2xl:  '1.375rem',   // 22px — Title Large
  fontSize3xl:  '1.5rem',     // 24px — Headline Small
  fontSize4xl:  '2rem',       // 32px — Headline Large

  // Line heights
  lineHeightTight:   '1.2',
  lineHeightNormal:  '1.5',
  lineHeightRelaxed: '1.6',

  // Letter spacing
  letterSpacingTight:  '0.3px',
  letterSpacingNormal: '0.5px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CSS custom properties
// Include `tokenStyles` first in any component's static styles array.
// All tokens are then available via var(--token-name).
// ─────────────────────────────────────────────────────────────────────────────

const u = (value: string) => unsafeCSS(value);

export const tokenStyles = css`
  :host {
    /* --- Colors: Brand --- */
    --color-brand-primary:   ${u(primitiveColors.blue500)};
    --color-brand-secondary: ${u(primitiveColors.blue600)};
    --color-brand-accent:    ${u(primitiveColors.blue800)};

    /* --- Colors: Backgrounds --- */
    --color-bg-base:    ${u(primitiveColors.gray900)};
    --color-bg-surface: ${u(primitiveColors.gray850)};
    --color-bg-light:   ${u(primitiveColors.gray200)};
    --color-bg-subtle:  ${u(primitiveColors.gray100)};
    --color-bg-faint:   ${u(primitiveColors.gray150)};

    /* --- Colors: Interactive --- */
    --color-interactive-default:    ${u(primitiveColors.teal600)};
    --color-interactive-hover:      ${u(primitiveColors.teal700)};
    --color-interactive-focus:      ${u(primitiveColors.blue300)};
    --color-interactive-hover-dark: ${u(primitiveColors.blue700)};

    /* --- Colors: Text --- */
    --color-text-primary:   ${u(primitiveColors.white)};
    --color-text-secondary: ${u(primitiveColors.gray400)};
    --color-text-muted:     ${u(primitiveColors.gray600)};
    --color-text-dark:      ${u(primitiveColors.gray800)};
    --color-text-subtle:    ${u(primitiveColors.gray700)};

    /* --- Colors: Borders --- */
    --color-border-default: ${u(primitiveColors.gray300)};
    --color-border-muted:   ${u(primitiveColors.overlayDarkSm)};

    /* --- Colors: Status --- */
    --color-status-success:      ${u(primitiveColors.green400)};
    --color-status-success-bg:   ${u(primitiveColors.green100)};
    --color-status-success-text: ${u(primitiveColors.green600)};
    --color-status-danger:       ${u(primitiveColors.red400)};
    --color-status-error:        ${u(primitiveColors.red600)};

    /* --- Colors: Shadows --- */
    --color-shadow-xs:     ${u(primitiveColors.overlayDarkXs)};
    --color-shadow-sm:     ${u(primitiveColors.overlayDarkSm)};
    --color-shadow-md:     ${u(primitiveColors.overlayDarkMd)};
    --color-shadow-lg:     ${u(primitiveColors.overlayDarkLg)};
    --color-shadow-xl:     ${u(primitiveColors.overlayDarkXl)};
    --color-overlay-light: ${u(primitiveColors.overlayLightMd)};

    /* --- Spacing (2px–42px in rem, multiples of 2) --- */
    --space-2:  ${u(primitiveSpacing.space2)};
    --space-4:  ${u(primitiveSpacing.space4)};
    --space-6:  ${u(primitiveSpacing.space6)};
    --space-8:  ${u(primitiveSpacing.space8)};
    --space-10: ${u(primitiveSpacing.space10)};
    --space-12: ${u(primitiveSpacing.space12)};
    --space-14: ${u(primitiveSpacing.space14)};
    --space-16: ${u(primitiveSpacing.space16)};
    --space-18: ${u(primitiveSpacing.space18)};
    --space-20: ${u(primitiveSpacing.space20)};
    --space-22: ${u(primitiveSpacing.space22)};
    --space-24: ${u(primitiveSpacing.space24)};
    --space-26: ${u(primitiveSpacing.space26)};
    --space-28: ${u(primitiveSpacing.space28)};
    --space-30: ${u(primitiveSpacing.space30)};
    --space-32: ${u(primitiveSpacing.space32)};
    --space-34: ${u(primitiveSpacing.space34)};
    --space-36: ${u(primitiveSpacing.space36)};
    --space-38: ${u(primitiveSpacing.space38)};
    --space-40: ${u(primitiveSpacing.space40)};
    --space-42: ${u(primitiveSpacing.space42)};

    /* --- Typography: Families --- */
    --font-family-base: ${u(primitiveTypography.fontFamilyBase)};
    --font-family-mono: ${u(primitiveTypography.fontFamilyMono)};

    /* --- Typography: Weights --- */
    --font-weight-light:   ${u(primitiveTypography.fontWeightLight)};
    --font-weight-regular: ${u(primitiveTypography.fontWeightRegular)};
    --font-weight-medium:  ${u(primitiveTypography.fontWeightMedium)};
    --font-weight-bold:    ${u(primitiveTypography.fontWeightBold)};

    /* --- Typography: Sizes --- */
    --font-size-xs:   ${u(primitiveTypography.fontSizeXs)};
    --font-size-sm:   ${u(primitiveTypography.fontSizeSm)};
    --font-size-md:   ${u(primitiveTypography.fontSizeMd)};
    --font-size-base: ${u(primitiveTypography.fontSizeBase)};
    --font-size-lg:   ${u(primitiveTypography.fontSizeLg)};
    --font-size-xl:   ${u(primitiveTypography.fontSizeXl)};
    --font-size-2xl:  ${u(primitiveTypography.fontSize2xl)};
    --font-size-3xl:  ${u(primitiveTypography.fontSize3xl)};
    --font-size-4xl:  ${u(primitiveTypography.fontSize4xl)};

    /* --- Typography: Line heights --- */
    --line-height-tight:   ${u(primitiveTypography.lineHeightTight)};
    --line-height-normal:  ${u(primitiveTypography.lineHeightNormal)};
    --line-height-relaxed: ${u(primitiveTypography.lineHeightRelaxed)};

    /* --- Typography: Letter spacing --- */
    --letter-spacing-tight:  ${u(primitiveTypography.letterSpacingTight)};
    --letter-spacing-normal: ${u(primitiveTypography.letterSpacingNormal)};
  }
`;
