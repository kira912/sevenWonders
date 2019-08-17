class Player {

  constructor(name, wonder) {
    this.name = name
    this.wonder = wonder

    this.score, this.militaryScore = 0
    this.gold = 3
    this.resources = []
    this.deck = []
    this.cardsBuilt = {
      civilsBuildings: [],
      scientificBuildings: [],
      commercialBuildings: [],
      militaryBuildings: [],
      rawMaterials: [],
      manufactures: [],
      guilds: []
    }
  }

  addDeck(deck) {
    this.deck = deck
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

    if (card.price.free) {
      switch(cardType) {
        case 1:
          this.cardsBuilt.rawMaterials.push(card)
          break
        case 2:
          this.cardsBuilt.manufactures.push(card)
          break
        case 3:
          this.cardsBuilt.civilsBuildings.push(card)
          break
        case 4:
          this.cardsBuilt.commercialBuildings.push(card)
          break
        case 5:
          this.cardsBuilt.militaryBuildings.push(card)
          break
        case 6:
          this.cardsBuilt.scientificBuildings.push(card)
          break
        case 7:
          this.cardsBuilt.guilds.push(card)
          break
        default:
          return false
      }
    }
    console.log(this.cardsBuilt)
  }

  removeMilitaryScore(score) {
    this.militaryScore -= score
  }
}

module.exports = Player