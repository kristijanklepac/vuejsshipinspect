<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-xs text-xs-left>
    <v-layout row wrap>

    <v-content>
      <template>

    <v-dialog v-model="dialog" max-width="500px">
      <!--<v-btn color="primary" dark slot="activator" class="mb-2">White Grey Black List - Tokyo MOU</v-btn>-->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <input type="hidden" v-model="editedItem.tokyoWgbListId" />
                <p>ID: {{editedItem.tokyoWgbListId}}</p>
                <input type="hidden" v-model="editedItem.wgbFlag" />
                <input type="hidden" v-model="editedItem.fullCountryName" />
              </v-flex>
              

              <v-flex xs12 sm6 md12>
                    <v-select
                    :items="states"
                    :filter="customFilter"
                    v-model="a1"
                    item-text="flagCountry"
                    required
                    label="Select"
                    :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                <!--<v-text-field label="White / Grey / Black" v-model="editedItem.worGorB"></v-text-field>-->

               
                    <v-select
                    label="Select White / Grey / Black"
                    :items="wgbitems"
                    v-model="editedItem.worGorB"
                    
                    item-value="text"
                    required
                    :rules="[v => !!v || 'Item is required']"
                    ></v-select>
                

              </v-flex>
              <v-flex xs12 sm6 md12 v-if="editedItem.worGorB == 'Black'">
                <!--<v-text-field label="Risk" v-model="editedItem.bmBmthBhBvhr"></v-text-field>-->

                 <v-select
                    label="Select Risk (only for Black Flag List)"
                    :items="riskitems"
                    v-model="editedItem.bmBmthBhBvhr"
                    
                    item-value="text"
                    required
                    :rules="[v => !!v || 'Item is required']"
                    
                    ></v-select>

              </v-flex>

              

              
              
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-card class="mt-5">
    <v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h1>White / Grey / Black Lists - Tokyo MOU</h1></v-toolbar-title>
          <v-spacer></v-spacer>
           <v-btn color="teal"
      class="white--text" @click.native.stop="dialog = true">White / Grey / Black Lists - Tokyo MOU<v-icon right dark>add</v-icon></v-btn>
        </v-toolbar>
    <v-card-title>
      White / Grey / Black Lists - Tokyo MOU
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search by Flag"
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
        <!--<td>{{ props.item.companyId }}</td>-->
        <td class="text-xs-left">{{ props.item.fullCountryName }}</td>
        <td class="text-xs-left">{{ props.item.worGorB }}</td>

        <td class="text-xs-left">
            <span style="background:#ffe0b2; padding:3px;" v-if="props.item.bmBmthBhBvhr == 'Medium Risk'">
            {{ props.item.bmBmthBhBvhr }}
            </span>

            <span style="background:#ffcc80; padding:3px;" v-else-if="props.item.bmBmthBhBvhr == 'Medium To High Risk'">
            {{ props.item.bmBmthBhBvhr }}
            </span>

            <span style="background:#ffb74d; padding:3px;" v-else-if="props.item.bmBmthBhBvhr == 'High Risk'">
            {{ props.item.bmBmthBhBvhr }}
            </span>

            <span style="background:#ffa726; padding:3px;" v-else-if="props.item.bmBmthBhBvhr == 'Very High Risk'">
            {{ props.item.bmBmthBhBvhr }}
            </span>

            <span style="padding:3px;" v-else>
            {{ props.item.bmBmthBhBvhr }}
            </span>
            
        </td>
        

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
export default {
  components: {
    NavigationDrawer,
    NavigationDrawerRight,
    MainFooter
  },
  data () {
    return {
        valid: false,
        validWgb: false,
        validRisk: false,
        validFlagSelect: false,
        wgbitems: [
            {text:'White'},
            {text:'Grey'},
            {text:'Black'}
            
        ],
        riskitems: [
            {text:'Medium Risk'},
            {text:'Medium To High Risk'},
            {text:'High Risk'},
            {text:'Very High Risk'}
            
        ],
        mask: "#####",
        a1: {},
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },
        select: {},
        states: [],
        customFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.flagCountry)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },
        snackbarSuccess: false,
        snackbarError: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        textSuccess: 'Your data are saved!',
        textError: 'Data deleted!',
        apiController: 'TokyoWgbList',
        rppi: [10,20,30,40,50,100,150, {"text":"All","value":-1}],
        dialog: false,
        search: '',
        headers: [
        /*{
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'flagId'
        },*/
        { text: 'Flag', align: 'left', value: 'fullCountryName' },
        { text: 'White / Grey / Black', align: 'left', value: 'worGorB' },
        { text: 'Risk', align: 'left', value: 'bmBmthBhBvhr' },
        
        { text: 'Actions', align: 'right', value: 'tokyoWgbListId', sortable: false }
      ],
        items: [],
        editedIndex: -1,
      editedItem: {
          wgbFlag:'',
          worGorB:'',
          bmBmthBhBvhr:'',
          fullCountryName:''
       
      },
      defaultItem: {
          wgbFlag:'',
          worGorB:'',
          bmBmthBhBvhr:'',
          fullCountryName:''
        
      }
      
    }
  },
  computed: {
      formTitle () {
        
        return this.editedIndex === -1 ? 'New WGB List - Tokyo MOU' : 'Edit WGB List - Tokyo MOU'
      }
    },
  created() {

    // Get Countries
         var vm = this;
         this.states = []
         axios.get('/api/Flag', {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
          /*console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);*/
          vm.states = response.data;
          vm.setItems();
          //console.log('crsr',vm.states)
         });

        

         

  },
  methods: {
      testme(tar) {

          alert('de',tar)
      },

    setItems() {

      this.items = []
        var vm = this;
        axios.get('/api/'+this.apiController, {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
          /*console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);*/
          //vm.items = response.data;
          const testovi = [];
          const data = response.data;
          //console.log('testovi',response.data);
          for(let key in data) {
               const tt = data[key]
               tt.id = key
               //tt.new = data[key].Name
               if(parseInt(data[key].wgbFlag)) {
               const fcn = vm.findObjectByKey(vm.states, 'flagId', parseInt(data[key].wgbFlag) )
               tt.fullCountryName = fcn.flagCountry
               }
               testovi.push(tt)
          }
          //console.log('testovi',testovi);
          vm.items = testovi
         });

        
    },

       findObjectByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        },

      editItem (item) {


        this.editedIndex = this.items.indexOf(item)

        this.editedItem = Object.assign({}, item)
        //console.log('ksdjfksdjf',this.editedItem);

        if(this.editedItem.fullCountryName !== null && this.editedItem.fullCountryName != '') {

            this.validFlagSelect = true;
        }

        if(this.editedItem.worGorB !== null && this.editedItem.worGorB != '') {

            this.validWgb = true;

        }

        if(this.validWgb && this.validFlagSelect) {

            if(this.editedItem.worGorB != "Black") {

                this.valid = true;
                this.validRisk = true;

            } else {

                if(this.editedItem.bmBmthBhBvhr !== null && this.editedItem.bmBmthBhBvhr != '') {

                    this.valid = true;
                    this.validRisk = true;

                } else {

                    this.valid = false;
                    this.validRisk = false;
                }

            }

        } else {

            this.valid = false;

        }

        this.a1 = this.findObjectByKey(this.states, 'flagId', parseInt(this.editedItem.wgbFlag) );
        this.select = this.findObjectByKey(this.states, 'flagId', parseInt(this.editedItem.wgbFlag) );
        this.dialog = true
        
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        if(confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)) {
           // console.log('obrisano', item)
            const formDataDelete = {
                wgbListId: item.wgbListId,
                wgbFlag: item.wgbFlag,
                worGorB: item.worGorB,
                bmBmthBhBvhr: item.bmBmthBhBvhr
                
            }
            axios.delete('/api/'+this.apiController+'/'+item.tokyoWgbListId, formDataDelete)
                    .then(response => {
                        //console.log(response);
                    })
                    .catch(error => {
                        console.log(err);
                    });

          this.snackbarError = true;
        }
      },

      close () {
        this.a1 = {};
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          
          this.editedItem.wgbFlag = this.a1.flagId;
          this.editedItem.fullCountryName = this.a1.flagCountry;

          
            if(this.editedItem.worGorB != "Black" && (this.editedItem.bmBmthBhBvhr !='' || this.editedItem.bmBmthBhBvhr != null) ) {

          this.editedItem.bmBmthBhBvhr ='';
        }

          //console.log(this.editedItem.companyCountry);
        
          const editem = Object.assign(this.items[this.editedIndex], this.editedItem)

         // console.log("save",editem)

          

          //console.log("save",this.editedItem.flagCountry)

          //console.log('testirajedit',this.findObjectByKey(this.states, 'flagName', this.a1.companyCountry ));

          /*this.a1 = this.findObjectByKey(this.states, 'flagName', this.editedItem.companyCountry );
          this.select = this.findObjectByKey(this.states, 'flagName', this.editedItem.companyCountry );*/

          const formDataPut = {
                tokyoWgbListId: this.editedItem.tokyoWgbListId,
                wgbFlag: this.editedItem.wgbFlag,
                worGorB: this.editedItem.worGorB,
                bmBmthBhBvhr: this.editedItem.bmBmthBhBvhr
          }

          console.log('put  ', formDataPut)
          axios.put('/api/'+this.apiController+'/'+this.editedItem.tokyoWgbListId, formDataPut)
                    .then(response => {
                        //console.log(response);
                    })
                    .catch(error => {
                        console.log(err);
                    });
          this.a1 = {};
          this.snackbarSuccess = true;

        } else {

            if(this.a1 !== null) {

               //console.log('flagid',this.a1.flagId);

               const country = this.a1.flagId.toString();

            } else {

                this.close()
            }

            

        if(this.editedItem.worGorB != "Black" && (this.editedItem.bmBmthBhBvhr !='' || this.editedItem.bmBmthBhBvhr != null) ) {

          this.editedItem.bmBmthBhBvhr ='';
        }
            
          /*if(  
                this.editedItem.wgbFlag != '' &&
                this.editedItem.worGorB != ''
             ) {*/
          var vm = this;
          //this.items.push(this.editedItem)
          const formDataPost = {
                
                /*wgbFlagId: this.editedItem.wgbFlagId,*/
                wgbFlag: this.a1.flagId.toString(),
                worGorB: this.editedItem.worGorB,
                bmBmthBhBvhr: this.editedItem.bmBmthBhBvhr ? this.editedItem.bmBmthBhBvhr : ''
          }

          console.log('nnnnn', formDataPost);
         axios.post('/api/'+this.apiController, formDataPost)
                    .then(response => {
                        //console.log('eee',response);

                        const fcn = vm.findObjectByKey(vm.states, 'flagId', parseInt(response.data.wgbFlag) )

                        //console.log('fcn',fcn);

                        response.data.fullCountryName = fcn.flagCountry;
                        
                        vm.items.push(response.data)
                        
                        vm.a1 = {};
                        vm.snackbarSuccess = true;
                    })
                    .catch(error => {
                        console.log(err);
                    });

                    
           
          //}
          
        }
        this.close()
      }

  },
  watch:{
      'editedItem.bmBmthBhBvhr'  : function (val, oldval) {
          

          if(val =='' || val === null) {

              this.validRisk = false;

          } else {

              this.validRisk = true;
          }

          // check all and enable valid

          if(this.editedItem.worGorB == "Black" && this.validWgb && this.validRisk && this.validFlagSelect) {

              this.valid = true;
          }

          else if(this.editedItem.worGorB != "Black" && this.validWgb && this.validFlagSelect) {

              this.valid = true;

          } else {

              this.valid = false;
          }

          //console.log('3',this.valid, this.validWgb, this.validRisk, this.validFlagSelect);
      },
      'editedItem.worGorB'  : function (val, oldval) {
          

          if(val == '' || val === null ) {

              this.validWgb = false;
              
          } else {

              this.validWgb = true;
          }

          // check all and enable valid

          if(this.editedItem.worGorB == "Black" && this.validWgb && this.validRisk && this.validFlagSelect) {

              this.valid = true;
          }

          else if(this.editedItem.worGorB != "Black" && this.validWgb && this.validFlagSelect) {

              this.valid = true;

          } else {

              this.valid = false;
          }

          //console.log('2',this.valid, this.validWgb, this.validRisk, this.validFlagSelect);
      },
      'a1'  : function (val, oldval) {
         

          if(val =='' || val === null) {

              this.validFlagSelect = false;

          } else {

              this.validFlagSelect = true;
          }

          // check all and enable valid

          if(this.editedItem.worGorB == "Black" && this.validWgb && this.validRisk && this.validFlagSelect) {

              this.valid = true;
          }

          else if(this.editedItem.worGorB != "Black" && this.validWgb && this.validFlagSelect) {

              this.valid = true;

          } else {

              this.valid = false;
          }

        //console.log('1',this.valid, this.validWgb, this.validRisk, this.validFlagSelect);
      },
      
    },
  name: 'TokyoWgbList'
}
</script>