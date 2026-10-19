import { useEffect, useMemo, useRef } from "react";
import { profiles } from "@/quiz/profiles";
import { computeScores, getFactors, getProfile, type Answers } from "@/quiz/scoring";
import { track } from "@/lib/analytics";
import { ProfileSummary } from "./ProfileSummary";
import { ClosingSection, ComparisonSection, CostSection, MechanismSection } from "./SalesSections";
import { ProductPreview } from "./ProductPreview";
import { OfferCard } from "./OfferCard";
import { FAQ } from "./FAQ";
import { StickyCTA } from "./StickyCTA";
import { Footer } from "./Footer";
import { useSectionView } from "./useSectionView";

export function QuizResult({ answers }: { answers: Answers }) {
  const key = getProfile(answers);
  const profile = profiles[key];
  const scores = useMemo(() => computeScores(answers), [answers]);
  const factors = useMemo(() => getFactors(answers, key), [answers, key]);
  const offerRef = useSectionView<HTMLElement>("offer", "offer_view");
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    track("quiz_result_view", { profile: key });
    try {
      if (sessionStorage.getItem("ci_cta_clicked") === "1") {
        track("checkout_return", { profile: key });
        sessionStorage.removeItem("ci_cta_clicked");
      }
    } catch {
      /* ignore */
    }
  }, [key]);

  return (
    <>
      <main>
        <ProfileSummary profile={profile} factors={factors} scores={scores} />
        <CostSection />
        <MechanismSection />
        <ProductPreview />
        <OfferCard ref={offerRef} />
        <ComparisonSection />
        <FAQ />
        <ClosingSection />
      </main>
      <Footer />
      <StickyCTA offerRef={offerRef} />
    </>
  );
}
