<template>

  <div>
    
    <navigation-drawer></navigation-drawer>
<v-container grid-list-xs text-xs-left>
    <v-layout row wrap>


    <v-content>

    <template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
      <v-card style="background:lemonchiffon">
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
<v-card-text>


         <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6 md4>
                <v-select
                    :items="ships"
                    :filter="shipsFilter"
                    v-model="editedItem.shipName"
                    item-text="shipName"
                    item-value="shipId"
                    required
                    label="Select Ship"
                    :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    hint="Select Ship Name"
                    persistent-hint
                    
                    ></v-select>{{editedItem.shipName}}
              </v-flex>
              <v-flex xs12 sm6 md5>
              </v-flex>
                <v-flex xs12 sm6 md3>
                            <v-menu
                                ref="menu"
                                lazy
                                :close-on-content-click="false"
                                v-model="menu"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-right="40"
                                min-width="290px"
                            >
                                <v-text-field
                                slot="activator"
                                label="Accident date (YYYY-MM-DD)"
                                v-model="editedItem.accidentDate"
                                prepend-icon="event"
                                readonly
                                ></v-text-field>

                                <v-date-picker
                                ref="picker"
                                v-model="editedItem.accidentDate"
                                @change="saved"
                                min="2014-01-01"
                                :max="new Date().toISOString().substr(0, 10)"
                                ></v-date-picker>

                            </v-menu>{{editedItem.accidentDate}}
                </v-flex>
              </v-layout>
              <v-layout row wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Master" hint="Please insert name of Master"
                  persistent-hint></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field 
                  label="Chief Engineer"
                  hint="Please insert name of Chief Engineer"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              </v-layout>
              <v-layout row wrap>
              
              <v-flex xs12 sm12 md12>
                <v-text-field  label="Place" required></v-text-field>
              </v-flex>
                </v-layout>
              <v-layout row wrap>
              
              <v-flex xs12 sm6 md6>
                <v-select 
                  label="Type of Event"
                  v-model="editedItem.typeOfEvent"
                  :items="eventitems"
                  item-text="eventName"
                  item-value="eventId"
                  :filter="eventTypeFilter"
                  :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    hint="Type to autocomplete!"
                    persistent-hint
                ></v-select>{{editedItem.typeOfEvent}}
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-select 
                  label="Type of Occurence"
                  v-model="editedItem.typeOfOccurence"
                  :items="occurenceitems"
                  :filter="occurenceTypeFilter"
                  item-text="occurenceName"
                  item-value="occurenceId"
                  :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    hint="Type to autocomplete!"
                    persistent-hint
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select box
                  label="RCA"
                  v-model="editedItem.rca"
                  multiple
                  autocomplete
                  chips
                  :items="rcaitems"
                ></v-select>{{editedItem.rca}}
              </v-flex>

              </v-layout>

              <v-layout row wrap class="mt-5">

              <v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h2>Description of Event</h2></v-toolbar-title>
          <v-spacer></v-spacer>
        
        </v-toolbar>

              <v-flex xs12>
              

              <vue-editor style="background:white;" id="control_action" v-model="editedItem.descriptionOfEvent"></vue-editor>
            </v-flex>


            </v-layout>

              <v-layout row wrap class="mt-5">

              <v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h1>Control Actions</h1></v-toolbar-title>
          <v-spacer></v-spacer>
        
        </v-toolbar>

              
                <v-flex xs12 sm6 md3>
                <div class="subheading"><h2>Control Due Date</h2></div>
                    <v-date-picker full-width v-model="editedItem.controlDueDate"></v-date-picker>
                </v-flex>

                <v-flex xs12 sm6 md3>
                <div class="subheading"><h2>Control Done Date</h2></div>
                    <v-date-picker full-width v-model="editedItem.controlDoneDate"></v-date-picker>
                </v-flex>

                <v-flex xs12 sm12 md86>
              
