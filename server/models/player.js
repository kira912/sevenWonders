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

    this.resources[wonder.defaultResource] = 1
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

  removeMilitaryScore(score) {
    this.militaryScore -= score
  }

  clearTmpDeck() {
    if (this.tmpDeck.has('oldDeck') && this.tmpDeck.has('newDeck')) {
      this.tmpDeck.clear()
    }
  }

  buildCard(cardToBuild) {

    let buildPossible = false

    if (cardToBuild.price.free) {
      buildPossible = true
    }

    for (let resource in cardToBuild.price) {
      if (this.resources[resource] <= cardToBuild.price[resource]) {

        return false
      }

      if ("8" in cardToBuild.price) {
        this.gold -= cardToBuild.price["8"]
      }
    }

    const cardPushed = this.addCardToType(cardToBuild)

    if (cardPushed) {
      buildPossible = true
    }

    if (buildPossible) {
      this.deck = this.deck.filter(card => card._id != cardToBuild._id)
      console.log(this.deck)
    }

    return buildPossible
  }

  buildWonderStep(trashCard, wonderFace, stepToBuild, game) {
    const step = this.wonder[wonderFace][stepToBuild]

    for (let resource in step.price) {
      if (this.resources[resource] <= step.price[resource]) {
        return false
      }

      step.built = true
      game.trashCards.push(trashCard)
      this.deck = this.deck.filter((card) => card._id != trashCard._id)

      return true
    }

    return false
  }

  getShieldsForWar() {

    const mapShieldsCardsBuilt = this.cardsBuilt.militaryBuildings.map(card => card.data.shield)

    return mapShieldsCardsBuilt.length > 0 
      ? mapShieldsCardsBuilt.reduce((accumulator, currentValue) => accumulator + currentValue) 
      : 0
  }

  addCardToType(card) {
    switch(card.color) {
      case 1:
        this.cardsBuilt.rawMaterials.push(card)
        return true
      case 2:
        this.cardsBuilt.manufactures.push(card)
        return true
      case 3:
        this.cardsBuilt.civilsBuildings.push(card)
        return true
      case 4:
        this.cardsBuilt.commercialBuildings.push(card)
        return true
      case 5:
        this.cardsBuilt.militaryBuildings.push(card)
        return true
      case 6:
        this.cardsBuilt.scientificBuildings.push(card)
        return true
      case 7:
        this.cardsBuilt.guilds.push(card)
        return true
      default:
        return false
    }
  }
}

module.exports = Player