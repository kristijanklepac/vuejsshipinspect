<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-md text-xs-justify>
    <v-layout row wrap>

    <v-content>
      <!--- tu ide komp -->
     <v-dialog v-model="dialog" :persistent="true" max-width="600px">
      <!--<v-btn color="primary" dark slot="activator" class="mb-2">New Inspection</v-btn>-->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <input type="hidden" v-model="editedItem.inspectionId" />
                <p>ID: {{editedItem.inspectionId}}</p>
              </v-flex>
              <v-flex xs12 sm6 md12>
                
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
                    @change="chShipName"
                    
                    ></v-select>

              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Port Of Inspection" v-model="editedItem.portOfInspection" :rules="[v => !!v || 'Item is required']"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md12 mt-2>
                
                <v-select
                    :items="mounames"
                    :filter="mouFilter"
                    v-model="editedItem.mouName"
                    item-text="mouName"
                    item-value="mouId"
                    required
                    label="Select MOU"
                    :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    
                    ></v-select>

              </v-flex>

              <v-flex xs12 sm6 md12 mt-2>
                <v-spacer></v-spacer>
              <v-date-picker :max="maxDate" full-width v-model="editedItem.dateOfInspection" :landscape="landscape" :reactive="reactive"></v-date-picker>
             <v-spacer></v-spacer>
             </v-flex>

              

              <v-flex xs12 sm6 md12 mt-4>
                
                <v-checkbox :label="`Vessel Detained: ${editedItem.vesselDetained.toString()}`" v-model="editedItem.vesselDetained"></v-checkbox>

              </v-flex>

              <v-flex xs12 sm6 md12>
                
                <v-checkbox :label="`Refusal Of Access: ${editedItem.refusalOfAccess.toString()}`" v-model="editedItem.refusalOfAccess"></v-checkbox>

              </v-flex>

            <input type="hidden" v-model="editedItem.ismDefiencies" />
            <input type="hidden" v-model="editedItem.nonIsmDefiencies" />
            <input type="hidden" v-model="editedItem.totalDefiencies" />
            <input type="hidden" v-model="editedItem.followUpRectified" />
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save" :disabled="disabled">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



<v-card class="mt-5">

<v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h1>Ship Inspections</h1></v-toolbar-title>
          <v-spacer></v-spacer>
           <v-btn color="teal"
      class="white--text" @click.native.stop="dialog = true">NEW INSPECTION <v-icon right dark>cloud_upload</v-icon></v-btn>
        </v-toolbar>
<v-card-title>
      
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
   
  
    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :disable-initial-sort="true"
      :items="items"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg4
      >
        <v-card>
          <v-card-title><h2>{{ props.item.shipNameText }}</h2>
          </v-card-title>
         
      
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
               
              <v-list-tile-content><h4>Port of Inspection:</h4></v-list-tile-content>
              <v-list-tile-content class="align-end"><h3>{{ props.item.portOfInspection }}</h3></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Date of Inspection:</h4></v-list-tile-content>
              <v-list-tile-content class="align-end"><strong>{{ props.item.dateOfInspection1 }}</strong></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>MOU:</h4></v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.mouNameText }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="teal lighten-5 pt-1">
                <v-list-tile-content >
                  <v-chip outline color="primary" class="mx-0 curpoint">
                    <v-avatar class="curpoint">
                      <v-icon>edit</v-icon>
                    </v-avatar>
                    <span class="curpoint">ISM Defiencies:</span>
                  </v-chip>
                </v-list-tile-content>
              <v-list-tile-content class="align-end"> <v-chip color="teal lighten-3" text-color="black">{{ props.item.ismDefiencies }}</v-chip></v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="teal lighten-5">
                <v-list-tile-content >
                  <v-chip outline color="primary" class="mx-0 curpoint">
                    <v-avatar class="curpoint">
                      <v-icon>edit</v-icon>
                    </v-avatar>
                    <span class="curpoint">NONISM Defiencies:</span>
                  </v-chip>
                </v-list-tile-content>
              <v-list-tile-content class="align-end"> <v-chip color="teal lighten-2" text-color="black">{{ props.item.nonIsmDefiencies }}</v-chip></v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="teal lighten-5 pb-1">
                <v-list-tile-content>
                  <v-chip outline disabled color="lightgray" class="mx-0">
                    <v-avatar>
                      <v-icon>close</v-icon>
                    </v-avatar>
                    <span>Total Defiencies:</span>
                  </v-chip>
                </v-list-tile-content>
              <v-list-tile-content class="align-end"> <v-chip color="teal lighten-1" text-color="black">{{ props.item.totalDefiencies }}</v-chip></v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Vessel Detained:</h4></v-list-tile-content>
              <v-list-tile-content class="align-end">
                
                <v-chip :class="[ props.item.vesselDetained ? 'red lighten-1' : 'green lighten-1' ]">
                  {{ props.item.vesselDetainedText }}
                </v-chip>
                  
                  </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content><h4>Refusal Of Access:</h4></v-list-tile-content>
              <v-list-tile-content 
              class="align-end" >
              
              <v-chip :class="[ props.item.refusalOfAccess ? 'red lighten-1' : 'green lighten-1' ]">
                
                {{ props.item.refusalOfAccessText }}</v-chip>
              
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content><h4>Follow up Rectified:</h4></v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.followUpRectified }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
                  <v-spacer></v-spacer>
                  
                  <v-btn icon small @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon small @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
                </v-card-actions>
          
        </v-card>
      </v-flex>
    </v-data-iterator>
  
  
