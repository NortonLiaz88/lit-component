import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

// Import the actual component file to register the custom element with Vite/Storybook
import '../my-dynamic-lit-component'; 

const meta: Meta = {
  title: 'AEM Components/Dynamic Lit Component',
  component: 'my-dynamic-lit-component',
  
  render: (args) => html`
    <my-dynamic-lit-component 
      wp-app-parameter-id="${args.parameterId}">
    </my-dynamic-lit-component>
  `,
  
  argTypes: {
    parameterId: { 
      control: 'text',
      description: 'Simulates the ID authored by the content editor in the AEM Dialog',
    },
  },
};

export default meta;
type Story = StoryObj;

// ==========================================
// Visual Test Cases (Stories)
// ==========================================

export const SuccessState: Story = {
  args: {
    parameterId: '999', 
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulates a successful API fetch. Displays a loading state for 800ms before rendering the mock data.',
      },
    },
  },
};

export const SimulatedErrorState: Story = {
  args: {
    parameterId: 'error', 
  },
  parameters: {
    docs: {
      description: {
        story: 'Triggers the simulated 500 Internal Server Error logic by passing the string "error".',
      },
    },
  },
};

export const MissingParameterState: Story = {
  args: {
    parameterId: '', 
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays the fallback error UI when no parameter ID is authored in the AEM dialog.',
      },
    },
  },
};