import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

interface ApiResponse {
  id: number; title?: string; body?: string; [key: string]: any;
}

// ⚠️ IMPORTANT: This tag name MUST match what you type in the AEM Dialog!
@customElement('my-dynamic-lit-component')
export class MyDynamicLitComponent extends LitElement {
  static override styles = css`
    :host { display: block; padding: 16px; border: 3px solid #00c853; background: #f4f4f4; }
    .error { color: #d32f2f; font-weight: bold; }
  `;

  @property({type: String, attribute: 'wp-app-parameter-id'})
  parameterId: string = '';

  @state() private data: ApiResponse | null = null;
  @state() private loading: boolean = true;
  @state() private error: string | null = null;

  override connectedCallback() {
    super.connectedCallback();
    void this.fetchData();
  }

  async fetchData() {
    if (!this.parameterId) {
      this.error = 'No Parameter ID provided.';
      this.loading = false;
      return;
    }

    try {
      // 1. Simulate network latency (800ms delay)
      await new Promise(resolve => setTimeout(resolve, 800));

      // 2. Optional: Test the error UI by passing "error" in the AEM dialog
      if (this.parameterId.toLowerCase() === 'error') {
        throw new Error('Simulated 500 Internal Server Error for testing');
      }

      // 3. Provide the mocked API response
      this.data = {
        id: Number(this.parameterId) || 0,
        title: `Mocked Title for AEM Injection (ID: ${this.parameterId})`,
        body: 'This data is simulated locally. No external network request was made.'
      };

    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  override render() {
    if (this.loading) return html`<div>Loading Mock Data...</div>`;
    if (this.error) return html`<div class="error">Error: ${this.error}</div>`;
    return html`
      <div>
        <h2>✅ Successfully Injected via AEM!</h2>
        <p><strong>ID:</strong> ${this.parameterId}</p>
        <p><strong>Title:</strong> ${this.data?.title}</p>
        <p><strong>Details:</strong> ${this.data?.body}</p>
      </div>
    `;
  }
}