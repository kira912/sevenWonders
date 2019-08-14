import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: {
      gold: 0,
      tokenConflicts: 0,
      players: [],
      isInit: false
    },
    wonders: [],
    players: [],
    cardsAge1: [],
    cardsAge2: [],
    cardsAge3: []
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
    SET_CARDS_AGE_1: (state, cards) => {
      state.cardsAge1 = cards
    }
  },
  actions: {
    GET_INIT_GAME: async (context, payload) => {
      const { data } = await Axios.post('http://localhost:3000/game/init', {
        players: ['Player1', 'Player2', 'Player3']
      })
      console.log(data)
      context.commit('SET_INIT_GAME', data);
    },
    GET_GAME: async (context, payload) => {
      const { data } = await Axios.get('http://localhost:3000/game')
      console.log(data)
      context.commit('SET_GAME', data)
    },
    GET_WONDERS: async (context, payload) => {
      const { data } = await Axios.get('http://localhost:3000/wonders')
      context.commit('SET_WONDERS', data);
    },
    GET_CARDS_AGE_1: async (context, payload) => {
      const { data } = await Axios.get('http://localhost:3000/cards/age1')
      context.commit('SET_CARDS_AGE_1', data)
    }
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
    // gameInit: (state) => {
    //   return state.game.isInit
    // }
  }
});
