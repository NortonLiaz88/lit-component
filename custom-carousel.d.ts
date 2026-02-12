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
    assets: CarouselAsset[];
    static styles: import("lit").CSSResult[];
    private currentIndex;
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