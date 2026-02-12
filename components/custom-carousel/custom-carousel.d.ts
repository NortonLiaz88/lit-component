import { LitElement } from 'lit';
interface CarouselAsset {
    display: string | boolean;
    fileReference: string;
    alt?: string;
    imageTitle?: string;
    description?: string;
    linkURL?: string;
}
export declare class CustomCarousel extends LitElement {
    /**
     * Array of assets coming from AEM (JSON).
     */
    assets: CarouselAsset[];
    /**
     * Current slide index.
     */
    private currentIndex;
    static styles: import("lit").CSSResult;
    private get visibleAssets();
    private get numAssets();
    private next;
    private prev;
    private goTo;
    private onKeydown;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=custom-carousel.d.ts.map