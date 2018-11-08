<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-md text-xs-left>
    <v-layout row wrap>

    <v-content>
        
      <!--- tu ide komp -->
      <thetis-group :thetis="$route.params.group"></thetis-group>
    </v-content>

    </v-layout>

</v-container>

    <navigation-drawer-right></navigation-drawer-right>
      
    <main-footer></main-footer>

  </div>
  
</template>

<script>
import ThetisGroup from '@/components/paris_mou_deficiency_codes/ThetisGroup'
import NavigationDrawer from '@/components/NavigationDrawer'
import NavigationDrawerRight from '@/components/NavigationDrawerRight'
import MainFooter from '@/components/MainFooter'
export default {
  components: {
    NavigationDrawer,
    NavigationDrawerRight,
    MainFooter,
    ThetisGroup
  },
  data () {
    return {
      
    }
  },
  name: 'Main'
}
</script>