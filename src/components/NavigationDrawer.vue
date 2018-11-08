
<template>
  <div>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click.prevent=""
              :to="child.routeId"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
                <v-list-tile-sub-title>{{child.subGroup}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="" :key="item.text" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>

            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">PSC Application</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    
   
    </div>
  
</template>

<script>
  export default {
    data: () => ({
      
      drawer: null,
      items: [
        { icon: 'history', text: 'Inspections', link:'/inspection' },
        { icon: 'contacts', text: 'Accidents', link:'/'  },
        { icon: 'settings', text: 'Companies' , link:'/company' },
        { icon: 'chat_bubble', text: 'Flags / Countries', link:'/search'  },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Ships',
          model: false,
          children: [
            { icon: 'add', text: 'Ships (Add - Edit)', routeId:'/ship'  },
            { icon: 'add', text: 'Ship Types', routeId:'/ship-type'  },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'WGB Lists',
          model: false,
          children: [
            { icon: 'add', text: 'Paris MOU - WGB', routeId:'/wgb-list'  },
            { icon: 'add', text: 'Tokyo MOU - WGB', routeId:'/tokyo-wgb-list'  },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Paris MOU Deficiency Codes',
          model: false,
          children: [
            { routeId: '/pmoudefcodes/thetis/01-011', text:'01 - Certificates & Documentation', subGroup:'011 - Ship Certificate' },
            { routeId: '/pmoudefcodes/thetis/01-012', text:'01 - Certificates & Documentation', subGroup:'012 - Crew Certificate' },
            { routeId: '/pmoudefcodes/thetis/01-013', text:'01 - Certificates & Documentation', subGroup:'013 - Document' },
            { routeId: '/pmoudefcodes/thetis/02-020', text:'02 - Structural condition', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/03-030', text:'03 - Water/Weathertight condition', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/04-040', text:'04 - Emergency Systems', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/05-050', text:'05 - Radio communication', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/06-060', text:'06 - Cargo operations including equipment', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/07-070', text:'07 - Fire safety', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/08-080', text:'08 – Alarms', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/09-091', text:'09 - Working and Living Conditions', subGroup:'091 - Living conditions' },
            { routeId: '/pmoudefcodes/thetis/09-092', text:'09 - Working and Living Conditions', subGroup:'092 - Working Conditions' },
            { routeId: '/pmoudefcodes/thetis/10-100', text:'10 - Safety of Navigation', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/11-110', text:'11 - Life saving appliances', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/12-120', text:'12 - Dangerous Goods', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/13-130', text:'13 - Propulsion and auxiliary machinery', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/14-141', text:'14 - Pollution Prevention', subGroup:'141 - MARPOL Annex I' },
            { routeId: '/pmoudefcodes/thetis/14-142', text:'14 - Pollution Prevention', subGroup:'142 - MARPOL Annex II' },
            { routeId: '/pmoudefcodes/thetis/14-143', text:'14 - Pollution Prevention', subGroup:'143 - MARPOL Annex III' },
            { routeId: '/pmoudefcodes/thetis/14-144', text:'14 - Pollution Prevention', subGroup:'144 - MARPOL Annex IV' },
            { routeId: '/pmoudefcodes/thetis/14-145', text:'14 - Pollution Prevention', subGroup:'145 - MARPOL Annex V' },
            { routeId: '/pmoudefcodes/thetis/14-146', text:'14 - Pollution Prevention', subGroup:'146 - MARPOL Annex VI' },
            { routeId: '/pmoudefcodes/thetis/14-147', text:'14 - Pollution Prevention', subGroup:'147 - Anti Fouling' },
            { routeId: '/pmoudefcodes/thetis/14-148', text:'14 - Pollution Prevention', subGroup:'148 - Ballast Water' },
            { routeId: '/pmoudefcodes/thetis/15-150', text:'15 – ISM', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/16-160', text:'16 - ISPS', subGroup:'General' },
            { routeId: '/pmoudefcodes/thetis/18-181', text:'18 - MLC, 2006', subGroup:'181 - Minimum requirements to work on a ship' },
            { routeId: '/pmoudefcodes/thetis/18-182', text:'18 - MLC, 2006', subGroup:'182 - Conditions of employment' },
            { routeId: '/pmoudefcodes/thetis/18-183', text:'18 - MLC, 2006', subGroup:'183 - Accommodation, recreational facilities, food and catering' },
            { routeId: '/pmoudefcodes/thetis/18-184', text:'18 - MLC, 2006', subGroup:'184 - Health protection, medical care, social security' },
            { routeId: '/pmoudefcodes/thetis/99-990', text:'99  – Other', subGroup:'General' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'RCA Codes',
          model: false,
          children: [
            { icon: 'touch_app', routeId: '/rca-codes/rca-pr', text:'People Related', subGroup:'1 - People Related'},
            { icon: 'touch_app', routeId: '/rca-codes/rca-mr', text:'Monitoring Related', subGroup:'2 - Monitoring Related'},
            { icon: 'touch_app', routeId: '/rca-codes/rca-rr', text:'Resources Related', subGroup:'3 - Resources Related'}
        ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Action Codes',
          model: false,
          children: [
            { icon: 'touch_app', routeId: '/action-codes/action-PSC', text:'PSC', subGroup:'PSC'},
            { icon: 'touch_app', routeId: '/action-codes/action-USCG', text:'USCG', subGroup:'USCG'},
            { icon: 'touch_app', routeId: '/action-codes/action-TOKYO', text:'TOKYO', subGroup:'TOKYO'}
        ]
        },
        { icon: 'settings', text: 'Settings' , link:'/' },
        { icon: 'chat_bubble', text: 'Send feedback' , link:'/' },
        { icon: 'help', text: 'Help' , link:'/' },
        { icon: 'phonelink', text: 'App downloads', link:'/'  },
        { icon: 'keyboard', text: 'Go to the old version' , link:'/' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>
