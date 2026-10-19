import { useEffect, useRef } from "react";
import {
  Check,
  ChevronDown,
  CircleDot,
  Compass,
  Footprints,
  Lightbulb,
  RefreshCcw,
  ShoppingBasket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Profile } from "@/quiz/profiles";
import { dimensionLabels } from "@/quiz/profiles";
import type { Scores } from "@/quiz/scoring";
import type { Dimension } from "@/quiz/questions";
import { btnGhost, Eyebrow } from "./ui";

const BAR_DIMS: Dimension[] = ["D", "C", "R", "F", "O"];
const profileIcons: Record<Dimension, LucideIcon> = {
  D: Compass,
  C: ShoppingBasket,
  R: Lightbulb,
  F: RefreshCcw,
  O: Sparkles,
};

export function ProfileSummary({
  profile,
  factors,
  scores,
}: {
  profile: Profile;
  factors: string[];
  scores: Scores;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const max = Math.max(1, ...BAR_DIMS.map((d) => scores[d]));
  const ProfileIcon = profileIcons[profile.key];

  return (
    <section
      className="result-stage animate-step overflow-hidden px-4 pb-14 pt-5 sm:px-5 sm:pb-20 sm:pt-10"
      aria-live="polite"
    >
      <div className="mx-auto max-w-[820px]">
        <div className="result-hero relative overflow-hidden rounded-[1.75rem] bg-primary px-5 pb-7 pt-5 text-primary-foreground shadow-card sm:px-9 sm:pb-9 sm:pt-7">
          <div className="result-orb -right-16 -top-20" aria-hidden />
          <div className="result-orb -bottom-24 -left-20 opacity-50" aria-hidden />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <Eyebrow className="bg-primary-foreground/12 text-highlight">
                <Sparkles className="size-4" aria-hidden /> Perfil desbloqueado
              </Eyebrow>
              <span className="grid size-12 place-items-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 font-display text-sm font-bold">
                7/7
              </span>
            </div>

            <div className="mt-6 flex items-start gap-4">
              <span className="animate-pop grid size-14 shrink-0 place-items-center rounded-2xl bg-highlight text-primary shadow-lg sm:size-16">
                <ProfileIcon className="size-7 sm:size-8" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-highlight">Seu padrão principal</p>
                <p className="mt-1 font-display text-xl font-bold leading-tight sm:text-2xl">
                  {profile.name}
                </p>
              </div>
            </div>
            <h1
              ref={ref}
              tabIndex={-1}
              className="mt-6 text-[1.85rem] font-bold leading-tight outline-none sm:text-[2.65rem]"
            >
              {profile.title}
            </h1>
          </div>
        </div>

        <div className="relative -mt-2 rounded-b-3xl border border-t-0 border-border bg-card px-5 pb-6 pt-7 shadow-card sm:px-8">
          <p className="max-w-[65ch] text-[1.03rem] leading-relaxed text-muted-foreground sm:text-lg">
            {profile.reading}
          </p>
          <h2 className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-primary">
            O que apareceu nas suas respostas
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {factors.map((f) => (
              <li
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-semibold"
              >
                <CircleDot className="size-3.5 text-cta" aria-hidden /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6">
            <p className="text-sm font-bold text-primary">Mapa da sua rotina</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Quanto mais longa a barra, mais esse ponto apareceu nas respostas.
            </p>
            <dl className="mt-5 grid gap-3.5">
              {BAR_DIMS.map((d) => (
                <div
                  key={d}
                  className="grid grid-cols-[minmax(6.8rem,8.5rem)_1fr] items-center gap-3 text-xs sm:text-sm"
                >
                  <dt className="font-semibold leading-tight">{dimensionLabels[d]}</dt>
                  <dd>
                    <div
                      className="h-2.5 overflow-hidden rounded-full bg-secondary"
                      aria-label={`${dimensionLabels[d]}: ${scores[d]} pontos`}
                    >
                      <div
                        className={`h-full rounded-full transition-[width] duration-700 ${d === profile.key ? "bg-cta" : "bg-leaf"}`}
                        style={{ width: `${Math.max(6, (scores[d] / max) * 100)}%` }}
                      />
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-card sm:p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-highlight">
              <Footprints className="size-5" aria-hidden /> Missão rápida liberada
            </p>
            <p className="mt-3 font-display text-xl font-semibold leading-snug">
              {profile.firstStep}
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-primary-foreground/10 p-3 text-sm">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-success">
                <Check className="size-5" aria-hidden />
              </span>
              <span>Um passo pequeno para começar sem refazer toda a rotina.</span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-highlight/45 bg-highlight/10 p-5 sm:p-6">
          <p className="font-display text-lg font-bold text-primary">Sua próxima fase</p>
          <p className="mt-2 text-muted-foreground">{profile.bridge}</p>
          <a href="#plano" className={`${btnGhost} mt-5 w-full border-primary/20 sm:w-auto`}>
            Montar minha rotina de 30 dias <ChevronDown className="size-5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
