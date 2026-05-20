"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";

const partners = [
  {
    name: "Pan Senate 2",
    logo: "/partners/PAN-SENATE-2.png",
  },
  {
    name: "Pan Senate 3",
    logo: "/partners/PAN-SENATE-3.png",
  },
  {
    name: "Pan Senate 4",
    logo: "/partners/PAN-SENATE-4.png",
  },
  {
    name: "Pan Senate 5",
    logo: "/partners/PAN-SENATE-5.png",
  },
  {
    name: "Pan Senate 6",
    logo: "/partners/PAN-SENATE-6.png",
  },
];

export function PartnersCarousel({ locale }: { locale: Locale }) {
  const sequenceRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const widthRef = useRef(1);
  const draggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const [offset, setOffset] = useState(0);

  const setTrackOffset = useCallback((nextOffset: number) => {
    const width = widthRef.current || 1;
    const normalized = ((nextOffset % width) + width) % width;

    offsetRef.current = normalized;
    setOffset(normalized);
  }, []);

  useEffect(() => {
    const measure = () => {
      widthRef.current = sequenceRef.current?.scrollWidth || 1;
    };

    measure();
    window.addEventListener("resize", measure);

    let frame = 0;
    let previousTime = performance.now();

    const tick = (time: number) => {
      const delta = time - previousTime;
      previousTime = time;

      if (!draggingRef.current) {
        setTrackOffset(offsetRef.current + delta * 0.035);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [setTrackOffset]);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--color-graphite)]">
          {locale === "ru" ? "Партнёры" : locale === "en" ? "Partners" : "Գործընկերներ"}
        </h2>
      </div>

      <div
        className="relative overflow-hidden border-y border-[var(--color-border)] bg-white py-5"
        onPointerDown={(event) => {
          draggingRef.current = true;
          lastPointerXRef.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!draggingRef.current) {
            return;
          }

          const delta = event.clientX - lastPointerXRef.current;
          lastPointerXRef.current = event.clientX;
          setTrackOffset(offsetRef.current - delta);
        }}
        onPointerUp={(event) => {
          draggingRef.current = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
        style={{ touchAction: "pan-y" }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,#fff,rgba(255,255,255,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,#fff,rgba(255,255,255,0))]" />
        <div
          className="flex cursor-grab select-none active:cursor-grabbing"
          style={{ transform: `translate3d(${-offset}px,0,0)` }}
        >
          {[0, 1, 2].map((sequence) => (
            <div
              key={sequence}
              ref={sequence === 0 ? sequenceRef : undefined}
              className="flex shrink-0 items-center gap-5 pr-5"
            >
              {partners.map((partner) => (
                <div
                  key={`${sequence}-${partner.logo}`}
                  className="flex h-28 w-40 shrink-0 items-center justify-center rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:h-32 sm:w-48"
                >
                  <Image
                    src={withBasePath(partner.logo)}
                    alt={partner.name}
                    width={132}
                    height={132}
                    className="max-h-24 w-auto object-contain sm:max-h-28"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
