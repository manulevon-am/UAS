"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldLand from "world-atlas/land-110m.json";
import type { JsVectorMapInstance } from "jsvectormap";

import { Card } from "@/components/ui/card";
import { getMandateOverview, mandateRegions } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 560;

const landFeature = feature(worldLand as never, worldLand.objects.land as never);
const projection = geoNaturalEarth1().fitExtent(
  [
    [32, 30],
    [MAP_WIDTH - 32, MAP_HEIGHT - 30],
  ],
  landFeature as never,
);
const pathGenerator = geoPath(projection);
const landPath = pathGenerator(landFeature as never) ?? "";
const graticulePath = pathGenerator(geoGraticule10()) ?? "";

const regionCoordinates: Record<string, [number, number]> = {
  armenia: [40.18, 44.51],
  "russia-cis": [55.75, 37.62],
  "usa-canada": [40.0, -98.0],
  sevres: [48.85, 2.35],
  "south-america": [-15.0, -58.0],
  "australia-asia": [-25.0, 134.0],
  "middle-east": [34.0, 38.0],
  georgia: [41.72, 44.79],
  iran: [35.7, 51.42],
};

type CalloutPosition = Record<string, { x: number; y: number }>;

function projectMarker(coords: [number, number]) {
  const [lat, lon] = coords;
  const projected = projection([lon, lat]);
  if (!projected) {
    return null;
  }

  return { x: projected[0], y: projected[1] };
}

