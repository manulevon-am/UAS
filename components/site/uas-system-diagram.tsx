"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Landmark,
  Network,
  ShieldCheck,
  Target,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import { Card } from "@/components/ui/card";
import { homePageContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import { cn } from "@/lib/utils";

type DiagramPoint = {
  x: number;
  y: number;
};

type DiagramLayout = {
  width: number;
  height: number;
  leftHub: DiagramPoint;
  rightHub: DiagramPoint;
  leftPoints: DiagramPoint[];
  rightPoints: DiagramPoint[];
};

type DiagramCardItem = {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

const governanceItems = {
  ru: [
    {
      id: "cec",
      title: "ЦИК",
      description: "Центральная координация процедур, отбора и внутренней организации.",
      icon: BadgeCheck,
    },
    {
      id: "mandates",
      title: "501 сенатский мандат",
      description: "Представительная база UAS, распределённая по международным блокам.",
      icon: Landmark,
    },
    {
      id: "elders",
      title: "Совет старейшин",
      description: "Консультативное и стратегическое звено институциональной преемственности.",
      icon: ShieldCheck,
    },
    {
      id: "bodies",
      title: "Структурные органы",
      description: "Комиссии, аналитические центры и рабочие направления Сената.",
      icon: Network,
    },
  ],
  en: [
    {
      id: "cec",
      title: "CEC",
      description: "Central coordination of procedures, selection, and internal organization.",
      icon: BadgeCheck,
    },
    {
      id: "mandates",
      title: "501 Senate Mandates",
      description: "The representative base of UAS distributed across international blocks.",
      icon: Landmark,
    },
    {
      id: "elders",
      title: "Council of Elders",
      description: "Consultative and strategic continuity within the institutional framework.",
      icon: ShieldCheck,
    },
    {
      id: "bodies",
      title: "Structural Bodies",
      description: "Commissions, analytical centers, and working directions of the Senate.",
      icon: Network,
    },
  ],
  hy: [
    {
      id: "cec",
      title: "ԿԸՀ",
      description: "Ընթացակարգերի, ընտրության և ներքին կազմակերպման կենտրոնական համակարգում։",
      icon: BadgeCheck,
    },
    {
      id: "mandates",
      title: "501 սենատական մանդատ",
      description: "UAS-ի ներկայացուցչական բազան՝ բաշխված միջազգային բլոկներով։",
      icon: Landmark,
    },
    {
      id: "elders",
      title: "Ավագների խորհուրդ",
      description: "Ինստիտուցիոնալ շարունակականության խորհրդակցական և ռազմավարական օղակ։",
      icon: ShieldCheck,
    },
    {
      id: "bodies",
      title: "Կառուցվածքային մարմիններ",
      description: "Հանձնաժողովներ, վերլուծական կենտրոններ և աշխատանքային ուղղություններ։",
      icon: Network,
    },
  ],
} as const;

const diagramText = {
  ru: {
    centerTitle: "United Armenian Senate",
    organizationLabel: "Организационная структура",
    missionLabel: "Миссия и функции",
  },
  en: {
    centerTitle: "United Armenian Senate",
    organizationLabel: "Organizational Structure",
    missionLabel: "Mission and Functions",
  },
  hy: {
    centerTitle: "United Armenian Senate",
    organizationLabel: "Կառուցվածք",
    missionLabel: "Գործառույթներ",
  },
} as const;

const leftStroke = "rgba(142,106,42,0.58)";
const rightStroke = "rgba(23,107,77,0.58)";
const leftStrokeMuted = "rgba(142,106,42,0.24)";
const rightStrokeMuted = "rgba(23,107,77,0.24)";

export function UasSystemDiagram({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [layout, setLayout] = useState<DiagramLayout | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const leftCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rightCardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const governance = governanceItems[locale];
  const tasks = homePageContent.tasks.map((task, index) => ({
    id: `task-${index}`,
    title: task.title[locale],
    description: task.description[locale],
    icon: Target,
  }));
  const copy = diagramText[locale];

  const leftItems = useMemo<DiagramCardItem[]>(
    () =>
      governance.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon,
      })),
    [governance],
  );

  const rightItems = useMemo<DiagramCardItem[]>(
    () =>
      tasks.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon,
      })),
    [tasks],
  );

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const center = centerRef.current;
      if (!container || !center) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const centerRect = center.getBoundingClientRect();

      const leftPoints = leftCardRefs.current
        .map((node) => {
          if (!node) {
            return null;
          }
          const rect = node.getBoundingClientRect();
          return {
            x: rect.right - containerRect.left,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        })
        .filter(Boolean) as DiagramPoint[];

      const rightPoints = rightCardRefs.current
        .map((node) => {
          if (!node) {
            return null;
          }
          const rect = node.getBoundingClientRect();
          return {
            x: rect.left - containerRect.left,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        })
        .filter(Boolean) as DiagramPoint[];

      setLayout({
        width: containerRect.width,
        height: containerRect.height,
        leftHub: {
          x: centerRect.left - containerRect.left - 16,
          y: centerRect.top - containerRect.top + centerRect.height / 2,
        },
        rightHub: {
          x: centerRect.right - containerRect.left + 16,
          y: centerRect.top - containerRect.top + centerRect.height / 2,
        },
        leftPoints,
        rightPoints,
      });
    };

    let frame = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const observer = new ResizeObserver(() => {
      scheduleMeasure();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    if (centerRef.current) {
      observer.observe(centerRef.current);
    }
    leftCardRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });
    rightCardRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    window.addEventListener("resize", scheduleMeasure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [locale, leftItems.length, rightItems.length]);

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-[rgba(15,23,42,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,249,247,0.96))] px-5 py-5 shadow-[0_24px_64px_rgba(15,23,42,0.06)] sm:px-7 sm:py-7 lg:px-8 lg:py-8">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(183,138,55,0.08),transparent_26%),radial-gradient(circle_at_14%_18%,rgba(23,107,77,0.06),transparent_20%),radial-gradient(circle_at_85%_78%,rgba(23,107,77,0.04),transparent_18%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage: "radial-gradient(circle at center, black, transparent 90%)",
          }}
        />
      </div>

      <div ref={containerRef} className="relative hidden lg:grid lg:grid-cols-[minmax(0,1fr)_260px_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
        {layout ? (
          <motion.svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {leftItems.map((item, index) => {
              const point = layout.leftPoints[index];
              if (!point) {
                return null;
              }

              return (
                <motion.path
                  key={`left-path-${item.id}`}
                  d={buildCurvePath(point, layout.leftHub, "left")}
                  fill="none"
                  stroke={hoveredId === item.id ? leftStroke : leftStrokeMuted}
                  strokeWidth={hoveredId === item.id ? 2.2 : 1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.25 }}
                  animate={{
                    pathLength: 1,
                    opacity: hoveredId && hoveredId !== item.id ? 0.35 : 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.9,
                    ease: "easeOut",
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                  style={{
                    filter:
                      hoveredId === item.id
                        ? "drop-shadow(0 0 8px rgba(183,138,55,0.28))"
                        : undefined,
                  }}
                />
              );
            })}

            {rightItems.map((item, index) => {
              const point = layout.rightPoints[index];
              if (!point) {
                return null;
              }

              return (
                <motion.path
                  key={`right-path-${item.id}`}
                  d={buildCurvePath(point, layout.rightHub, "right")}
                  fill="none"
                  stroke={hoveredId === item.id ? rightStroke : rightStrokeMuted}
                  strokeWidth={hoveredId === item.id ? 2.2 : 1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.25 }}
                  animate={{
                    pathLength: 1,
                    opacity: hoveredId && hoveredId !== item.id ? 0.35 : 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.9,
                    ease: "easeOut",
                    delay: reduceMotion ? 0 : index * 0.08 + 0.12,
                  }}
                  style={{
                    filter:
                      hoveredId === item.id
                        ? "drop-shadow(0 0 8px rgba(23,107,77,0.22))"
                        : undefined,
                  }}
                />
              );
            })}
          </motion.svg>
        ) : null}

        {layout ? (
          <>
            <HubNode
              x={layout.leftHub.x}
              y={layout.leftHub.y}
              tone="left"
            />
            <HubNode
              x={layout.rightHub.x}
              y={layout.rightHub.y}
              tone="right"
            />
          </>
        ) : null}

        <div className="relative z-10 flex flex-col gap-5 py-4">
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
            {copy.organizationLabel}
          </div>
          {leftItems.map((item, index) => (
            <NetworkCard
              key={item.id}
              ref={(node) => {
                leftCardRefs.current[index] = node;
              }}
              side="left"
              accent={index < 2}
              isActive={hoveredId === item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
            >
              <div className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                <div className="min-w-0">
                  <div className="text-base font-semibold text-[var(--color-graphite)]">
                    {item.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--color-graphite-soft)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </NetworkCard>
          ))}
        </div>

        <div className="relative z-20 flex items-center justify-center">
          <motion.div
            ref={centerRef}
            initial={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.96 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="pointer-events-none absolute inset-[-28px] -z-10 bg-[radial-gradient(circle,rgba(183,138,55,0.12),transparent_62%)] blur-2xl" />
            <div className="flex w-[190px] flex-col items-center rounded-[32px] border border-[rgba(142,106,42,0.16)] bg-white/88 px-6 py-6 text-center shadow-[0_26px_60px_rgba(15,23,42,0.12)] backdrop-blur-md">
              <Image
                src={withBasePath("/uas.avif")}
                alt="United Armenian Senate"
                width={58}
                height={58}
                className="h-[58px] w-[58px] object-contain"
                priority
              />
              <div className="mt-4 text-lg font-semibold leading-6 tracking-tight text-[var(--color-graphite)]">
                {copy.centerTitle}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col gap-5 py-4">
          <div className="mb-1 text-right text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-green)]">
            {copy.missionLabel}
          </div>
          {rightItems.map((item, index) => (
            <NetworkCard
              key={item.id}
              ref={(node) => {
                rightCardRefs.current[index] = node;
              }}
              side="right"
              accent={index < 2}
              isActive={hoveredId === item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
            >
              <div className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-green)]" />
                <div className="min-w-0">
                  <div className="text-base font-semibold text-[var(--color-graphite)]">
                    {item.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--color-graphite-soft)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </NetworkCard>
          ))}
        </div>
      </div>

      <div className="relative z-10 grid gap-4 lg:hidden">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="rounded-[30px] border-[rgba(142,106,42,0.16)] bg-white/90 px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Image
                src={withBasePath("/uas.avif")}
                alt="United Armenian Senate"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
                priority
              />
              <div className="text-2xl font-semibold text-[var(--color-graphite)]">
                {copy.centerTitle}
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
            {copy.organizationLabel}
          </div>
          {leftItems.map((item, index) => (
            <MobileNetworkCard key={item.id} tone="left" delay={index * 0.05}>
              <div className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                <div className="min-w-0">
                  <div className="text-base font-semibold text-[var(--color-graphite)]">
                    {item.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--color-graphite-soft)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </MobileNetworkCard>
          ))}
        </div>

        <div className="grid gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-green)]">
            {copy.missionLabel}
          </div>
          {rightItems.map((item, index) => (
            <MobileNetworkCard key={item.id} tone="right" delay={index * 0.05}>
              <div className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-green)]" />
                <div className="min-w-0">
                  <div className="text-base font-semibold text-[var(--color-graphite)]">
                    {item.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--color-graphite-soft)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </MobileNetworkCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const NetworkCard = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children: ReactNode;
    side: "left" | "right";
    accent?: boolean;
    isActive?: boolean;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    onFocus?: FocusEventHandler<HTMLDivElement>;
    onBlur?: FocusEventHandler<HTMLDivElement>;
  }
>(function NetworkCard(
  {
    className,
    children,
    side,
    accent,
    isActive,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
  },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "relative",
        side === "left" ? "pr-5" : "pl-5",
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div
        className={cn(
          "absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.72)]",
          side === "left"
            ? "right-[-2px] bg-[var(--color-gold)]"
            : "left-[-2px] bg-[var(--color-green)]",
          isActive
            ? side === "left"
              ? "shadow-[0_0_0_10px_rgba(183,138,55,0.16)]"
              : "shadow-[0_0_0_10px_rgba(23,107,77,0.14)]"
            : undefined,
        )}
      />
      <Card
        className={cn(
          "rounded-[32px] border bg-white/72 px-6 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur-md transition-colors",
          accent ? "border-[rgba(142,106,42,0.14)]" : "border-[rgba(15,23,42,0.08)]",
          isActive ? "bg-white/92" : undefined,
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
});

function MobileNetworkCard({
  children,
  tone,
  delay,
}: {
  children: ReactNode;
  tone: "left" | "right";
  delay: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="relative pl-6"
    >
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-px",
          tone === "left" ? "bg-[rgba(142,106,42,0.26)]" : "bg-[rgba(23,107,77,0.24)]",
        )}
      />
      <div
        className={cn(
          "absolute left-[-5px] top-7 h-3 w-3 rounded-full border border-white",
          tone === "left" ? "bg-[var(--color-gold)]" : "bg-[var(--color-green)]",
        )}
      />
      <Card className="rounded-[28px] border-[rgba(15,23,42,0.08)] bg-white/86 px-5 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] backdrop-blur-sm">
        {children}
      </Card>
    </motion.div>
  );
}

function HubNode({
  x,
  y,
  tone,
}: {
  x: number;
  y: number;
  tone: "left" | "right";
}) {
  return (
    <div
      className="pointer-events-none absolute z-30"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <div
        className={cn(
          "h-3.5 w-3.5 rounded-full border border-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.72)]",
          tone === "left" ? "bg-[var(--color-gold)]" : "bg-[var(--color-green)]",
        )}
      />
    </div>
  );
}

function buildCurvePath(start: DiagramPoint, end: DiagramPoint, side: "left" | "right") {
  const distance = Math.abs(end.x - start.x);
  const handle = Math.max(36, distance * 0.38);

  if (side === "left") {
    return `M ${start.x} ${start.y} C ${start.x + handle} ${start.y}, ${end.x - handle} ${end.y}, ${end.x} ${end.y}`;
  }

  return `M ${start.x} ${start.y} C ${start.x - handle} ${start.y}, ${end.x + handle} ${end.y}, ${end.x} ${end.y}`;
}
