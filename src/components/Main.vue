<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-md text-xs-center>
    <v-layout row wrap>

    <v-content>
      <!--- tu ide komp -->
      test
    </v-content>

    </v-layout>

</v-container>

    <navigation-drawer-right></navigation-drawer-right>
      
    <main-footer></main-footer>

  </div>
  
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer'
import NavigationDrawerRight from '@/components/NavigationDrawerRight'
import MainFooter from '@/components/MainFooter'
export default {
  components: {
    NavigationDrawer,
    NavigationDrawerRight,
    MainFooter
  },
  data () {
    return {
      
    }
  },
  name: 'Main'
}
</script>