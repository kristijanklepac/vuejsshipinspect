<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-xs text-xs-left>
    <v-layout row wrap>

    <v-content>
      <template>

    <v-dialog v-model="dialog" max-width="500px">
      <!--<v-btn color="primary" dark slot="activator" class="mb-2">New Company</v-btn>-->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <input type="hidden" v-model="editedItem.companyId" />
                <p>ID: {{editedItem.companyId}}</p>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Company Name" v-model="editedItem.companyName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Company Address" v-model="editedItem.companyAddress"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md12>
                <v-text-field label="Company City" v-model="editedItem.companyCity"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md12>
                <v-text-field label="Company Zip" :mask="mask" v-model="editedItem.companyZip"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md12>
               
                <input type="hidden" v-model="editedItem.companyCountry" />
              </v-flex>

              <v-flex xs12 sm6 md12>
                    <v-select
                    :items="states"
                    :filter="customFilter"
                    v-model="a1"
                    item-text="flagCountry"
                    
                    label="Select"
                    
                    autocomplete
                    ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                <v-text-field label="Company Email" v-model="editedItem.companyEmail" :rules="[rules.required, rules.email]"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Company Phone" v-model="editedItem.companyPhone"></v-text-field>
              </v-flex>
              
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-card class="mt-5">
    <v-toolbar color="blue-grey darken-1" dark>
          
          <v-toolbar-title class="text-xs-center"><h1>Companies</h1></v-toolbar-title>
          <v-spacer></v-spacer>
           <v-btn color="teal"
      class="white--text" @click.native.stop="dialog = true">NEW COMPANY PROFILE <v-icon right dark>cloud_upload</v-icon></v-btn>
        </v-toolbar>
    <v-card-title>
      
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search by Company Name | Address | City | Zip | Country | Email | Phone"
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
        <td class="text-xs-left">{{ props.item.companyName }}</td>
        <td class="text-xs-left">{{ props.item.companyAddress }}</td>
        <td class="text-xs-left">{{ props.item.companyCity }}</td>
        <td class="text-xs-left">{{ props.item.companyZip }}</td>
        <td class="text-xs-left">{{ props.item.fullCountryName }}</td>
        <td class="text-xs-left">{{ props.item.companyEmail }}</td>
        <td class="text-xs-center">{{ props.item.companyPhone }}</td>

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
        apiController: 'Company',
        rppi: [20,30,40,50,100,150, {"text":"All","value":-1}],
        dialog: false,
        search: '',
        headers: [
        /*{
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'flagId'
        },*/
        { text: 'Company Name', align: 'left', value: 'companyName' },
        { text: 'Company Address', align: 'left', value: 'companyAddress' },
        { text: 'Company City', align: 'left', value: 'companyCity' },
        { text: 'Company Zip', align: 'left', value: 'companyZip' },
        { text: 'Company Country', align: 'left', value: 'fullCountryName' },
        { text: 'Company Email', align: 'left', value: 'companyEmail' },
        { text: 'Company Phone', align: 'center', value: 'companyPhone' },
        { text: 'Actions', align: 'right', value: 'companyId', sortable: false }
      ],
        items: [],
        editedIndex: -1,
      editedItem: {
        companyId: '',
        companyName: '',
        companyAddress:'',
        companyCity: '',
        companyZip: '',
        companyCountry:'',
        companyEmail: '',
        companyPhone: '',
        fullCountryName:''
      },
      defaultItem: {
        companyId: '',
        companyName: '',
        companyAddress:'',
        companyCity: '',
        companyZip: '',
        companyCountry:'',
        companyEmail: '',
        companyPhone: '',
        fullCountryName:''
      }
      
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Company' : 'Edit Company'
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
               const fcn = vm.findObjectByKey(vm.states, 'flagId', parseInt(data[key].companyCountry) )
               tt.fullCountryName = fcn.flagCountry
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

          //console.log('ghahjdf',this.items.indexOf(item));
         
        this.editedIndex = this.items.indexOf(item)
        //console.log('tedi',this.editedIndex)
        const bla = [];
        /*for(let key in Object.assign({}, item)) {
               const tt = item[key]
               //tt.id = key
               //tt.new = data[key].Name
               
               console.log(value);
               bla.push(tt)
          }*/

          for (let [k, v] of Object.entries(Object.assign({}, item))) {
            // do something with k and v
            //console.log('kv?', k, v)

            if(k == 'companyCountry') {

              //v = this.a1.flagName;

             // console.log(this.a1)

            }

            //console.log('kv?', k, v)
          }


        
        this.editedItem = Object.assign({}, item)

        //console.log(this.editedItem,bla, Object.assign({}, item)) 
        //this.editedItem = bla;
        //console.log('5464545',this.findObjectByKey(this.states, 'flagName', this.editedItem.companyCountry ));

        this.a1 = this.findObjectByKey(this.states, 'flagId', parseInt(this.editedItem.companyCountry) );
        this.select = this.findObjectByKey(this.states, 'flagId', parseInt(this.editedItem.companyCountry) );
        //console.log('a1',this.a1)

        //this.editedItem.companyCountry = this.a1.flagName;

        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        if(confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)) {
            console.log('obrisano', item)
            const formDataDelete = {
                companyId: item.companyId,
                companyName: item.companyName,
                companyAddress: item.companyAddress,
                companyCity: item.companyCity,
                companyZip: item.companyZip,
                companyCountry: item.companyCountry,
                companyEmail: item.companyEmail,
                companyPhone: item.companyPhone
            }
            axios.delete('/api/'+this.apiController+'/'+item.companyId, formDataDelete)
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
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          
          this.editedItem.companyCountry = this.a1.flagId;
          this.editedItem.fullCountryName = this.a1.flagCountry;

          //console.log(this.editedItem.companyCountry);
        
          const editem = Object.assign(this.items[this.editedIndex], this.editedItem)

          //console.log("save",editem)

          //console.log("save",this.editedItem.flagCountry)

          //console.log('testirajedit',this.findObjectByKey(this.states, 'flagName', this.a1.companyCountry ));

          /*this.a1 = this.findObjectByKey(this.states, 'flagName', this.editedItem.companyCountry );
          this.select = this.findObjectByKey(this.states, 'flagName', this.editedItem.companyCountry );*/

          const formDataPut = {
                companyId: this.editedItem.companyId,
                companyName: this.editedItem.companyName,
                companyAddress: this.editedItem.companyAddress,
                companyCity: this.editedItem.companyCity,
                companyZip: this.editedItem.companyZip,
                companyCountry: this.editedItem.companyCountry,
                companyEmail: this.editedItem.companyEmail,
                companyPhone: this.editedItem.companyPhone
          }
          axios.put('/api/'+this.apiController+'/'+this.editedItem.companyId, formDataPut)
                    .then(response => {
                        //console.log(response);
                    })
                    .catch(error => {
                        console.log(err);
                    });
          this.snackbarSuccess = true;

        } else {

            if(this.a1 !== null) {

               //console.log('flagid',this.a1.flagId);

               const country = this.a1.flagId.toString();

            } else {

                this.close()
            }
            
          if(   this.editedItem.companyName != '' &&
                this.editedItem.companyAddress != '' &&
                this.editedItem.companyCity != '' &&
                this.editedItem.companyZip != '' &&
                /*this.editedItem.companyCountry != '' &&*/
                this.editedItem.companyEmail != '' &&
                this.editedItem.companyPhone != ''
             ) {
          var vm = this;
          //this.items.push(this.editedItem)
          const formDataPost = {
                
                companyName: this.editedItem.companyName,
                companyAddress: this.editedItem.companyAddress,
                companyCity: this.editedItem.companyCity,
                companyZip: this.editedItem.companyZip,
                companyCountry: this.a1.flagId.toString(),
                companyEmail: this.editedItem.companyEmail,
                companyPhone: this.editedItem.companyPhone
          }
          axios.post('/api/'+this.apiController, formDataPost)
                    .then(response => {
                        //console.log('eee',response);
                        const fcn = vm.findObjectByKey(vm.states, 'flagId', parseInt(response.data.companyCountry) )

                        //console.log('fcn',fcn);

                        response.data.fullCountryName = fcn.flagCountry;
                        
                        vm.items.push(response.data)
                        

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
  name: 'Company'
}
</script>