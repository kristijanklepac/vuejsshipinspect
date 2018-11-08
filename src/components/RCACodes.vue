<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-md text-xs-left>
    <v-layout row wrap>

    <v-content>
        
      <!--- tu ide komp -->
      <rca-codes-group :rca="$route.params.group"></rca-codes-group>
    </v-content>

    </v-layout>

</v-container>

    <navigation-drawer-right></navigation-drawer-right>
      
    <main-footer></main-footer>

  </div>
  
</template>

<script>
import RcaCodesGroup from '@/components/rca_codes_relation/RcaCodesGroup'
import NavigationDrawer from '@/components/NavigationDrawer'
import NavigationDrawerRight from '@/components/NavigationDrawerRight'
import MainFooter from '@/components/MainFooter'
export default {
  components: {
    NavigationDrawer,
    NavigationDrawerRight,
    MainFooter,
    RcaCodesGroup
  },
  data () {
    return {
      
    }
  },
  name: 'RcaCodes'
}
</script>