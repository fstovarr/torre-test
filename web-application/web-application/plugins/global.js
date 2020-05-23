import Vue from 'vue'

/**
 * Global components
 */
import { ValidationObserver } from 'vee-validate'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)

Vue.component('validation-observer', ValidationObserver)

/**
 *  Global functions
 */
export default ({ $store }, inject) => {}
