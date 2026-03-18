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
          break;
      }
    });

    return this.drugs;
  }

  // updateBenefitValue() {
  //   for (var i = 0; i < this.drugs.length; i++) {
  //     if (
  //       this.drugs[i].name != "Herbal Tea" &&
  //       this.drugs[i].name != "Fervex"
  //     ) {
  //       if (this.drugs[i].benefit > 0) {
  //         if (this.drugs[i].name != "Magic Pill") {
  //           this.drugs[i].benefit = this.drugs[i].benefit - 1;
  //         }
  //       }
  //     } else {
  //       if (this.drugs[i].benefit < 50) {
  //         this.drugs[i].benefit = this.drugs[i].benefit + 1;
  //         if (this.drugs[i].name == "Fervex") {
  //           if (this.drugs[i].expiresIn < 11) {
  //             if (this.drugs[i].benefit < 50) {
  //               this.drugs[i].benefit = this.drugs[i].benefit + 1;
  //             }
  //           }
  //           if (this.drugs[i].expiresIn < 6) {
  //             if (this.drugs[i].benefit < 50) {
  //               this.drugs[i].benefit = this.drugs[i].benefit + 1;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (this.drugs[i].name != "Magic Pill") {
  //       this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
  //     }
  //     if (this.drugs[i].expiresIn < 0) {
  //       if (this.drugs[i].name != "Herbal Tea") {
  //         if (this.drugs[i].name != "Fervex") {
  //           if (this.drugs[i].benefit > 0) {
  //             if (this.drugs[i].name != "Magic Pill") {
  //               this.drugs[i].benefit = this.drugs[i].benefit - 1;
  //             }
  //           }
  //         } else {
  //           this.drugs[i].benefit =
  //             this.drugs[i].benefit - this.drugs[i].benefit;
  //         }
  //       } else {
  //         if (this.drugs[i].benefit < 50) {
  //           this.drugs[i].benefit = this.drugs[i].benefit + 1;
  //         }
  //       }
  //     }
  //   }

  //   return this.drugs;
  // }
}
