import Image from "next/image";
import {
  BadgeCheck,
  Landmark,
  Network,
  ShieldCheck,
  Target,
  Users2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { homePageContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const governanceItems = {
  ru: [
    {
      title: "ЦИК",
      description: "Центральная координация процедур, отбора и внутренней организации.",
      icon: BadgeCheck,
    },
    {
      title: "501 сенатский мандат",
      description: "Представительная база UAS, распределённая по международным блокам.",
      icon: Landmark,
    },
    {
      title: "Совет старейшин",
      description: "Консультативное и стратегическое звено институциональной преемственности.",
      icon: ShieldCheck,
    },
    {
      title: "Структурные органы",
      description: "Комиссии, аналитические центры и рабочие направления Сената.",
      icon: Network,
    },
  ],
  en: [
    {
      title: "CEC",
      description: "Central coordination of procedures, selection, and internal organization.",
      icon: BadgeCheck,
    },
    {
      title: "501 Senate Mandates",
      description: "The representative base of UAS distributed across international blocks.",
      icon: Landmark,
    },
    {
      title: "Council of Elders",
      description: "Consultative and strategic continuity within the institutional framework.",
      icon: ShieldCheck,
    },
    {
      title: "Structural Bodies",
      description: "Commissions, analytical centers, and working directions of the Senate.",
      icon: Network,
    },
  ],
  hy: [
    {
      title: "ԿԸՀ",
      description: "Ընթացակարգերի, ընտրության և ներքին կազմակերպման կենտրոնական համակարգում։",
      icon: BadgeCheck,
    },
    {
      title: "501 սենատական մանդատ",
      description: "UAS-ի ներկայացուցչական բազան՝ բաշխված միջազգային բլոկներով։",
      icon: Landmark,
    },
    {
      title: "Ավագների խորհուրդ",
      description: "Ինստիտուցիոնալ շարունակականության խորհրդակցական և ռազմավարական օղակ։",
      icon: ShieldCheck,
    },
    {
      title: "Կառուցվածքային մարմիններ",
      description: "Հանձնաժողովներ, վերլուծական կենտրոններ և աշխատանքային ուղղություններ։",
      icon: Network,
    },
  ],
} as const;

const diagramText = {
  ru: {
    centerTitle: "United Armenian Senate",
  },
  en: {
    centerTitle: "United Armenian Senate",
  },
  hy: {
    centerTitle: "United Armenian Senate",
  },
} as const;

export function UasSystemDiagram({ locale }: { locale: Locale }) {
  const governance = governanceItems[locale];
  const tasks = homePageContent.tasks;
  const copy = diagramText[locale];

  return (
    <div className="space-y-6">
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] lg:gap-5">
        <div className="flex flex-col justify-between gap-3 py-3">
          {governance.map((item, index) => (
            <ConnectedCard key={item.title} side="left" accent={index < 2}>
              <item.icon className="h-5 w-5 text-[var(--color-gold)]" />
              <div className="mt-2 text-base font-semibold text-[var(--color-graphite)]">
                {item.title}
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[var(--color-graphite-soft)]">
                {item.description}
              </p>
            </ConnectedCard>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <div className="relative flex h-[240px] w-[220px] items-center justify-center">
            <div className="relative flex w-[170px] flex-col items-center rounded-[28px] border border-[rgba(142,106,42,0.22)] bg-white/92 px-5 py-5 text-center shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <Image
                src="/uas.avif"
                alt="United Armenian Senate"
                width={52}
                height={52}
                className="h-13 w-13 object-contain"
                priority
              />
              <div className="mt-3 text-lg font-semibold leading-6 tracking-tight text-[var(--color-graphite)]">
                {copy.centerTitle}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 py-3">
          {tasks.map((task, index) => (
            <ConnectedCard key={task.title.ru} side="right" accent={index < 2}>
              <Target className="h-5 w-5 text-[var(--color-green)]" />
              <div className="mt-2 text-base font-semibold text-[var(--color-graphite)]">
                {task.title[locale]}
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[var(--color-graphite-soft)]">
                {task.description[locale]}
              </p>
            </ConnectedCard>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        <Card>
          <div className="flex items-center gap-4">
            <Image
              src="/uas.avif"
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

        <div className="grid gap-3">
          {governance.map((item) => (
            <Card key={item.title}>
              <item.icon className="h-5 w-5 text-[var(--color-gold)]" />
              <div className="mt-2 text-base font-semibold text-[var(--color-graphite)]">
                {item.title}
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[var(--color-graphite-soft)]">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid gap-3">
          {tasks.map((task) => (
            <Card key={task.title.ru}>
              <Users2 className="h-5 w-5 text-[var(--color-green)]" />
              <div className="mt-2 text-base font-semibold text-[var(--color-graphite)]">
                {task.title[locale]}
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[var(--color-graphite-soft)]">
                {task.description[locale]}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConnectedCard({
  side,
  accent = false,
  children,
}: {
  side: "left" | "right";
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative", side === "left" ? "pr-14" : "pl-14")}>
      <div
        className={cn(
          "absolute top-1/2 h-px -translate-y-1/2",
          side === "left"
            ? "right-0 bg-[linear-gradient(90deg,rgba(142,106,42,0.42),rgba(142,106,42,0.08))]"
            : "left-0 bg-[linear-gradient(90deg,rgba(23,107,77,0.08),rgba(23,107,77,0.42))]",
          accent ? "w-12" : "w-10",
        )}
      />
      <div
        className={cn(
          "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full",
          side === "left" ? "right-10 bg-[var(--color-gold)]" : "left-10 bg-[var(--color-green)]",
        )}
      />
      <Card className={cn("py-4", accent ? "border-[rgba(142,106,42,0.22)]" : undefined)}>
        {children}
      </Card>
    </div>
  );
}