<div class="subheading"><h2>Control Description</h2></div>
              <vue-editor style="background:white;" id="corrective_action" v-model="editedItem.descriptionOfEvent"></vue-editor>
            </v-flex>
             

                </v-layout>

              <v-layout row wrap class="mt-5">

              <v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h2>Corrective Actions</h2></v-toolbar-title>
          <v-spacer></v-spacer>
        
        </v-toolbar>

              
                <v-flex xs12 sm6 md3>
                <div class="subheading"><h2>Corrective Due Date</h2></div>
                    <v-date-picker full-width v-model="editedItem.correctiveDueDate"></v-date-picker>
                </v-flex>

                <v-flex xs12 sm6 md3>
                <div class="subheading"><h2>Corrective Done Date</h2></div>
                    <v-date-picker full-width v-model="editedItem.correctiveDoneDate"></v-date-picker>
                </v-flex>

                <v-flex xs12 sm12 md12>
              <div class="subheading"><h2>Corrective Description</h2></div>

              <vue-editor style="background:white;" id="preventive_action" v-model="editedItem.descriptionOfEvent"></vue-editor>
            </v-flex>
             

                </v-layout>

                <v-layout row wrap class="mt-5">

              <v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h2>Preventive Actions</h2></v-toolbar-title>
          <v-spacer></v-spacer>
        
        </v-toolbar>

              
                <v-flex xs12 sm6 md3>
                <div class="subheading"><h2>Preventive Due Date</h2></div>
                    <v-date-picker full-width v-model="editedItem.preventiveDueDate"></v-date-picker>
                </v-flex>

                <v-flex xs12 sm6 md3>
                <div class="subheading"><h2>Preventive Done Date</h2></div>
                    <v-date-picker full-width v-model="editedItem.preventiveDoneDate"></v-date-picker>
                </v-flex>

                <v-flex xs12 sm12 md12>
              <div class="subheading"><h2>Preventive Description</h2></div>

              <vue-editor style="background:white;" id="description_of_event" v-model="editedItem.descriptionOfEvent"></vue-editor>
            </v-flex>
             

                </v-layout>

                <v-layout row wrap class="mt-5">

              <v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h2>Lesson learned</h2></v-toolbar-title>
          <v-spacer></v-spacer>
        
        </v-toolbar>

              <v-flex xs12>
              

              <vue-editor style="background:white;" id="lesson_learned" v-model="editedItem.descriptionOfEvent"></vue-editor>
            </v-flex>


            </v-layout>

          </v-container>
          <small>*indicates required field</small>
     </v-card-text>   
      </v-card>
    </v-dialog>
  </v-layout>
</template>




      <template>

    

  <v-card class="mt-5">
    <v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h1>Accidents</h1></v-toolbar-title>
          <v-spacer></v-spacer>
           <v-btn color="teal"
      class="white--text" @click.native.stop="dialog = true">NEW Accident<v-icon right dark>add</v-icon></v-btn>
        </v-toolbar>
    <v-card-title>
      Accidents
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :rows-per-page-items="rppi"
    >
      <template slot="items" slot-scope="props">
        
        <td class="text-xs-left">{{ props.item.shipNameId }}</td>
        <td class="text-xs-left">{{ props.item.master }}</td>
        <td class="text-xs-left">{{ props.item.chiefEngineer }}</td>
        <td class="text-xs-left">{{ props.item.place }}</td>
        <td class="text-xs-left">{{ props.item.accidentDate }}</td>
        <td class="text-xs-left">{{ props.item.typeOfEvent }}</td>
        <td class="text-xs-left">{{ props.item.typeOfOccurence }}</td>
        <td class="text-xs-left">{{ props.item.rca }}</td>

        <td class="text-xs-right px-4">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>

      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>

  <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :color="'success'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbarSuccess"
    >
      {{ textSuccess }}
      <v-btn flat color="white" @click.native="snackbarSuccess = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :color="'error'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbarError"
    >
      {{ textError }}
      <v-btn flat color="white" @click.native="snackbarError = false">Close</v-btn>
    </v-snackbar>

</template>
    </v-content>

    </v-layout>
    </v-container>

    <navigation-drawer-right></navigation-drawer-right>
      
    <main-footer></main-footer>

  </div>
  
</template>

