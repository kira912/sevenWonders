<template>
  <div>
    <v-container v-for="player in game.players" class="home">
      <h3>
        {{player.name}}
      </h3>
      <v-container v-for="card in player.deck">
        <v-card  :color="getColorType(card.color)">
          {{card}}
          <v-card-title>
            {{card.name}}
          </v-card-title>

          <v-card-text v-if="card.price.free" color="black">
            This card is free
          </v-card-text>
          <v-container v-else>
              <v-row>
                <v-col v-for="(value, index) in Object.keys(card.price)" :key="index">
                  <v-card-text>
                    Price => {{Object.values(card.price)[index]}} {{getResourceType(value)}}
                  </v-card-text>
                </v-col>
              </v-row>
          </v-container>

          <v-container v-if="card.color == 1 || card.color == 2 || card.color == 4">
              <v-row justify="center">
                <v-col v-for="value in Object.keys(card.data)">
                  <v-card-text v-if="Number.isInteger(parseInt(value))">
                    1 {{getResourceType(value)}}
                  </v-card-text>
                </v-col>
              </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Build Card</v-btn>
            <v-btn color="primary">Discard Card</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-container>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'wonders',
      'cardsAge1',
      'game',
      'resourcesValue',
      'cardColor'
    ]),
  },
  methods: {
    getResourceType: function(value) {
      return Object.keys(this.resourcesValue).find((key) => {
        return this.resourcesValue[key] == value
      })
    },
    getColorType: function (value) {
      return Object.keys(this.cardColor).find((key) => {
        return this.cardColor[key] == value
      })
    },
    processCards: function(card) {

    }
  },
  mounted() {
    this.$store.dispatch('INIT_GAME')

    console.log(this.game)
    if (this.game) {
      this.$store.dispatch('GET_GAME')
      // this.$store.dispatch('GET_CARDS_RESOURCES_TYPE' )
    }
  }
};
</script>
