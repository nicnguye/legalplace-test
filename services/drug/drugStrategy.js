import { MAGIC_PILL, HERBAL_TEA, FERVEX, DAFALGAN } from "./drugConstant.js";

const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;

export class MagicPillStrategy {
  updateBenefit(drug) {
    return drug;
  }
}

export class HerbalTeaStrategy {
  updateBenefit(drug) {
    drug.benefit = Math.min(drug.benefit + 1, MAX_BENEFIT);
    drug.expiresIn -= 1;

    if (drug.expiresIn < 0) {
      drug.benefit = Math.min(drug.benefit + 1, MAX_BENEFIT);
    }

    return drug;
  }
}

export class FervexStrategy {
  updateBenefit(drug) {
    drug.benefit = Math.min(drug.benefit + 1, MAX_BENEFIT);

    if (drug.expiresIn <= 5) {
      drug.benefit = Math.min(drug.benefit + 2, MAX_BENEFIT);
    } else if (drug.expiresIn <= 10) {
      drug.benefit = Math.min(drug.benefit + 1, MAX_BENEFIT);
    }

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0) {
      drug.benefit = MIN_BENEFIT;
    }

    return drug;
  }
}

export class NormalDrugStrategy {
  updateBenefit(drug) {
    drug.benefit = Math.max(drug.benefit - 1, MIN_BENEFIT);

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0) {
      drug.benefit = Math.max(drug.benefit - 1, MIN_BENEFIT);
    }

    return drug;
  }
}

export class DafalganStrategy {
  updateBenefit(drug) {
    drug.benefit = Math.max(drug.benefit - 1, MIN_BENEFIT);

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0) {
      drug.benefit = Math.max(drug.benefit - 2, MIN_BENEFIT);
    }

    return drug;
  }
}

export class DrugStrategy {
  getStrategy(drugName) {
    switch (drugName) {
      case MAGIC_PILL:
        return new MagicPillStrategy();
      case HERBAL_TEA:
        return new HerbalTeaStrategy();
      case FERVEX:
        return new FervexStrategy();
      case DAFALGAN:
        return new DafalganStrategy();
      default:
        return new NormalDrugStrategy();
    }
  }
}
