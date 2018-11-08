import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({

    state: {
        countryFlags: [],
        recognizedOrganizations: [],
        companies:[],
        typeOfShip:[],
        ships:[],
        allRcaCodes:[],
        mounames: [
            { mouName:'Paris MOU', mouId:1 },
            { mouName:'Tokyo MOU', mouId:2 },
            { mouName:'Carribean MOU', mouId:3 },
            { mouName:'Mediterranean MOU', mouId:4 },
            { mouName:'Vina Del Mar MOU', mouId:5 },
            { mouName:'Us Coast Guard MOU', mouId:6 },
            { mouName:'Indian Ocean MOU', mouId:7 },
            { mouName:'Riyadh MOU', mouId:8 }
        ],
        thetisGroupRuterData: [
            { routeId: '01-011', group:'01 - Certificates & Documentation', subGroup:'011 - Certificates & Documentation - Ship Certificate' },
            { routeId: '01-012', group:'01 - Certificates & Documentation', subGroup:'012 - Certificates & Documentation - Crew Certificate' },
            { routeId: '01-013', group:'01 - Certificates & Documentation', subGroup:'013 - Certificates and Documentation – Document' },
            { routeId: '02-020', group:'02 - Structural condition', subGroup:'' },
            { routeId: '03-030', group:'03 - Water/Weathertight condition', subGroup:'' },
            { routeId: '04-040', group:'04 - Emergency Systems', subGroup:'' },
            { routeId: '05-050', group:'05 - Radio communication', subGroup:'' },
            { routeId: '06-060', group:'06 - Cargo operations including equipment', subGroup:'' },
            { routeId: '07-070', group:'07 - Fire safety', subGroup:'' },
            { routeId: '08-080', group:'08 – Alarms', subGroup:'' },
            { routeId: '09-091', group:'09 - Working and Living Conditions', subGroup:'091 - Working and Living Conditions - Living conditions' },
            { routeId: '09-092', group:'09 - Working and Living Conditions', subGroup:'092 - Working and Living Conditions - Working Conditions' },
            { routeId: '10-100', group:'10 - Safety of Navigation', subGroup:'' },
            { routeId: '11-110', group:'11 - Life saving appliances', subGroup:'' },
            { routeId: '12-120', group:'12 - Dangerous Goods', subGroup:'' },
            { routeId: '13-130', group:'13 - Propulsion and auxiliary machinery', subGroup:'' },
            { routeId: '14-141', group:'14 - Pollution Prevention', subGroup:'141 - Pollution Prevention - MARPOL Annex I' },
            { routeId: '14-142', group:'14 - Pollution Prevention', subGroup:'142 - Pollution Prevention - MARPOL Annex II' },
            { routeId: '14-143', group:'14 - Pollution Prevention', subGroup:'143 - Pollution Prevention - MARPOL Annex III' },
            { routeId: '14-144', group:'14 - Pollution Prevention', subGroup:'144 - Pollution Prevention - MARPOL Annex IV' },
            { routeId: '14-145', group:'14 - Pollution Prevention', subGroup:'145 - Pollution Prevention - MARPOL Annex V' },
            { routeId: '14-146', group:'14 - Pollution Prevention', subGroup:'146 - Pollution Prevention - MARPOL Annex VI' },
            { routeId: '14-147', group:'14 - Pollution Prevention', subGroup:'147 - Pollution Prevention - Anti Fouling' },
            { routeId: '14-148', group:'14 - Pollution Prevention', subGroup:'148 - Pollution Prevention – Ballast Water' },
            { routeId: '15-150', group:'15 – ISM', subGroup:'' },
            { routeId: '16-160', group:'16 - ISPS', subGroup:'' },
            { routeId: '18-181', group:'18 - MLC, 2006', subGroup:'181 - Minimum requirements to work on a ship' },
            { routeId: '18-182', group:'18 - MLC, 2006', subGroup:'182 - Conditions of employment' },
            { routeId: '18-183', group:'18 - MLC, 2006', subGroup:'183 - Accommodation, recreational facilities, food and catering' },
            { routeId: '18-184', group:'18 - MLC, 2006', subGroup:'184 - Health protection, medical care, social security' },
            { routeId: '99-990', group:'99  – Other', subGroup:'' }
        ],
        rootCauseCodes: [
            { routeId: 'rca-pr', group:'People Related', subGroup:'1 - People Related'},
            { routeId: 'rca-mr', group:'Monitoring Related', subGroup:'2 - Monitoring Related'},
            { routeId: 'rca-rr', group:'Resources Related', subGroup:'3 - Resources Related'}
        ],

        actionCodes: [
            { routeId: 'action-PSC', group:'PSC', subGroup:'PSC'},
            { routeId: 'action-USCG', group:'USCG', subGroup:'USCG'},
            { routeId: 'action-TOKYO', group:'TOKYO', subGroup:'TOKYO'}
        ],
        eventTypes: [
            {eventName: 'Accident', eventId: 1},
            {eventName: 'Incident', eventId: 2},
            {eventName: 'Near miss', eventId: 3},
            {eventName: 'Other', eventId: 4}
        ],
        occurenceTypes: [
            {occurenceName:'Allisions',piExtraField:'PI014',occurenceId:1},
            {occurenceName:'Ballast water management violation',piExtraField:'PI015',occurenceId:2},
            {occurenceName:'Cargo related',piExtraField:'',occurenceId:3},
            {occurenceName:'Collisions',piExtraField:'PI022',occurenceId:4},
            {occurenceName:'Criminal offences',piExtraField:'',occurenceId:5},
            {occurenceName:'Drug & Alcohol abuse',piExtraField:'PI020',occurenceId:6},
            {occurenceName:'Environmental - Release of substances to the environment',piExtraField:'PI053',occurenceId:7},
            {occurenceName:'Explosion',piExtraField:'PI028',occurenceId:8},
            {occurenceName:'Fatalities due to injuries',piExtraField:'',occurenceId:9},
            {occurenceName:'Fatalities due to sickness',piExtraField:'',occurenceId:10},
            {occurenceName:'Fire incidents',piExtraField:'PI032',occurenceId:11},
            {occurenceName:'Groundings',piExtraField:'PI033',occurenceId:12},
            {occurenceName:'HR related',piExtraField:'',occurenceId:13},
            {occurenceName:'Navigational',piExtraField:'',occurenceId:14},
            {occurenceName:'Operational related injuries',piExtraField:'',occurenceId:15},
            {occurenceName:'Other',piExtraField:'',occurenceId:16},
            {occurenceName:'Permanent partial disabilities',piExtraField:'',occurenceId:17},
            {occurenceName:'Permanent total disabilities (PTD)',piExtraField:'',occurenceId:18},
            {occurenceName:'Safety - personal protective equipment',piExtraField:'',occurenceId:19},
            {occurenceName:'Sickness',piExtraField:'',occurenceId:20},
            {occurenceName:'Spills - contained spills of bulk liquid',piExtraField:'PI024',occurenceId:21},
            {occurenceName:'Spills - severe spills of bulk liquid',piExtraField:'PI055',occurenceId:22},
            {occurenceName:'Violations',piExtraField:'',occurenceId:23},
        ]
    },

    mutations: {
        setCountryFlags(state, countryFlags) {
         const data = countryFlags;
          for(let key in data) {
               const tt = data[key]
               state.countryFlags.push(tt)
          }
        },
        setRecognizedOrganizations(state, recognizedOrganizations) {
            const data = recognizedOrganizations;
             for(let key in data) {
                  const tt = data[key]
                  state.recognizedOrganizations.push(tt)
             }
        },
        setCompanies(state, companies) {
            const data = companies;
             for(let key in data) {
                  const tt = data[key]
                  state.companies.push(tt)
             }
        },
        setTypeOfShip(state, typeOfShip) {
            const data = typeOfShip;
             for(let key in data) {
                  const tt = data[key]
                  state.typeOfShip.push(tt)
             }
        },
        setShips(state, ships) {
            const data = ships;
             for(let key in data) {
                  const tt = data[key]
                  state.ships.push(tt)
             }
        },
        setAllRcaCodes(state, allRcaCodes) {
            const data = allRcaCodes;
             for(let key in data) {
                  const tt = data[key]
                  state.allRcaCodes.push(tt.codeDescription)
             }
        }

    }
})

