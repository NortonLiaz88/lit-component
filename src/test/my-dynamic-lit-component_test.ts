import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../my-dynamic-lit-component.js';
import { MyDynamicLitComponent } from '../my-dynamic-lit-component.js';

describe('MyDynamicLitComponent (with Fake Timers)', () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('renders mocked data instantly using fake timers', async () => {
    const el = await fixture<MyDynamicLitComponent>(html`
      <my-dynamic-lit-component wp-app-parameter-id="999"></my-dynamic-lit-component>
    `);
    
    clock.tick(800);
    
    await el.updateComplete; 

    const heading = el.shadowRoot!.querySelector('h2');
    expect(heading).to.exist;
    expect(heading!.textContent).to.include('Successfully Injected via AEM!');
    expect(el.shadowRoot!.textContent).to.include('ID: 999');
  });
});