"use client";

import createGlobe from "cobe";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef } from "react";

import { mandateRegions } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

const markerLocations: Record<string, [number, number]> = {
  armenia: [40.18, 44.51],
  "russia-cis": [55.0, 60.0],
  "usa-canada": [38.0, -97.0],
  sevres: [48.85, 7.0],
  "south-america": [-15.0, -58.0],
  "australia-asia": [23.0, 100.0],
  "middle-east": [25.0, 45.0],
  georgia: [42.2, 43.5],
  iran: [32.0, 53.0],
};

const markerLabelLayout: Record<
  string,
  {
    label: Record<Locale, string>;
    position?: "above" | "below";
    translate?: string;
    maxWidth?: string;
  }
> = {
  armenia: {
    label: {
      ru: "Армения",
      en: "Armenia",
      hy: "Հայաստան",
    },
    translate: "-50% -12px",
    maxWidth: "116px",
  },
  "russia-cis": {
    label: {
      ru: "РФ и СНГ",
      en: "Russia & CIS",
      hy: "ՌԴ և ԱՊՀ",
    },
    translate: "-50% -12px",
    maxWidth: "132px",
  },
  "usa-canada": {
    label: {
      ru: "США / Канада",
      en: "US / Canada",
      hy: "ԱՄՆ / Կանադա",
    },
    translate: "-50% -12px",
    maxWidth: "132px",
  },
  sevres: {
    label: {
      ru: "Севр",
      en: "Sevres",
      hy: "Սևր",
    },
    translate: "-50% -12px",
    maxWidth: "92px",
  },
  "south-america": {
    label: {
      ru: "Юж. Америка",
      en: "S. America",
      hy: "Հվ. Ամերիկա",
    },
    translate: "-50% -12px",
    maxWidth: "130px",
  },
  "australia-asia": {
    label: {
      ru: "Австр. / Азия",
      en: "Aus. / Asia",
      hy: "Ավստր. / Ասիա",
    },
    translate: "-50% -12px",
    maxWidth: "132px",
  },
  "middle-east": {
    label: {
      ru: "Бл. Восток",
      en: "M. East",
      hy: "Մերձ. Արևելք",
    },
    translate: "-108% -18px",
    maxWidth: "112px",
  },
  georgia: {
    label: {
      ru: "Грузия",
      en: "Georgia",
      hy: "Վրաստան",
    },
    translate: "10px -40px",
    maxWidth: "96px",
  },
  iran: {
    label: {
      ru: "Иран",
      en: "Iran",
      hy: "Իրան",
    },
    position: "below",
    translate: "-50% 12px",
    maxWidth: "88px",
  },
};

export function HeroCobeGlobe({ locale }: { locale: Locale }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const sizeRef = useRef(0);
  const phiRef = useRef(0.75);
  const pointerInteractingRef = useRef<number | null>(null);
  const pointerMovementRef = useRef(0);
  const pointerOffsetRef = useRef(0);

  const markers = useMemo(
    () =>
      mandateRegions.map((region) => ({
        id: region.id,
        label: markerLabelLayout[region.id]?.label[locale] ?? region.title[locale],
        location: markerLocations[region.id],
        size: 0.038 + region.seatsTotal / 3000,
        layout: markerLabelLayout[region.id],
      })),
    [locale],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) {
      return;
    }

    let width = 0;

    const onResize = () => {
      const nextWidth = wrapper.offsetWidth;
      if (!nextWidth || nextWidth === width) {
        return;
      }

      width = nextWidth;
      sizeRef.current = nextWidth;
      globeRef.current?.destroy();
      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width: nextWidth * 2,
        height: nextWidth * 2,
        phi: phiRef.current,
        theta: 0.28,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 22000,
        mapBrightness: 7,
        mapBaseBrightness: 0.05,
        baseColor: [0.97, 0.98, 0.97],
        markerColor: [0.09, 0.42, 0.3],
        glowColor: [0.96, 0.96, 0.92],
        markers: markers.map((marker) => ({
          id: marker.id,
          location: marker.location,
          size: marker.size,
        })),
        markerElevation: 0.018,
        scale: 0.92,
        opacity: 1,
      });
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(wrapper);
    onResize();

    let frameId = 0;
    const render = () => {
      if (pointerInteractingRef.current === null) {
        phiRef.current += 0.003;
      }

      if (globeRef.current && sizeRef.current) {
        globeRef.current.update({
          phi: phiRef.current + pointerMovementRef.current,
          width: sizeRef.current * 2,
          height: sizeRef.current * 2,
          markers: markers.map((marker) => ({
            id: marker.id,
            location: marker.location,
            size: marker.size,
          })),
        });
      }

      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, [markers]);

  const handlePointerDown = (pointerId: number, clientX: number) => {
    pointerInteractingRef.current = pointerId;
    pointerOffsetRef.current = clientX;
  };

  const handlePointerMove = (pointerId: number, clientX: number) => {
    if (pointerInteractingRef.current === pointerId) {
      const delta = clientX - pointerOffsetRef.current;
      pointerMovementRef.current = delta / 160;
    }
  };

  const handlePointerUp = (pointerId: number) => {
    if (pointerInteractingRef.current !== pointerId) {
      return;
    }

    if (pointerInteractingRef.current !== null) {
      phiRef.current += pointerMovementRef.current;
      pointerMovementRef.current = 0;
      pointerInteractingRef.current = null;
    }
  };

  return (
    <div className="relative rounded-[28px] border border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f5faf7_100%)] p-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,138,55,0.08),transparent_32%),radial-gradient(circle_at_70%_30%,rgba(23,107,77,0.08),transparent_28%)]" />
      <div
        ref={wrapperRef}
        className="relative mx-auto aspect-square w-full max-w-[520px] cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          handlePointerDown(event.pointerId, event.clientX);
        }}
        onPointerMove={(event) => handlePointerMove(event.pointerId, event.clientX)}
        onPointerUp={(event) => handlePointerUp(event.pointerId)}
        onPointerCancel={(event) => handlePointerUp(event.pointerId)}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ contain: "layout paint size" }}
        />

        {markers.map((marker) => (
          <div
            key={marker.id}
            className="pointer-events-none absolute z-10 rounded-2xl border border-[rgba(183,138,55,0.18)] bg-white/96 px-2.5 py-1.5 text-center shadow-sm transition-opacity duration-300"
            style={
              {
                positionAnchor: `--cobe-${marker.id}`,
                opacity: `var(--cobe-visible-${marker.id}, 0)`,
                bottom:
                  marker.layout?.position === "below" ? undefined : "anchor(top)",
                left: "anchor(center)",
                top:
                  marker.layout?.position === "below" ? "anchor(bottom)" : undefined,
                translate: marker.layout?.translate ?? "-50% -10px",
                maxWidth: marker.layout?.maxWidth ?? "132px",
              } as CSSProperties
            }
          >
            <div className="text-[11px] font-semibold leading-none text-[var(--color-graphite)]">
              {marker.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
