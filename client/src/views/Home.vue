<template>
  <div>
    <div class="home">
      {{cardsAge1}}
      <!-- {{JSON.parse(cardsAge1)}} -->
    </div>
    <div>
      {{game.isInit}}
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'wonders',
      'cardsAge1',
      'game'
    ])
  },
  mounted() {
    this.$store.dispatch('GET_INIT_GAME')
    this.$store.dispatch('GET_GAME')
    this.$store.dispatch('GET_WONDERS')
    this.$store.dispatch('GET_CARDS_AGE_1')
  }
};
</script>
