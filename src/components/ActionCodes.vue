<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-md text-xs-left>
    <v-layout row wrap>

    <v-content>
        
      <!--- tu ide komp -->
      <action-code-group :action="$route.params.group"></action-code-group>
    </v-content>

    </v-layout>

</v-container>

    <navigation-drawer-right></navigation-drawer-right>
      
    <main-footer></main-footer>

  </div>
  
</template>

<script>
import ActionCodeGroup from '@/components/actions_codes_relation/ActionCodeGroup'
import NavigationDrawer from '@/components/NavigationDrawer'
import NavigationDrawerRight from '@/components/NavigationDrawerRight'
import MainFooter from '@/components/MainFooter'
export default {
  components: {
    NavigationDrawer,
    NavigationDrawerRight,
    MainFooter,
    ActionCodeGroup
  },
  data () {
    return {
      
    }
  },
  name: 'ActionCodes'
}
</script>