export function MandateMap({
  locale,
  className,
  compact = false,
}: {
  locale: Locale;
  className?: string;
  compact?: boolean;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [calloutPositions, setCalloutPositions] = useState<CalloutPosition>({});
  const [mapHeight, setMapHeight] = useState(520);
  const [mapWidth, setMapWidth] = useState(1040);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<JsVectorMapInstance | null>(null);
  const totals = getMandateOverview(mandateRegions);

  const markers = useMemo(
    () =>
      mandateRegions.map((region) => ({
        id: region.id,
        title: region.title[locale],
        seatsTotal: region.seatsTotal,
        coords: regionCoordinates[region.id],
      })),
    [locale],
  );

  const selectedMarker = useMemo(
    () => markers.find((marker) => marker.id === selectedMarkerId) ?? null,
    [markers, selectedMarkerId],
  );
  const mobileSelectedMarker = selectedMarker ?? markers[0] ?? null;
  const selectedPoint = selectedMarkerId ? calloutPositions[selectedMarkerId] : undefined;
  const popupPosition = useMemo(() => {
    if (!selectedMarker || !selectedPoint) {
      return null;
    }

    const width = 188;
    const height = 72;
    const left = Math.max(12, Math.min(mapWidth - width - 12, selectedPoint.x - width / 2));
    const prefersBelow = selectedPoint.y < 84;
    const top = prefersBelow
      ? Math.min(mapHeight - height - 12, selectedPoint.y + 18)
      : Math.max(12, selectedPoint.y - height - 18);

    return { left, top, width, height, prefersBelow };
  }, [mapHeight, mapWidth, selectedMarker, selectedPoint]);

  useEffect(() => {
    if (compact || typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const legacyMediaQuery = mediaQuery as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };
    const syncDesktopMode = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncDesktopMode();
    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", syncDesktopMode);
    } else if (legacyMediaQuery.addListener) {
      legacyMediaQuery.addListener(syncDesktopMode);
    }

    return () => {
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", syncDesktopMode);
      } else if (legacyMediaQuery.removeListener) {
        legacyMediaQuery.removeListener(syncDesktopMode);
      }
    };
  }, [compact]);

  useEffect(() => {
    if (compact || !isDesktop || !mapWrapperRef.current) {
      return;
    }

    const wrapper = mapWrapperRef.current;

    const updateHeightFromWidth = (width: number) => {
      setMapWidth((current) => (current === width ? current : width));
      const nextHeight = Math.max(320, Math.min(560, Math.round(width * 0.54)));
      setMapHeight((current) => (current === nextHeight ? current : nextHeight));
    };

    updateHeightFromWidth(wrapper.offsetWidth);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const nextWidth =
        "contentBoxSize" in entry && entry.contentRect ? entry.contentRect.width : wrapper.offsetWidth;

      updateHeightFromWidth(nextWidth);
    });

    resizeObserver.observe(wrapper);

    return () => {
      resizeObserver.disconnect();
    };
  }, [compact, isDesktop]);

  useEffect(() => {
    if (compact || !isDesktop) {
      return;
    }

    let disposed = false;

    const syncCalloutPositions = () => {
      const map = mapRef.current;
      if (!map) {
        return;
      }

      const nextPositions: CalloutPosition = {};
      for (const marker of markers) {
        const point = map.getMarkerPosition({ coords: marker.coords });
        if (!point) {
          continue;
        }
        nextPositions[marker.id] = { x: point.x, y: point.y };
      }
      setCalloutPositions(nextPositions);
    };

    const initMap = async () => {
      if (!mapContainerRef.current) {
        return;
      }

      const { default: JsVectorMap } = await import("jsvectormap");
      (window as typeof window & { jsVectorMap?: unknown }).jsVectorMap = JsVectorMap;
      await import("jsvectormap/dist/maps/world.js");

      if (disposed || !mapContainerRef.current) {
        return;
      }

      mapRef.current?.destroy();
      mapRef.current = new JsVectorMap({
        selector: mapContainerRef.current,
        map: "world",
        backgroundColor: "transparent",
        draggable: false,
        zoomButtons: false,
        zoomOnScroll: false,
        markers: markers.map((marker) => ({
          name: marker.id,
          coords: marker.coords,
        })),
        markerStyle: {
          initial: {
            r: 6,
            fill: "var(--color-green)",
            fillOpacity: 1,
            stroke: "#ffffff",
            strokeWidth: 4,
            strokeOpacity: 0.95,
          },
          hover: {
            fill: "var(--color-gold)",
            cursor: "pointer",
          },
        },
        regionStyle: {
          initial: {
            fill: "#dde3e7",
            fillOpacity: 1,
            stroke: "#ffffff",
            strokeWidth: 0.8,
          },
          hover: {
            fill: "#cfdbd4",
            fillOpacity: 1,
          },
        },
        onMarkerClick: (_event, index) => {
          const marker = markers[Number(index)];
          if (marker) {
            setSelectedMarkerId(marker.id);
          }
        },
      });

      window.requestAnimationFrame(syncCalloutPositions);

      if (!disposed) {
        window.setTimeout(() => {
          mapRef.current?.updateSize();
          window.requestAnimationFrame(syncCalloutPositions);
        }, 0);
      }
    };

    void initMap();

    return () => {
      disposed = true;
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [compact, isDesktop, markers]);

  useEffect(() => {
    if (compact || !isDesktop || !mapRef.current) {
      return;
    }

    const syncAfterResize = window.requestAnimationFrame(() => {
      mapRef.current?.updateSize();

      const nextPositions: CalloutPosition = {};
      for (const marker of markers) {
        const point = mapRef.current?.getMarkerPosition({ coords: marker.coords });
        if (!point) {
          continue;
        }
        nextPositions[marker.id] = { x: point.x, y: point.y };
      }
      setCalloutPositions(nextPositions);
    });

    return () => {
      window.cancelAnimationFrame(syncAfterResize);
    };
  }, [compact, isDesktop, mapHeight, markers]);

  if (compact) {
    return (
      <Card className={cn("overflow-hidden p-0", className)}>
        <div className="border-b border-[var(--color-border)] px-5 py-4">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
            {locale === "ru" ? "Мини-карта мандатов" : locale === "en" ? "Mandate mini-map" : "Մանդատների մինի քարտեզ"}
          </div>
          <div className="mt-2 text-lg font-semibold text-[var(--color-graphite)]">
            {locale === "ru"
              ? "9 региональных блоков"
              : locale === "en"
                ? "9 regional blocks"
                : "9 տարածաշրջանային բլոկ"}
          </div>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7faf8_100%)] p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,138,55,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(23,107,77,0.06),transparent_24%)]" />
          <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d={graticulePath} fill="none" stroke="rgba(31,41,55,0.06)" strokeWidth="1" />
            <path
              d={landPath}
              fill="rgba(215,221,226,0.66)"
              stroke="rgba(148,163,184,0.36)"
              strokeWidth="1"
            />
            {mandateRegions.map((region) => (
              <circle
                key={`compact-${region.id}`}
                cx={(region.marker.x / 100) * MAP_WIDTH}
                cy={(region.marker.y / 100) * MAP_HEIGHT}
                r="7"
                fill="var(--color-green)"
                opacity="0.92"
              />
            ))}
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-px border-t border-[var(--color-border)] bg-[var(--color-border)]">
          <div className="bg-white px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-graphite-soft)]">
              {locale === "ru" ? "Всего" : locale === "en" ? "Total" : "Ընդամենը"}
            </div>
            <div className="mt-1 text-xl font-semibold text-[var(--color-graphite)]">
              {totals.seatsTotal}
            </div>
          </div>
          <div className="bg-white px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-graphite-soft)]">
              {locale === "ru" ? "Избрано" : locale === "en" ? "Elected" : "Ընտրված"}
            </div>
            <div className="mt-1 text-xl font-semibold text-[var(--color-graphite)]">
              {totals.seatsOccupied}
            </div>
          </div>
          <div className="bg-white px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-graphite-soft)]">
              {locale === "ru" ? "Свободно" : locale === "en" ? "Free" : "Ազատ"}
            </div>
            <div className="mt-1 text-xl font-semibold text-[var(--color-green)]">
              {totals.seatsFree}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn("", className)}>
      {!isDesktop ? (
        <Card className="overflow-hidden p-0">
        <div className="border-b border-[var(--color-border)] px-5 py-4">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
            {locale === "ru" ? "Карта распределения" : locale === "en" ? "Distribution map" : "Բաշխման քարտեզ"}
          </div>
          <div className="mt-2 text-lg font-semibold text-[var(--color-graphite)]">
            {locale === "ru"
              ? "Выберите регион ниже"
              : locale === "en"
                ? "Choose a region below"
                : "Ընտրեք տարածաշրջանը"}
          </div>
        </div>

        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f6faf7_100%)] p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,138,55,0.10),transparent_28%),radial-gradient(circle_at_20%_90%,rgba(23,107,77,0.08),transparent_30%)]" />
          <div className="relative z-10 mb-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/84 px-3 py-3 text-center">
              <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-graphite-soft)]">
                {locale === "ru" ? "Всего" : locale === "en" ? "Total" : "Ընդամենը"}
              </div>
              <div className="mt-1 text-lg font-semibold text-[var(--color-graphite)]">
                {totals.seatsTotal}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/84 px-3 py-3 text-center">
              <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-graphite-soft)]">
                {locale === "ru" ? "Избрано" : locale === "en" ? "Elected" : "Ընտրված"}
              </div>
              <div className="mt-1 text-lg font-semibold text-[var(--color-graphite)]">
                {totals.seatsOccupied}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/84 px-3 py-3 text-center">
              <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-graphite-soft)]">
                {locale === "ru" ? "Свободно" : locale === "en" ? "Free" : "Ազատ"}
              </div>
              <div className="mt-1 text-lg font-semibold text-[var(--color-green)]">
                {totals.seatsFree}
              </div>
            </div>
          </div>
          <div className="relative z-10 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white/72">
            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="h-auto w-full" aria-hidden="true">
              <path d={graticulePath} fill="none" stroke="rgba(31,41,55,0.06)" strokeWidth="1" />
              <path
                d={landPath}
                fill="rgba(215,221,226,0.66)"
                stroke="rgba(148,163,184,0.36)"
                strokeWidth="1"
              />
              {markers.map((marker) => {
                const point = projectMarker(marker.coords);
                if (!point) {
                  return null;
                }

                const active = mobileSelectedMarker?.id === marker.id;

                return (
                  <g key={`mobile-map-${marker.id}`}>
                    {active ? (
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="18"
                        fill="rgba(142,106,42,0.14)"
                      />
                    ) : null}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={active ? 8 : 6}
                      fill={active ? "rgba(142,106,42,0.96)" : "var(--color-green)"}
                      stroke="#ffffff"
                      strokeWidth="4"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

        </div>
      </Card>
      ) : null}

      {isDesktop ? (
        <Card className="overflow-hidden p-0">
        <div className="border-b border-[var(--color-border)] px-5 py-4">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
            {locale === "ru" ? "Карта распределения" : locale === "en" ? "Distribution map" : "Բաշխման քարտեզ"}
          </div>
          <div className="mt-2 text-lg font-semibold text-[var(--color-graphite)]">
            {locale === "ru"
              ? "Нажмите на точку региона"
              : locale === "en"
                ? "Select a regional marker"
                : "Ընտրեք տարածաշրջանի կետը"}
          </div>
        </div>

        <div className="relative bg-[linear-gradient(180deg,#ffffff_0%,#f6faf7_100%)] p-4 sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,138,55,0.10),transparent_28%),radial-gradient(circle_at_20%_90%,rgba(23,107,77,0.08),transparent_30%)]" />
          <div ref={mapWrapperRef} className="relative z-10 mx-auto w-full max-w-[1040px]">
            <div className="pointer-events-none absolute inset-0 opacity-50">
              <div className="container-grid h-full w-full rounded-[28px]" />
            </div>
            <div
              ref={mapContainerRef}
              className="uas-vector-map relative w-full rounded-[28px] border border-[var(--color-border)] bg-white/70"
              style={{ height: `${mapHeight}px` }}
            />

            {selectedPoint ? (
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <circle
                  cx={selectedPoint.x}
                  cy={selectedPoint.y}
                  r="8"
                  fill="rgba(142,106,42,0.96)"
                />
                <circle
                  cx={selectedPoint.x}
                  cy={selectedPoint.y}
                  r="18"
                  fill="rgba(142,106,42,0.14)"
                />
              </svg>
            ) : null}

            {selectedMarker && selectedPoint && popupPosition ? (
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="absolute rounded-[22px] border border-[rgba(142,106,42,0.26)] bg-[rgba(255,255,255,0.62)] px-4 py-3 text-left shadow-[0_14px_38px_rgba(15,23,42,0.10)] backdrop-blur-xl"
                  style={{
                    left: popupPosition.left,
                    top: popupPosition.top,
                    width: popupPosition.width,
                  }}
                >
                  <div className="text-[11px] font-semibold leading-4 text-[var(--color-graphite)]">
                    {selectedMarker.title}
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-graphite-soft)]">
                    {locale === "ru" ? "Мандаты" : locale === "en" ? "Mandates" : "Մանդատներ"}
                  </div>
                  <div className="mt-1 text-lg font-semibold leading-none text-[var(--color-gold)]">
                    {selectedMarker.seatsTotal}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        </Card>
      ) : null}
    </div>
  );
}
