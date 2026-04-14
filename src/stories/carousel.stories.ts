import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { CarouselAsset } from '../custom-carousel';

import '../custom-carousel';

const SAMPLE_SLIDES: CarouselAsset[] = [
  {
    display: true,
    fileReference: 'https://picsum.photos/id/1015/800/400',
    alt: 'Mountain landscape at sunset',
    imageTitle: 'Explore the Mountains',
    description: 'Discover breathtaking views and challenging trails in the Alps.',
    linkURL: 'https://example.com/mountains',
  },
  {
    display: true,
    fileReference: 'https://picsum.photos/id/1016/800/400',
    alt: 'Rocky canyon walls',
    imageTitle: 'Deep Canyons',
    description: 'Navigate the complex geological formations carved over millennia.',
  },
  {
    display: true,
    fileReference: 'https://picsum.photos/id/1018/800/400',
    alt: 'Forest path in autumn',
    imageTitle: 'Forest Trails',
    description: 'Lose yourself in the tranquillity of ancient woodland.',
    linkURL: 'https://example.com/forests',
  },
];

const meta: Meta = {
  title: 'AEM Components/Custom Carousel',
  component: 'custom-carousel',

  render: (args) => html`
    <custom-carousel
      .assets=${args.assets}
      label=${args.label ?? 'Image carousel'}
    ></custom-carousel>
  `,

  argTypes: {
    assets: {
      control: 'object',
      description:
        'Array of `CarouselAsset` objects. Each item represents one slide. ' +
        'Slides with `display: false` (or the string `"false"`) are filtered out before rendering.',
      table: { category: 'Properties', type: { summary: 'CarouselAsset[]' } },
    },
    label: {
      control: 'text',
      description:
        'Accessible name exposed to screen readers via `aria-label` on the carousel region. ' +
        'Defaults to `"Image carousel"`. Override to match the page context, e.g. `"Featured destinations"`.',
      table: { category: 'Properties', type: { summary: 'string' }, defaultValue: { summary: 'Image carousel' } },
    },
  },

  args: {
    label: 'Image carousel',
  },
};

export default meta;
type Story = StoryObj;

// ─────────────────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────────────────

/** Full carousel with three slides, titles, descriptions, and CTA links. */
export const Default: Story = {
  args: {
    assets: SAMPLE_SLIDES,
    label: 'Featured destinations',
  },
};

/**
 * When slides contain only an image and no `imageTitle` / `description`,
 * the overlay area is not rendered and the image fills the full slide height.
 */
export const ImageOnly: Story = {
  args: {
    assets: [
      { display: true, fileReference: 'https://picsum.photos/id/1015/800/400', alt: 'Mountain landscape' },
      { display: true, fileReference: 'https://picsum.photos/id/1016/800/400', alt: 'Rocky canyon' },
      { display: true, fileReference: 'https://picsum.photos/id/1019/800/400', alt: 'Ocean horizon' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Slides without `imageTitle` or `description` render as pure image slides. ' +
          'No overlay `<div>` is added to the DOM.',
      },
    },
  },
};

/**
 * Every slide carries a `linkURL`. The image itself becomes a link and a
 * "Discover" CTA button is rendered in the overlay.
 */
export const WithLinkedSlides: Story = {
  args: {
    assets: SAMPLE_SLIDES.map(s => ({ ...s, linkURL: 'https://example.com' })),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `linkURL` is present the image is wrapped in an `<a>` and a CTA button ' +
          'appears in the text overlay. Inactive slides have `tabindex="-1"` so they are ' +
          'skipped during keyboard navigation.',
      },
    },
  },
};

/**
 * The `display` field controls visibility. Slides with `display: false` or
 * the string `"false"` are stripped before rendering.
 */
export const WithHiddenSlides: Story = {
  args: {
    assets: [
      { display: true,  fileReference: 'https://picsum.photos/id/1015/800/400', alt: 'Visible slide 1', imageTitle: 'Visible 1' },
      { display: false, fileReference: 'https://picsum.photos/id/1016/800/400', alt: 'Hidden slide',    imageTitle: 'You should not see this' },
      { display: 'true', fileReference: 'https://picsum.photos/id/1018/800/400', alt: 'Visible slide 2', imageTitle: 'Visible 2 (string boolean)' },
      { display: 'false', fileReference: 'https://picsum.photos/id/1019/800/400', alt: 'Also hidden',    imageTitle: 'Also hidden (string false)' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates that `display: false` and `display: "false"` are both treated as hidden. ' +
          'Only 2 of the 4 configured slides should be visible.',
      },
    },
  },
};

/**
 * With a single visible slide the prev/next buttons and the dot indicators
 * are not rendered at all — there is nothing to navigate to.
 */
export const SingleSlide: Story = {
  args: {
    assets: [
      {
        display: true,
        fileReference: 'https://picsum.photos/id/1019/800/400',
        alt: 'Ocean view at dawn',
        imageTitle: 'Ocean Horizons',
        description: 'A single slide — navigation controls are omitted.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'When only one slide is visible, `renderNavigation()` returns `nothing`. ' +
          'No prev/next buttons or dot indicators are added to the DOM.',
      },
    },
  },
};

/**
 * When `assets` is empty (or all slides are hidden) the component shows a
 * placeholder prompting the content author to configure the dialog.
 */
export const EmptyState: Story = {
  args: {
    assets: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Renders the placeholder `<div>` instead of the carousel `<section>`. ' +
          'This is the expected state when no assets have been authored yet in AEM.',
      },
    },
  },
};
