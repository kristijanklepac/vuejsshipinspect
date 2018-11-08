<template>
  
  <v-app>

      <router-view/>
    
  </v-app>

</template>

<script>
import axios from 'axios'

export default {
  
  data () {
    return {
      
    }

  },
  mounted() {

      axios.get('/api/Flag')
        .then(response => {
         const data = response.data;
             this.$store.commit('setCountryFlags', data)
        })

      axios.get('/api/RecognizedOrganization')
        .then(response => {
         const data = response.data;
             this.$store.commit('setRecognizedOrganizations', data)
        })

      axios.get('/api/ShipType')
        .then(response => {
         const data = response.data;
             this.$store.commit('setTypeOfShip', data)
        })

      axios.get('/api/Company')
        .then(response => {
         const data = response.data;
             this.$store.commit('setCompanies', data)
        })

        axios.get('/api/Ship')
        .then(response => {
         const data = response.data;
             this.$store.commit('setShips', data)
        })

        axios.get('/api/RcaCode')
        .then(response => {
         const data = response.data;
             this.$store.commit('setAllRcaCodes', data)
        })
  },
 
  name: 'App'
}
</script>
