import { DrugStrategy } from "../drug/drugStrategy.js";

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

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      const strategy = new DrugStrategy().getStrategy(drug.name);
      strategy.updateBenefit(drug);
    });

    return this.drugs;
  }
}
