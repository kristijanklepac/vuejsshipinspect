<template>
<v-footer :fixed="fixed" app class="pa-3">
     
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  
    </v-footer>

    </template>
    <script>


export default {
  
  data () {
    return {
      
      fixed: false,
      
      title: 'Vuetify.js'
    }
  },
  name: 'MainFooter'
}
</script>