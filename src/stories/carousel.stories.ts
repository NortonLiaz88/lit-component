import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

// Import the actual component to register the custom element
import '../custom-carousel'; 

const meta: Meta = {
  title: 'AEM Components/Custom Carousel',
  component: 'custom-carousel',
  
  // Note the use of the `.` prefix (.assets=${...}) to pass rich JSON arrays to Lit properties
  render: (args) => html`
    <custom-carousel .assets=${args.assets}></custom-carousel>
  `,
  
  argTypes: {
    assets: { 
      control: 'object',
      description: 'An array of CarouselAsset objects representing the slides configured in AEM.',
    },
  },
};

export default meta;
type Story = StoryObj;

// ==========================================
// Visual Test Cases (Stories)
// ==========================================

export const FullyPopulated: Story = {
  args: {
    assets: [
      {
        display: true,
        fileReference: 'https://picsum.photos/id/1015/800/400',
        alt: 'Mountain landscape',
        imageTitle: 'Explore the Mountains',
        description: 'Discover breathtaking views and challenging trails.',
        linkURL: 'https://example.com/mountains'
      },
      {
        display: 'true', // Testing string boolean parsing
        fileReference: 'https://picsum.photos/id/1016/800/400',
        alt: 'Canyon',
        imageTitle: 'Deep Canyons',
        description: 'Navigate the complex geological formations.',
      },
      {
        display: false, // This slide should be filtered out by visibleAssets
        fileReference: 'https://picsum.photos/id/1018/800/400',
        imageTitle: 'Hidden Slide',
      }
    ]
  },
};

export const SingleSlide: Story = {
  args: {
    assets: [
      {
        display: true,
        fileReference: 'https://picsum.photos/id/1019/800/400',
        alt: 'Ocean view',
        imageTitle: 'Ocean Horizons',
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'When only one slide is present, the next/prev controls are hidden.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    assets: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays the placeholder text asking the author to configure the component.',
      },
    },
  },
};