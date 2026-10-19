import { describe, expect, it } from "vitest";
import { computeScores, getProfile } from "@/quiz/scoring";

const all = (id: string) => Object.fromEntries(["q1", "q2", "q3", "q4", "q5", "q6", "q7"].map((q) => [q, id]));

describe("quiz scoring", () => {
  it("all A answers sum points per dimension", () => {
    expect(computeScores(all("A"))).toEqual({ D: 11, C: 3, R: 0, F: 5, O: 0 });
  });
  it("reaches profile D", () => expect(getProfile(all("A"))).toBe("D"));
  it("reaches profile C", () => expect(getProfile(all("B"))).toBe("C"));
  it("reaches profile O", () => expect(getProfile(all("D"))).toBe("O"));
  it("reaches profile R", () =>
    expect(getProfile({ q1: "D", q2: "C", q3: "D", q4: "D", q5: "B", q6: "A", q7: "C" })).toBe("R"));
  it("reaches profile F", () =>
    expect(getProfile({ q1: "C", q2: "D", q3: "C", q4: "C", q5: "A", q6: "D", q7: "D" })).toBe("F"));
  it("tie D vs C resolves to D", () =>
    // D: q1A 3 ; C: q3A 3
    expect(getProfile({ q1: "A", q3: "A" })).toBe("D"));
});
