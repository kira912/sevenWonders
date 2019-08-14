class Player {

  constructor(name, wonder) {
    this.name = name
    this.wonder = wonder

    this.score, this.gold, this.militaryScore = 0
    this.deck, this.resources = []
    this.cardsBuilt = {
      civilsBuildings: [],
      scientificBuildings: [],
      commercialBuildings: [],
      militaryBuildings: [],
      rawMaterials: [],
      manufactures: []
    }
  }

  addGold(gold) {
    this.gold += gold
  }

  removeGold(gold) {
    this.gold -= gold
  }

  addScore(score) {
    this.score += score
  }

  removeScore(score) {
    this.score -= score
  }

  addMilitaryScore(score) {
    this.militaryScore += score
  }

  buildCard(card) {
    const cardType = card.color
    console.log(card)
  }

  removeMilitaryScore(score) {
    this.militaryScore -= score
  }
}

module.exports = Player