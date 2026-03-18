const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  incrementBenefit(drug) {
    if (drug.benefit < MAX_BENEFIT) {
      drug.benefit += 1;
    }
    return drug;
  }

  decrementBenefit(drug) {
    if (drug.benefit > MIN_BENEFIT) {
      drug.benefit -= 1;
    }
    return drug;
  }

  handleHerbalTea(drug) {
    this.incrementBenefit(drug);

    drug.expiresIn -= 1;
    if (drug.expiresIn < 0) {
      this.incrementBenefit(drug);
    }

    return drug;
  }

  handleFervex(drug) {
    this.incrementBenefit(drug);

    if (drug.expiresIn <= 10) {
      this.incrementBenefit(drug);
    }

    if (drug.expiresIn <= 5) {
      this.incrementBenefit(drug);
    }

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0) {
      drug.benefit = MIN_BENEFIT; // Benefit drops to 0 after the expiration date
    }

    return drug;
  }

  handleNormalDrug(drug) {
    this.decrementBenefit(drug);

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0) {
      this.decrementBenefit(drug); // Benefit degrades twice as fast after expiration date
    }

    return drug;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      switch (drug.name) {
        case "Magic Pill":
          break;
        case "Herbal Tea":
          this.handleHerbalTea(drug);
          break;
        case "Fervex":
          this.handleFervex(drug);
          break;
        case "Dafalgan":
          break;
        default:
          this.handleNormalDrug(drug);
          break;
      }
    });

    return this.drugs;
  }
}
