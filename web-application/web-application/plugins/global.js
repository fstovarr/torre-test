import Vue from 'vue'

/**
 * Global external components
 */
import { ValidationObserver } from 'vee-validate'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

/*
 * Global custom components
 */
import InputText from '@/components/InputText'
import Offers from '@/components/Offers'
import HeadHunters from '@/components/HeadHunters'
import Profile from '@/components/Profile'
import Users from '@/components/Users'

Vue.use(PerfectScrollbar)

Vue.component('validation-observer', ValidationObserver)
Vue.component('input-text', InputText)
Vue.component('headhunters', HeadHunters)
Vue.component('offers', Offers)
Vue.component('profile', Profile)
Vue.component('users', Users)

/**
 *  Global functions
 */
export default ({ $store }, inject) => {}
