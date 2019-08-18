class Player {

  constructor(name, wonder) {
    this.name = name
    this.wonder = wonder

    this.score, this.militaryScore = 0
    this.gold = 3
    this.resources = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0
    }
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
      this.addCardToType(card)
      return true
    }

    for (let resource in card.price) {
      if (this.resources[resource] >= card.price[resource]) {
        this.addCardToType(card)
        console.log(this.cardsBuilt)
        return true
      }
    }
    return false
  }

  addCardToType(card) {
    switch(card.color) {
      case 1:
        this.cardsBuilt.rawMaterials.push(card)
        return true
        break
      case 2:
        this.cardsBuilt.manufactures.push(card)
        return true
        break
      case 3:
        this.cardsBuilt.civilsBuildings.push(card)
        return true
        break
      case 4:
        this.cardsBuilt.commercialBuildings.push(card)
        return true
        break
      case 5:
        this.cardsBuilt.militaryBuildings.push(card)
        return true
        break
      case 6:
        this.cardsBuilt.scientificBuildings.push(card)
        return true
        break
      case 7:
        this.cardsBuilt.guilds.push(card)
        return true
        break
      default:
        return false
    }
  }
  removeMilitaryScore(score) {
    this.militaryScore -= score
  }
}

module.exports = Player