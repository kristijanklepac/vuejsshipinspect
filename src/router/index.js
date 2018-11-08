import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Grid from '@/components/Grid'
import TableCrud from '@/components/TableCrud'
import Search from '@/components/Search'
import Company from '@/components/Company'
import ShipType from '@/components/ShipType'
import RecognizedOrganization from '@/components/RecognizedOrganization'
import WGBList from '@/components/WGBList'
import TokyoWgbList from '@/components/TokyoWgbList'
import Ship from '@/components/Ship'
import Inspection from '@/components/Inspection'
import Thetis from '@/components/Thetis'
import RCACodes from '@/components/RCACodes'
import ActionCodes from '@/components/ActionCodes'
import Accident from '@/components/Accident'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    },
    {
      path: '/tablecrud',
      name: 'TableCrud',
      component: TableCrud
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/ship-type',
      name: 'ShipType',
      component: ShipType
    },
    {
      path: '/recognized-organization',
      name: 'RecognizedOrganization',
      component: RecognizedOrganization
    },
    {
      path: '/wgb-list',
      name: 'WGBList',
      component: WGBList
    },
    {
      path: '/tokyo-wgb-list',
      name: 'TokyoWgbList',
      component: TokyoWgbList
    },
    {
      path: '/ship',
      name: 'Ship',
      component: Ship
    },
    {
      path: '/inspection',
      name: 'Inspection',
      component: Inspection
    },
    {
      path: '/pmoudefcodes/thetis/:group',
      name: 'Thetis',
      component: Thetis
    },
    {
      path: '/rca-codes/:group',
      name: 'RCACodes',
      component: RCACodes
    },
    {
      path: '/action-codes/:group',
      name: 'ActionCodes',
      component: ActionCodes
    },
    {
      path: '/accident',
      name: 'Accident',
      component: Accident
    }
  ]
})
