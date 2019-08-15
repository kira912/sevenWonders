<template>
  <div>
    <v-container v-for="player in game.players" class="home">
      <v-card v-for="card in player.deck">
        {{card}}
        <v-card-text v-for="value in Object.keys(card.data)" v-if="card.color == 1 || card.color == 2 || card.color == 4">
          {{getResourceType(value)}}
        </v-card-text>
      </v-card>
      <!-- {{JSON.parse(cardsAge1)}} -->
    </v-container>
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
      'game',
      'resourcesValue'
    ]),
  },
  methods: {
    getResourceType: function(value) {
      return Object.keys(this.resourcesValue).find((key) => {
        return this.resourcesValue[key] == value
      })
    }
  },
  mounted() {
    this.$store.dispatch('INIT_GAME')

    console.log(this.game)
    if (this.game) {
      this.$store.dispatch('GET_GAME')
      this.$store.dispatch('GET_CARDS_RESOURCES_TYPE' )
    }
  }
};
</script>
