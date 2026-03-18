import {
  DrugStrategy,
  MagicPillStrategy,
  HerbalTeaStrategy,
  FervexStrategy,
  NormalDrugStrategy,
  DafalganStrategy,
} from "./drugStrategy";
import { Drug } from "../pharmacy/pharmacy";

describe("DrugStrategy", () => {
  it("should get the right strategy", () => {
    expect(new DrugStrategy().getStrategy("Herbal Tea")).toEqual(
      new HerbalTeaStrategy(),
    );
  });
});

describe("MagicPillStrategy", () => {
  it("should not change the benefit and expiresIn", () => {
    expect(
      new MagicPillStrategy().updateBenefit(new Drug("Magic Pill", 2, 3)),
    ).toEqual(new Drug("Magic Pill", 2, 3));
  });
});

describe("HerbalTeaStrategy", () => {
  it("should increase the benefit and decrease expiresIn", () => {
    expect(
      new HerbalTeaStrategy().updateBenefit(new Drug("Herbal Tea", 2, 3)),
    ).toEqual(new Drug("Herbal Tea", 1, 4));
  });

  it("should increase the benefit twice at the expiration date", () => {
    expect(
      new HerbalTeaStrategy().updateBenefit(new Drug("Herbal Tea", 0, 3)),
    ).toEqual(new Drug("Herbal Tea", -1, 5));
  });
});

describe("FervexStrategy", () => {
  it("should increase the benefit and decrease expiresIn", () => {
    expect(
      new FervexStrategy().updateBenefit(new Drug("Fervex", 15, 3)),
    ).toEqual(new Drug("Fervex", 14, 4));
  });

  it("should increase the benefit by 2 when there are 10 days or less", () => {
    expect(
      new FervexStrategy().updateBenefit(new Drug("Fervex", 10, 3)),
    ).toEqual(new Drug("Fervex", 9, 5));
  });

  it("should increase the benefit by 3 when there are 5 days or less", () => {
    expect(
      new FervexStrategy().updateBenefit(new Drug("Fervex", 5, 3)),
    ).toEqual(new Drug("Fervex", 4, 6));
  });

  it("should drops the benefit to 0 at the expiration date", () => {
    expect(
      new FervexStrategy().updateBenefit(new Drug("Fervex", 0, 3)),
    ).toEqual(new Drug("Fervex", -1, 0));
  });
});

describe("NormalDrugStrategy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new NormalDrugStrategy().updateBenefit(new Drug("test", 2, 3)),
    ).toEqual(new Drug("test", 1, 2));
  });

  it("should decrease the benefit twice at the expiration date", () => {
    expect(
      new NormalDrugStrategy().updateBenefit(new Drug("test", 0, 3)),
    ).toEqual(new Drug("test", -1, 1));
  });
});

describe("DafalganStrategy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new DafalganStrategy().updateBenefit(new Drug("Dafalgan", 2, 3)),
    ).toEqual(new Drug("Dafalgan", 1, 2));
  });

  it("should degrades in benefit twice as fast as normal drugs after the expiration date", () => {
    expect(
      new DafalganStrategy().updateBenefit(new Drug("Dafalgan", 0, 3)),
    ).toEqual(new Drug("Dafalgan", -1, 0));
  });
});
