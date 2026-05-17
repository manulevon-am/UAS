declare module "jsvectormap" {
  export type JsVectorMapMarker = {
    name?: string;
    coords: [number, number];
  };

  export type JsVectorMapInstance = {
    updateSize: () => void;
    destroy: () => void;
    getMarkerPosition: (marker: JsVectorMapMarker) => { x: number; y: number } | false;
  };

  export type JsVectorMapOptions = {
    selector: HTMLElement;
    map: string;
    backgroundColor?: string;
    draggable?: boolean;
    zoomButtons?: boolean;
    zoomOnScroll?: boolean;
    markers?: JsVectorMapMarker[];
    markerStyle?: {
      initial?: Record<string, string | number>;
      hover?: Record<string, string | number>;
      selected?: Record<string, string | number>;
      selectedHover?: Record<string, string | number>;
    };
    regionStyle?: {
      initial?: Record<string, string | number>;
      hover?: Record<string, string | number>;
      selected?: Record<string, string | number>;
      selectedHover?: Record<string, string | number>;
    };
    onMarkerClick?: (event: MouseEvent, index: string) => void;
  };

  export default class jsVectorMap implements JsVectorMapInstance {
    constructor(options: JsVectorMapOptions);
    updateSize(): void;
    destroy(): void;
    getMarkerPosition(marker: JsVectorMapMarker): { x: number; y: number } | false;
  }
}

declare module "jsvectormap/dist/maps/world.js";