<script>
import axios from 'axios'
import NavigationDrawer from '@/components/NavigationDrawer'
import NavigationDrawerRight from '@/components/NavigationDrawerRight'
import MainFooter from '@/components/MainFooter'
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    NavigationDrawer,
    NavigationDrawerRight,
    MainFooter,
    VueEditor
  },
  data () {
    return {
        date: null,
    menu: false,
         lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
        rcaitems:[],
        occurenceitems:[],
        eventitems:[],
        snackbarSuccess: false,
        snackbarError: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        textSuccess: 'Your data are saved!',
        textError: 'Data deleted!',
        apiController: 'Accident',
        rppi: [10,30,40,50,100,150, {"text":"All","value":-1}],
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        search: '',
        headers: [
        /*{
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'flagId'
        },*/
        /*{ text: 'Flag Name', align: 'left', value: 'flagName' },
        { text: 'Flag Country', align: 'center', value: 'flagCountry' },
        { text: 'Actions', align: 'right', value: 'flagId', sortable: false }*/

        
        { text:'Ship Name', align: 'left', value: 'shipNameId' },
        { text:'Master', align: 'left', value: 'master' },
        { text:'Chief Engineer', align: 'left', value: 'chiefEngineer' },
        { text:'Place', align: 'left', value: 'place' },
        { text:'Accident Date', align: 'left', value: 'accidentDate' },
        { text:'Type of Event', align: 'left', value: 'typeOfEvent' },
        { text:'Type of Occurence', align: 'left', value: 'typeOfOccurence' },
        
        { text:'RCA', align: 'left', value: 'rca' },
        { text: 'Actions', align: 'right', value: 'AccidentId', sortable: false }
        
      ],
        items: [],
        editedIndex: -1,
      editedItem: {
        accidentId: '',
        shipNameId: '',
        master: '',
        chiefEngineer: '',
        place: '',
        accidentDate: '',
        typeOfEvent: '',
        typeOfOccurence: '',
        descriptionOfEvent: '',
        rca: '',
        controlAction: '',
        controlUpload: '',
        controlDueDate: '',
        controlDoneDate: '',
        controlRectified: '',
        correctiveAction: '',
        correctiveUpload: '',
        correctiveDueDate: '',
        correctiveDoneDate: '',
        correctiveRectified: '',
        preventiveAction: '',
        preventiveUpload: '',
        preventiveDueDate: '',
        preventiveDoneDate: '',
        preventiveRectified: '',
        leassonLearned: ''
      },
      defaultItem: {
        accidentId: '',
        shipNameId: '',
        master: '',
        chiefEngineer: '',
        place: '',
        accidentDate: '',
        typeOfEvent: '',
        typeOfOccurence: '',
        descriptionOfEvent: '',
        rca: '',
        controlAction: '',
        controlUpload: '',
        controlDueDate: '',
        controlDoneDate: '',
        controlRectified: '',
        correctiveAction: '',
        correctiveUpload: '',
        correctiveDueDate: '',
        correctiveDoneDate: '',
        correctiveRectified: '',
        preventiveAction: '',
        preventiveUpload: '',
        preventiveDueDate: '',
        preventiveDoneDate: '',
        preventiveRectified: '',
        leassonLearned: ''
      },
      ships:[],
        shipsFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.shipName)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },
      
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Accident' : 'Edit Accident'
      }
    },
  created() {
        this.ships = [];
        const sh = this.$store.state.ships;
        this.ships = sh;
        var vm = this;
        this.rcaitems = this.$store.state.allRcaCodes;
        this.eventitems = this.$store.state.eventTypes;
        this.occurenceitems = this.$store.state.occurenceTypes;
        this.items = []
        axios.get('/api/'+this.apiController, {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
          /*console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);*/
          vm.items = response.data;
          
         });

         //console.log('ddd',this.rcaitems)

  },
  methods: {
      saved (date) {
      this.$refs.menu.save(date)
    },

      eventTypeFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.eventName)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },

        occurenceTypeFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.occurenceName)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        //console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        if(confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)) {
            console.log('obrisano', item)
            const formDataDelete = {
                accidentId: item.accidentId,
                shipNameId: item.shipNameId,
                master: item.master,
                chiefEngineer: item.chiefEngineer,
                place: item.place,
                accidentDate: item.accidentDate,
                typeOfEvent: item.typeOfEvent,
                typeOfOccurence: item.typeOfOccurence,
                descriptionOfEvent: item.descriptionOfEvent,
                rca: item.rca,
                controlAction: item.controlAction,
                controlUpload: item.controlUpload,
                controlDueDate: item.controlDueDate,
                controlDoneDate: item.controlDoneDate,
                controlRectified: item.controlRectified,
                correctiveAction: item.correctiveAction,
                correctiveUpload: item.correctiveUpload,
                correctiveDueDate: item.correctiveDueDate,
                correctiveDoneDate: item.correctiveDoneDate,
                correctiveRectified: item.correctiveRectified,
                preventiveAction: item.preventiveAction,
                preventiveUpload: item.preventiveUpload,
                preventiveDueDate: item.preventiveDueDate,
                preventiveDoneDate: item.preventiveDoneDate,
                preventiveRectified: item.preventiveRectified,
                leassonLearned: item.leassonLearned
            }
            axios.delete('/api/'+this.apiController+'/'+item.accidentId, formDataDelete)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(err);
                    });

          this.snackbarError = true;
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          const editem = Object.assign(this.items[this.editedIndex], this.editedItem)
          
          const formDataPut = {
                accidentId: this.editedItem.accidentId,
                shipNameId: this.editedItem.shipNameId,
                master: this.editedItem.master,
                chiefEngineer: this.editedItem.chiefEngineer,
                place: this.editedItem.place,
                accidentDate: this.editedItem.accidentDate,
                typeOfEvent: this.editedItem.typeOfEvent,
                typeOfOccurence: this.editedItem.typeOfOccurence,
                descriptionOfEvent: this.editedItem.descriptionOfEvent,
                rca: this.editedItem.rca,
                controlAction: this.editedItem.controlAction,
                controlUpload: this.editedItem.controlUpload,
                controlDueDate: this.editedItem.controlDueDate,
                controlDoneDate: this.editedItem.controlDoneDate,
                controlRectified: this.editedItem.controlRectified,
                correctiveAction: this.editedItem.correctiveAction,
                correctiveUpload: this.editedItem.correctiveUpload,
                correctiveDueDate: this.editedItem.correctiveDueDate,
                correctiveDoneDate: this.editedItem.correctiveDoneDate,
                correctiveRectified: this.editedItem.correctiveRectified,
                preventiveAction: this.editedItem.preventiveAction,
                preventiveUpload: this.editedItem.preventiveUpload,
                preventiveDueDate: this.editedItem.preventiveDueDate,
                preventiveDoneDate: this.editedItem.preventiveDoneDate,
                preventiveRectified: this.editedItem.preventiveRectified,
                leassonLearned: this.editedItem.leassonLearned
          }
          axios.put('/api/'+this.apiController+'/'+this.editedItem.accidentId, formDataPut)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(err);
                    });
          this.snackbarSuccess = true;
        } else {
          if(this.editedItem.flagName != '' && this.editedItem.flagCountry != '') {
          var vm = this;
          //this.items.push(this.editedItem)
          const formDataPost = {

                shipNameId: this.editedItem.shipNameId,
                master: this.editedItem.master,
                chiefEngineer: this.editedItem.chiefEngineer,
                place: this.editedItem.place,
                accidentDate: this.editedItem.accidentDate,
                typeOfEvent: this.editedItem.typeOfEvent,
                typeOfOccurence: this.editedItem.typeOfOccurence,
                descriptionOfEvent: this.editedItem.descriptionOfEvent,
                rca: this.editedItem.rca,
                controlAction: this.editedItem.controlAction,
                controlUpload: this.editedItem.controlUpload,
                controlDueDate: this.editedItem.controlDueDate,
                controlDoneDate: this.editedItem.controlDoneDate,
                controlRectified: this.editedItem.controlRectified,
                correctiveAction: this.editedItem.correctiveAction,
                correctiveUpload: this.editedItem.correctiveUpload,
                correctiveDueDate: this.editedItem.correctiveDueDate,
                correctiveDoneDate: this.editedItem.correctiveDoneDate,
                correctiveRectified: this.editedItem.correctiveRectified,
                preventiveAction: this.editedItem.preventiveAction,
                preventiveUpload: this.editedItem.preventiveUpload,
                preventiveDueDate: this.editedItem.preventiveDueDate,
                preventiveDoneDate: this.editedItem.preventiveDoneDate,
                preventiveRectified: this.editedItem.preventiveRectified,
                leassonLearned: this.editedItem.leassonLearned
          }
          axios.post('/api/'+this.apiController, formDataPost)
                    .then(response => {
                        console.log('eee',response);
                        vm.items.push(response.data);
                        vm.snackbarSuccess = true;
                    })
                    .catch(error => {
                        console.log(err);
                    });
           
          }
          
        }
        this.close()
      }

  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  name: 'Accident'
}
</script>