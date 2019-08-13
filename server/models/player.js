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
}

module.exports = Player