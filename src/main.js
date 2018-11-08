// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import { store } from './Store/store'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VTextField,
  VTooltip,
  VForm,
  VAvatar,
  VDialog,
  VDataTable,
  VAlert,
  VSnackbar,
  VSelect,
  VRadioGroup,
  VSwitch,
  VCheckbox,
  VDatePicker,
  VStepper,
  VDivider,
  VDataIterator,
  VChip,
  VSubheader,
  VMenu,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VCard,
    VTextField,
    VToolbar,
    VTooltip,
    VForm,
    VAvatar,
    VDialog,
    VDataTable,
    VAlert,
    VSnackbar,
    VSelect,
    VRadioGroup,
    VSwitch,
    VCheckbox,
    VDatePicker,
    VStepper,
    VDivider,
    VDataIterator,
    VChip,
    VSubheader,
    VMenu,
    transitions
  }
})

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:36946'

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
