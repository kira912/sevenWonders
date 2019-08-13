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
    stepOne: {
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
            default: true
          },
          data: {
            type: Number,
            default: 3
          }
        },
        // addResources: {
        //   type: Object,
        //   isActive: {
        //     type: Boolean,
        //     default: false
        //   },
        //   data: {
        //     type: Object,
        //     default: {}
        //   }
        // },
        // specialStep: {
        //   type: Object,
        //   isActive: {
        //     type: Boolean,
        //     default: false
        //   },
        //   data: {
        //     type: Object,
        //     default: {}
        //   }
        // }
      }
    },
    stepTwo: {
      type: Object,
      default: this.faceAStepOne,
      price: {
        type: Object,
        required: true,
        default: {}
      },
      value: {
        type: Object,
        default: {}
      }
    },
    stepThree: {
      type: Object,
      default: this.faceAStepThree,
      price: {
        type: Object,
        required: true,
        default: {}
      },
      value: {
        type: Object,
        addScore: {
          type: Object,
          isActive: {
            type: Boolean,
            default: true
          },
          data: {
            type: Number,
            default: 7
          }
        }
      }
    }
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

const faceAStepOne = {
  price: {},
  value: {
    addScore: {
      isActive: true,
      data: 3
    }
  }
}

const faceAStepThree = {
  price: {},
  value: {
    addScore: {
      isActive: true,
      data: 7
    }
  }
}

module.exports = mongoose.model("Wonder", WonderSchema)