</v-card>
  
    
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
export default {
  components: {
    NavigationDrawer,
    NavigationDrawerRight,
    MainFooter
  },
  data () {
    return {
      apiController:'Inspection',
      search: '',
      rowsPerPageItems: [3, 6, 12, 24],
      pagination: {
        rowsPerPage: 3
      },
      items: [],
        maxDate:new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString().slice(0, 10).replace(/-/g, '-'),
        disabled: true,
        dialog:false,
        editedIndex: -1,
        picker: null,
        landscape: true,
        reactive: true,
        editedItem: {
          inspectionId:'',
          shipName:'',
          shipName1:'',
          shipNameText:'',
          portOfInspection:'',
          dateOfInspection:null,
          mouName:'',
          mouName1:'',
          mouNameText:'',
          ismDefiencies:0,
          nonIsmDefiencies:0,
          totalDefiencies:0,
          vesselDetained:false,
          refusalOfAccess:false,
          followUpRectified:'',
        },
        defaultItem: {
          inspectionId:'',
          shipName:'',
          shipName1:'',
          shipNameText:'',
          portOfInspection:'',
          dateOfInspection:null,
          mouName:'',
          mouName1:'',
          mouNameText:'',
          ismDefiencies:0,
          nonIsmDefiencies:0,
          totalDefiencies:0,
          vesselDetained:false,
          refusalOfAccess:false,
          followUpRectified:'',
        },
        mounames:[],
        mouFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.mouName)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
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
  created() {
      this.ships = [];
      const sh = this.$store.state.ships;
      this.ships = sh;

      this.mounames = [];
      const mn = this.$store.state.mounames;
      this.mounames = mn;

      this.items = []
        var vm = this;
        axios.get('/api/Inspection', {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
         const data = response.data; // readonly
          for(let key in data) {
               const tt = data[key]

              //tt.inspectionId = 

               console.log('dgdfgdf',tt)

             if(parseInt(tt.shipName) > 0) {

                 const shipNameText = vm.findObjectByKey(vm.ships, 'shipId', parseInt(tt.shipName));

                 tt.shipNameText = shipNameText.shipName;

              } else {

                 tt.shipNameText = 'Not Set';
              }

              if(tt.dateOfInspection !== null || tt.dateOfInspection !='') {

                tt.dateOfInspection1 = new Date(tt.dateOfInspection+'Z').toLocaleDateString()
              }

              if(tt.vesselDetained === true) {

                tt.vesselDetainedText = "YES"
              } else {
                tt.vesselDetainedText = "NO"
              }

              if(tt.refusalOfAccess === true) {

                tt.refusalOfAccessText = "YES"
              } else {
                tt.refusalOfAccessText = "NO"
              }

              if(parseInt(tt.mouName) > 0) {

                 const mouNameText = vm.findObjectByKey(vm.mounames, 'mouId', parseInt(tt.mouName));

                 tt.mouNameText = mouNameText.mouName;

              } else {

                 tt.mouNameText = 'Not Set';
              }


               vm.items.push(tt)

          }

         })


      var now = new Date();
      var todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
      var tt = todayUTC.toISOString().slice(0, 10).replace(/-/g, '-');

      console.log(tt)

      if(this.editedItem.dateOfInspection === null) {

        this.editedItem.dateOfInspection = tt;

      }

  },
  computed: { 
      isDescending () { return function isDescending(val) { val = true; return true; } },
      formTitle () {
        return this.editedIndex === -1 ? 'New Inspection' : 'Edit Inspection'
      }
    },
  methods: {
    chShipName() {

      console.log('chsk',this.editedItem.shipName)

    },
    ismClick(prop) {

      console.log('ismprop',prop)

    },

    nonIsmClick(prop) {

      console.log('nonismprop',prop)

    },

    findObjectByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        },

      editItem (item) { //console.log(this.editedIndex)

        this.editedIndex = this.items.indexOf(item)

        this.editedItem = Object.assign({}, item)

        var now = new Date(this.editedItem.dateOfInspection);
        var todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        var nd = todayUTC.toISOString().slice(0, 10).replace(/-/g, '-');

        this.editedItem.dateOfInspection = nd;

        if(parseInt(this.editedItem.shipName) > 0) {

                 const shipNameText = this.findObjectByKey(this.ships, 'shipId', parseInt(this.editedItem.shipName));

                 this.editedItem.shipName = shipNameText.shipId ;

        }

        if(parseInt(this.editedItem.mouName) > 0) {

                 const mouNameText = this.findObjectByKey(this.mounames, 'mouId', parseInt(this.editedItem.mouName));

                 this.editedItem.mouName = mouNameText.mouId ;

        }

        console.log('editme',this.editedItem)

        this.dialog = true;

      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save() {

        if (this.editedIndex > -1) { // PUT

        

           // ISM defiencies prenesi iz original axios responsa za taj brod (prevent client to update)

           // NONISM defiencies prenesi iz original axios responsa za taj brod (prevent client to update)

           // TOTAL defiencies prenesi iz original axios responsa za taj brod (prevent client to update)

           const def = this.findObjectByKey(this.items, 'inspectionId', parseInt(this.editedItem.inspectionId));

           if(parseInt(def.ismDefiencies) > 0) {

               def.ismDefiencies = def.ismDefiencies;

           } else {

               def.ismDefiencies = 0;

           }

           if(parseInt(def.nonIsmDefiencies) > 0) {

               def.nonIsmDefiencies = def.nonIsmDefiencies;

           } else {

               def.nonIsmDefiencies = 0;
               
           }

           /*alert(parseInt(def.totalDefiencies));

           alert(parseInt(def.ismDefiencies));

           alert(parseInt(def.nonIsmDefiencies));*/


           if(parseInt(def.totalDefiencies) > 0 && (parseInt(def.totalDefiencies) == (parseInt(def.nonIsmDefiencies) + parseInt(def.ismDefiencies)) )) {

               def.totalDefiencies = def.totalDefiencies;

           } else {

               def.totalDefiencies = parseInt(def.nonIsmDefiencies) + parseInt(def.ismDefiencies);
               
           }


         const formDataPut = {
            inspectionId: this.editedItem.inspectionId,
            shipName:this.editedItem.shipName,
            dateOfInspection: this.editedItem.dateOfInspection,
            vesselDetained: this.editedItem.vesselDetained,
            refusalOfAccess: this.editedItem.refusalOfAccess,
            portOfInspection: this.editedItem.portOfInspection,
            mouName: this.editedItem.mouName,
            ismDefiencies:def.ismDefiencies,
            nonIsmDefiencies:def.nonIsmDefiencies,
            totalDefiencies:def.totalDefiencies,
            followUpRectified: def.followUpRectified,        
          }
           
          //console.log('putsave', formDataPut)

          var vm = this;
          //console.log('puut', formDataPut)
          axios.put('/api/'+this.apiController+'/'+this.editedItem.inspectionId, formDataPut)
                    .then(response => {

                      if(parseInt(vm.editedItem.shipName) > 0) {

                              const shipNameText = this.findObjectByKey(vm.ships, 'shipId', parseInt(vm.editedItem.shipName));

                              vm.editedItem.shipName = shipNameText.shipId ;

                              vm.editedItem.shipNameText = shipNameText.shipName;

                      }

                      if(parseInt(vm.editedItem.mouName) > 0) {

                              const mouNameText = this.findObjectByKey(vm.mounames, 'mouId', parseInt(vm.editedItem.mouName));

                              vm.editedItem.mouName = mouNameText.mouId ;
                              vm.editedItem.mouNameText = mouNameText.mouName ;

                      }

                      if(vm.editedItem.dateOfInspection !== null || vm.editedItem.dateOfInspection !='') {

                        vm.editedItem.dateOfInspection1 = new Date(vm.editedItem.dateOfInspection+'Z').toLocaleDateString()
                      }

                      if(vm.editedItem.vesselDetained === true) {

                        vm.editedItem.vesselDetainedText = "YES"
                      } else {
                        vm.editedItem.vesselDetainedText = "NO"
                      }

                      if(vm.editedItem.refusalOfAccess === true) {

                        vm.editedItem.refusalOfAccessText = "YES"
                      } else {
                        vm.editedItem.refusalOfAccessText = "NO"
                      }

                        const editem = Object.assign(vm.items[vm.editedIndex], vm.editedItem)

                    }).catch(error => {
                        console.log(error);
                    });



        } else {  // POST

        const formDataPost = {
            
            shipName:this.editedItem.shipName,
            dateOfInspection: this.editedItem.dateOfInspection,
            vesselDetained: this.editedItem.vesselDetained,
            refusalOfAccess: this.editedItem.refusalOfAccess,
            portOfInspection: this.editedItem.portOfInspection,
            mouName: this.editedItem.mouName,
            ismDefiencies:0,
            nonIsmDefiencies:0,
            totalDefiencies:0,
            followUpRectified:'', 

          }

          console.log('fdp',formDataPost)
          var vm = this;
          axios.post('/api/'+this.apiController, formDataPost)
                    .then(response => {
                        //console.log('eee',response);
                        const data = response.data;
                        const table = [];
                        const tt = vm.editedItem;

                        tt.inspectionId = response.data.inspectionId;
                        tt.shipName = response.data.shipName;
                        tt.dateOfInspection= response.data.dateOfInspection;
                        tt.vesselDetained= response.data.vesselDetained;
                        tt.refusalOfAccess= response.data.refusalOfAccess;
                        tt.portOfInspection= response.data.portOfInspection;
                        tt.mouName= response.data.mouName;
                        tt.ismDefiencies=0;
                        tt.nonIsmDefiencies=0;
                        tt.totalDefiencies=0;
                        tt.followUpRectified='';

                         if(parseInt(vm.editedItem.shipName) > 0) {

                              const shipNameText = this.findObjectByKey(vm.ships, 'shipId', parseInt(vm.editedItem.shipName));

                              tt.shipName = shipNameText.shipId ;

                              tt.shipNameText = shipNameText.shipName;

                      }

                      if(parseInt(vm.editedItem.mouName) > 0) {

                              const mouNameText = this.findObjectByKey(vm.mounames, 'mouId', parseInt(vm.editedItem.mouName));

                              tt.mouName = mouNameText.mouId ;
                              tt.mouNameText = mouNameText.mouName ;

                      }

                      if(vm.editedItem.dateOfInspection !== null || vm.editedItem.dateOfInspection !='') {

                        tt.dateOfInspection1 = new Date(vm.editedItem.dateOfInspection+'Z').toLocaleDateString()
                      }

                      if(vm.editedItem.vesselDetained === true) {

                        tt.vesselDetainedText = "YES"
                      } else {
                        tt.vesselDetainedText = "NO"
                      }

                      if(vm.editedItem.refusalOfAccess === true) {

                        tt.refusalOfAccessText = "YES"
                      } else {
                        tt.refusalOfAccessText = "NO"
                      }

                        vm.items.unshift(tt)

                    }).catch(error => {
                        console.log(error);
                    });


        }

        //console.log('save', this.editedItem)

         this.close()

      }
  },

  watch: {

    

  editedItem: {
     handler(val){
       // do stuff
       //alert("change");

       console.log('change',this.editedItem)

       if(  
            this.editedItem.shipName != '' &&
            this.editedItem.dateOfInspection != '' &&
            
            this.editedItem.portOfInspection != '' &&
            this.editedItem.mouName != '' &&
            parseInt(this.editedItem.ismDefiencies) >= 0 &&
            parseInt(this.editedItem.nonIsmDefiencies) >= 0 &&
            parseInt(this.editedItem.totalDefiencies) >= 0 
              ) {

          this.disabled = false;

        } else {

          this.disabled = true;

        }

       
       
        
      

     },
     deep: true
  }
},
  name: 'Inspection'
}
</script>
<style scoped>

.curpoint { cursor: pointer}
.backred { background:red; color:white;}
.backgreen { background:green; color:white;}
</style>