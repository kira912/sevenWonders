const mongoose = require('mongoose')

const WonderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  defaultResource: {
    type: Number,
    required: true
  },
  faceA: {
    type: Object,
    steps: [{
      type: Object,
      price: {
        type: Object,
        required: true,
        default: {}
      },
      value: {
        type: Object,
        required: true,
        addScore: {
          type: Object,
          isActive: {
            type: Boolean,
            default: false
          },
          data: Number
        },
        addResources: {
          type: Object,
          isActive: {
            type: Boolean,
            default: false
          },
          data: {
            type: Object,
            default: {}
          }
        },
        specialStep: {
          type: Object,
          isActive: {
            type: Boolean,
            default: false
          },
          data: {
            type: Object,
            default: {}
          }
        }
      }
    }]
  },
  faceB: {
    type: Object,
    steps: [{
      type: Object,
      price: {
        type: Object,
        required: true,
        default: {}
      },
      value: {
        type: Object,
        required: true,
        addScore: {
          type: Object,
          isActive: {
            type: Boolean,
            default: false
          },
          data: Number
        },
        addResources: {
          type: Object,
          isActive: {
            type: Boolean,
            default: false
          },
          data: {
            type: Object,
            default: {}
          }
        },
        specialStep: {
          type: Object,
          isActive: {
            type: Boolean,
            default: false
          },
          data: {
            type: Object,
            default: {}
          }
        }
      }
    }]
  }

})

module.exports = mongoose.model("Wonder", WonderSchema)