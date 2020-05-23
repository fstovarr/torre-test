import Vue from 'vue'
import moment from 'moment'

const Moment = Object.create({
  install: (Vue) => {
    Vue.prototype.$moment = moment
  }
})

Vue.use(Moment)
