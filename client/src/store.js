import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: {},
    wonders: [],
    players: [],
    cardsAge1: [],
    cardsAge2: [],
    cardsAge3: [],
    cardsResourcesParsed: [],
    cardColor: {
      brown: 1,
      grey: 2,
      blue: 3,
      yellow: 4,
      red: 5,
      green: 6,
      purple: 7
    },
    cardRessource: {
      Clay: 1,
      Wood: 2,
      Stones: 3,
      Ore: 4,
      Glass: 5,
      Fabric: 6,
      Papyrus: 7,
      Gold: 8
    },
    scientificSymbol: {
      Compass: 1,
      Cogs: 2,
      Tablet: 3
    }
  },
  mutations: {
    SET_INIT_GAME: (state, isInit) => {
      state.game.isInit = isInit
    },
    SET_GAME: (state, game) => {
      state.game = game
    },
    SET_WONDERS: (state, wonders) => {
      state.wonders = wonders
    },
    SET_CARDS_RESOURCES_TYPE: (state, cards) => {
      state.cardsResourcesParsed = cards
    },
    SET_BUILD_CARD: (state, playerUpdated) => {
      console.log(playerUpdated)
      let indexFounded = this.state.game.players.findIndex(player => player._id == playerUpdated._id)
      this.state.game.players[indexFounded] = playerUpdated
    }
  },
  actions: {
    INIT_GAME: async (context, payload) => {
      const { data } = await Axios.post('http://localhost:3000/game/init', {
        players: ['Player1', 'Player2', 'Player3']
      })
      context.commit('SET_INIT_GAME', data);
    },
    GET_GAME: async (context, payload) => {
      const { data } = await Axios.get('http://localhost:3000/game')
      context.commit('SET_GAME', data)
    },
    GET_WONDERS: async (context, payload) => {
      const { data } = await Axios.get('http://localhost:3000/wonders')
      context.commit('SET_WONDERS', data);
    },
    BUILD_CARD: async (context, payload) => {
      const { data } = await Axios.post('http://localhost:3000/game/player/buildCard', {
        playerName: payload.playerName,
        cardId: payload.cardId
      })
      console.log(data)
      context.commit('SET_BUILD_CARD', data)
    }
    // GET_CARDS_RESOURCES_TYPE: async (context, payload) => {
    //   const { data } = await Axios.post('http://localhost:3000/game/getResourcesTypes', {
    //     cards: payload
    //   })
    //   context.commit('SET_CARDS_RESOURCES_TYPE', data)
    // }
  },
  getters: {
    wonders: (state) => {
      return state.wonders;
    },
    cardsAge1: (state) => {
      return state.cardsAge1
    },
    cardsAge1Count: (state) => {
      return state.cardsAge1.length
    },
    playerCount: (state) => {
      return state.players.length
    },
    game: (state) => {
      return state.game
    },
    resourcesValue: (state) => {
      return state.cardRessource
    },
    cardColor: (state) => {
      return state.cardColor
    }
  }
});
