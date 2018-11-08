<template>
  <div>    
    <navigation-drawer></navigation-drawer>
    <v-container grid-list-xs text-xs-left>
    <v-layout row wrap>
    <v-content>
      <template>

    <v-dialog v-model="dialog" :persistent="true" max-width="500px">
      <!--<v-btn large color="primary" dark slot="activator" class="mb-2 right">New Ship</v-btn>-->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <input type="hidden" v-model="editedItem.shipId" />
                <p>ID: {{editedItem.shipId}}</p>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Ship Name" v-model="editedItem.shipName" :rules="[v => !!v || 'Item is required']"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                
                    <v-select
                    :items="companies"
                    :filter="companyFilter"
                    v-model="editedItem.companyName"
                    item-text="companyName"
                    item-value="companyId"
                    required
                    label="Select Company"
                    :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    hint="Type to autocomplete!"
                    persistent-hint
                    ></v-select>
                
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="IMO Number" type="number" v-model="editedItem.imoNumber" :rules="[v => !!v || 'Item is required']"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                
                    <v-select
                    :items="cls"
                    :filter="clsFilter"
                    v-model="editedItem.classOrganization"
                    item-text="recognizedOrganizationName"
                    item-value="recognizedOrganizationId"
                    required
                    label="Select Class Organization"
                    :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    hint="Type to autocomplete!"
                    persistent-hint
                    ></v-select>
                

              </v-flex>
              <v-flex xs12 sm6 md12>
                
                    <v-select
                    :items="ros"
                    :filter="roFilter"
                    v-model="editedItem.recognizedOrganization"
                    item-text="recognizedOrganizationName"
                    item-value="recognizedOrganizationId"
                    required
                    label="Select Recognized Organization"
                    :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    hint="Type to autocomplete!"
                    persistent-hint
                    ></v-select>
                

              </v-flex>
              <v-flex xs12 sm6 md12>
               
                    <v-select
                    :items="states"
                    :filter="countryFilter"
                    v-model="editedItem.countryFlag"
                    item-text="flagCountry"
                    item-value="flagId"
                    required
                    label="Select Flag / Country"
                    :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    hint="Type to autocomplete!"
                    persistent-hint
                    ></v-select>
                
                
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Official Nr." type="number" v-model="editedItem.officialNr" :rules="[v => !!v || 'Item is required']"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Year" v-model="editedItem.year" mask="####" :rules="[v => !!v || 'Item is required']"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="GT" type="number" v-model="editedItem.gt" :rules="[v => !!v || 'Item is required']"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                
                    <v-select
                    :items="shiptypes"
                    :filter="shipTypeFilter"
                    v-model="editedItem.typeOfShip"
                    item-text="shipTypeName"
                    item-value="shipTypeId"
                    required
                    label="Select Ship Type"
                    :rules="[v => !!v || 'Item is required']"
                    autocomplete
                    hint="Type to autocomplete!"
                    persistent-hint
                    ></v-select>
                

              </v-flex>
              
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
          
          <v-toolbar-title class="text-xs-center"><h1>Ships</h1></v-toolbar-title>
          <v-spacer></v-spacer>
           <v-btn color="teal"
      class="white--text" @click.native.stop="dialog = true">NEW SHIP <v-icon right dark>cloud_upload</v-icon></v-btn>
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
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :rows-per-page-items="rppi"
    >
      <template slot="items" slot-scope="props">
        <!--<td>{{ props.item.flagId }}</td>-->
        <td class="text-xs-left">{{ props.item.shipName }}</td>
        <td class="text-xs-center">{{ props.item.companyName1 }}</td>
        <td class="text-xs-left">{{ props.item.imoNumber }}</td>
        <td class="text-xs-center">{{ props.item.classOrganization1 }}</td>
        <td class="text-xs-left">{{ props.item.recognizedOrganization1 }}</td>
        <td class="text-xs-center">{{ props.item.countryFlag1 }}</td>
        <td class="text-xs-left">{{ props.item.officialNr }}</td>
        <td class="text-xs-center">{{ props.item.year }}</td>
        <td class="text-xs-left">{{ props.item.gt }}</td>
        <td class="text-xs-center">{{ props.item.typeOfShip1 }}</td>

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
    MainFooter,
    
  },
  data () {
    return {
        disabled: true,
        a1:null,
        states:[],
        countryFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.flagCountry)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },
        s1:null,
        shiptypes:[],
        shipTypeFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.shipTypeName)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },
        c1:null,
        companies:[],
        companyFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.companyName)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },
        r1:null,
        ros:[],
        roFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.recognizedOrganizationName)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        },

        cl1:null,
        cls:[],
        clsFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.recognizedOrganizationName)
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
        apiController: 'Ship',
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
        { text: 'Ship Name', align: 'left', value: 'shipName' },
        { text: 'Company Name', align: 'center', value: 'companyName' },
        { text: 'IMO Number', align: 'left', value: 'imoNumber' },
        { text: 'Class Organization', align: 'center', value: 'classOrganization' },
        { text: 'Recognized Organization', align: 'left', value: 'recognizedOrganization' },
        { text: 'Country / Flag', align: 'center', value: 'countryFlag' },
        { text: 'Official nr.', align: 'left', value: 'officialNr' },
        { text: 'Year', align: 'center', value: 'year' },
        { text: 'GT', align: 'left', value: 'gt' },
        { text: 'Type of Ship', align: 'center', value: 'typeOfShip' },
        { text: 'Actions', align: 'right', value: 'shipId', sortable: false }
      ],
        items: [],
        editedIndex: -1,
      editedItem: {
        shipName:'',
        shipName1:'',
        companyName:'',
        companyName1:'',
        imoNumber:'',
        classOrganization:'',
        classOrganization1:'',
        recognizedOrganization:'',
        recognizedOrganization1:'',
        countryFlag:'',
        countryFlag1:'',
        officialNr:'',
        year:'',
        gt:'',
        typeOfShip:'',
        typeOfShip1:''
      },
      defaultItem: {
        shipName:'',
        shipName1:'',
        companyName:'',
        companyName1:'',
        imoNumber:'',
        classOrganization:'',
        classOrganization1:'',
        recognizedOrganization:'',
        recognizedOrganization1:'',
        countryFlag:'',
        countryFlag1:'',
        officialNr:'',
        year:'',
        gt:'',
        typeOfShip:'',
        typeOfShip1:''
      }
      
    }
  },
  computed: {
      
      formTitle () {
        return this.editedIndex === -1 ? 'New Ship' : 'Edit Ship'
      }
    },
  created() {

    this.states = []; // za array drzava iz storea

    const dt = this.$store.state.countryFlags;

    this.states = dt;

    this.companies = []; // za array kompanija iz storea

    const cp = this.$store.state.companies;

    this.companies = cp;

    this.shiptypes = []; // za array vrsta brodova iz storea

    const st = this.$store.state.typeOfShip;

    this.shiptypes = st;

    this.ros = []; // za array recognized organizacija iz storea

    const ro = this.$store.state.recognizedOrganizations;

    this.ros = ro;

    this.cls = []; // za array class organizacija iz storea ! -iste kao recognized u ovom slucaju

    const cl = this.$store.state.recognizedOrganizations;

    this.cls = cl;

        this.items = []
        var vm = this;
        axios.get('/api/'+this.apiController, {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
         const data = response.data; // readonly
          for(let key in data) {
               const tt = data[key]
               
               if(parseInt(data[key].countryFlag) > 0) {
               const findme = vm.findObjectByKey(vm.states, 'flagId', parseInt(data[key].countryFlag))
               tt.countryFlag1 = findme.flagCountry;
               } else {
               tt.countryFlag1 = ''; 
               }

               if(parseInt(data[key].companyName) > 0) {
               const findme = vm.findObjectByKey(vm.companies, 'companyId', parseInt(data[key].companyName))
               tt.companyName1 = findme.companyName;
               } else {
               tt.companyName1 = ''; 
               }

               if(parseInt(data[key].typeOfShip) > 0) {
               const findme = vm.findObjectByKey(vm.shiptypes, 'shipTypeId', parseInt(data[key].typeOfShip))
               tt.typeOfShip1 = findme.shipTypeName;
               } else {
               tt.typeOfShip1 = ''; 
               }

               if(parseInt(data[key].recognizedOrganization) > 0) {
               const findme = vm.findObjectByKey(vm.ros, 'recognizedOrganizationId', parseInt(data[key].recognizedOrganization))
               tt.recognizedOrganization1 = findme.recognizedOrganizationName;
               } else {
               tt.recognizedOrganization1 = ''; 
               }

               if(parseInt(data[key].classOrganization) > 0) {
               const findme = vm.findObjectByKey(vm.cls, 'recognizedOrganizationId', parseInt(data[key].classOrganization))
               tt.classOrganization1 = findme.recognizedOrganizationName;
               } else {
               tt.classOrganization1 = ''; 
               }
               

               vm.items.push(tt)
          }
          
         });

  },
  methods: {

    checkKeyValueForSelect(idpolja, idarray, stringfield, returnfield1, returnfield2) {

      var findme = null;

      // check if idpolja is integer

      if(parseInt(idpolja) > 0) {

        var idpoljaTrue = true;

      } else {

        var idpoljaTrue = false;

      }

      if(idpoljaTrue) {

        findme = this.findObjectByKey(idarray, stringfield, parseInt(idpolja))

      }
      
      return findme;

    },

    setCompany() {

      this.editedItem.companyName = this.a1.companyId;

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
        //console.log(this.editedItem.countryFlag)

        //console.log('puopou',this.editedItem);

        if(parseInt(this.editedItem.typeOfShip) > 0) {
          const findme = this.findObjectByKey(this.shiptypes, 'shipTypeId', parseInt(this.editedItem.typeOfShip))
          this.editedItem.typeOfShip1 = findme.shipTypeName;
          this.editedItem.typeOfShip = findme.shipTypeId;
          //console.log('country',findme)
          //this.s1 = findme;
        }

       if(parseInt(this.editedItem.countryFlag) > 0) {
          const findme = this.findObjectByKey(this.states, 'flagId', parseInt(this.editedItem.countryFlag))
          this.editedItem.countryFlag1 = findme.flagCountry;
          this.editedItem.countryFlag = findme.flagId;
          //console.log('country',findme)
          //this.a1 = findme;
        }

        if(parseInt(this.editedItem.classOrganization) > 0) {
          const findme = this.findObjectByKey(this.cls, 'recognizedOrganizationId', parseInt(this.editedItem.classOrganization))
          this.editedItem.classOrganization1 = findme.recognizedOrganizationName;
          this.editedItem.classOrganization = findme.recognizedOrganizationId;
          //console.log('country',findme)
          //this.cl1 = findme;
        }

        if(parseInt(this.editedItem.recognizedOrganization) > 0) {
          const findme = this.findObjectByKey(this.ros, 'recognizedOrganizationId', parseInt(this.editedItem.recognizedOrganization))
          this.editedItem.recognizedOrganization1 = findme.recognizedOrganizationName;
          this.editedItem.recognizedOrganization = findme.recognizedOrganizationId;
          //console.log('country',findme)
          //this.r1 = findme;
        }

        if(parseInt(this.editedItem.companyName) > 0) {
          const findme = this.findObjectByKey(this.companies, 'companyId', parseInt(this.editedItem.companyName))
          this.editedItem.companyName1 = findme.companyName;
          this.editedItem.companyName = findme.companyId;
          //console.log('country',findme)
          //this.c1 = findme;
        }


        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        if(confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)) {
            //console.log('obrisano', item)
            const formDataDelete = {
                shipName:item.shipName,
                companyName:item.companyName,
                imoNumber:item.imoNumber,
                classOrganization:item.classOrganization,
                recognizedOrganization:item.recognizedOrganization,
                countryFlag:item.countryFlag,
                officialNr:item.officialNr,
                year:item.year,
                GT:item.gt,
                typeOfShip:item.typeOfShip
            }
            axios.delete('/api/'+this.apiController+'/'+item.shipId, formDataDelete)
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

          const editem = Object.assign(this.items[this.editedIndex], this.editedItem)
          //console.log("save",this.editedItem.flagCountry1)

          //console.log( this.editedItem)
          const formDataPut = {
                shipId: this.editedItem.shipId,
                shipName: this.editedItem.shipName,
                companyName: this.editedItem.companyName,
                imoNumber: this.editedItem.imoNumber,
                classOrganization: this.editedItem.classOrganization,
                recognizedOrganization: this.editedItem.recognizedOrganization,
                countryFlag: this.editedItem.countryFlag,
                officialNr: this.editedItem.officialNr,
                year: this.editedItem.year,
                gt: this.editedItem.gt,
                typeOfShip: this.editedItem.typeOfShip,
          }

          var vm = this;
          console.log('puut', formDataPut)
          axios.put('/api/'+this.apiController+'/'+this.editedItem.shipId, formDataPut)
                    .then(response => {
                        //console.log(response);

                        //editem.recognizedOrganization1 = vm.editedItem.recognizedOrganization1;

                        if(parseInt(editem.recognizedOrganization) > 0) {
                            const findme = this.findObjectByKey(vm.ros, 'recognizedOrganizationId', parseInt(editem.recognizedOrganization))
                            editem.recognizedOrganization1 = findme.recognizedOrganizationName;
                            
                            //console.log('country',findme)
                            //this.r1 = findme;
                          }

                          if(parseInt(editem.typeOfShip) > 0) {
                            const findme = this.findObjectByKey(this.shiptypes, 'shipTypeId', parseInt(editem.typeOfShip))
                            editem.typeOfShip1 = findme.shipTypeName;
                            editem.typeOfShip = findme.shipTypeId;
                            //console.log('country',findme)
                            //this.s1 = findme;
                          }

                        if(parseInt(editem.countryFlag) > 0) {
                            const findme = this.findObjectByKey(this.states, 'flagId', parseInt(editem.countryFlag))
                            editem.countryFlag1 = findme.flagCountry;
                            editem.countryFlag = findme.flagId;
                            //console.log('country',findme)
                            //this.a1 = findme;
                          }

                          if(parseInt(editem.classOrganization) > 0) {
                            const findme = this.findObjectByKey(this.cls, 'recognizedOrganizationId', parseInt(editem.classOrganization))
                            editem.classOrganization1 = findme.recognizedOrganizationName;
                            editem.classOrganization = findme.recognizedOrganizationId;
                            //console.log('country',findme)
                            //this.cl1 = findme;
                          }

                          if(parseInt(editem.recognizedOrganization) > 0) {
                            const findme = this.findObjectByKey(this.ros, 'recognizedOrganizationId', parseInt(editem.recognizedOrganization))
                            editem.recognizedOrganization1 = findme.recognizedOrganizationName;
                            editem.recognizedOrganization = findme.recognizedOrganizationId;
                            //console.log('country',findme)
                            //this.r1 = findme;
                          }

                          if(parseInt(editem.companyName) > 0) {
                            const findme = this.findObjectByKey(this.companies, 'companyId', parseInt(editem.companyName))
                            editem.companyName1 = findme.companyName;
                            editem.companyName = findme.companyId;
                            //console.log('country',findme)
                            //this.c1 = findme;
                          }

                        //console.log('edotem',editem)

                    })
                    .catch(error => {
                        console.log(err);
                    });
          this.snackbarSuccess = true;

        } else {

          if(this.editedItem.shipName != '' ) {
          var vm = this;
          //this.items.push(this.editedItem)
          const formDataPost = {
                
                shipName: this.editedItem.shipName,
                companyName: this.editedItem.companyName,
                imoNumber: this.editedItem.imoNumber,
                classOrganization: this.editedItem.classOrganization,
                recognizedOrganization: this.editedItem.recognizedOrganization,
                countryFlag: this.editedItem.countryFlag,
                officialNr: this.editedItem.officialNr,
                year: this.editedItem.year,
                gt: this.editedItem.gt,
                typeOfShip: this.editedItem.typeOfShip,
          }
          axios.post('/api/'+this.apiController, formDataPost)
                    .then(response => {
                        //console.log('eee',response);
                        const data = response.data;
                        const table = [];
                        const tt = vm.editedItem;

               tt.shipId = response.data.shipId;
               
               if(parseInt(vm.editedItem.countryFlag) > 0) {
                const findme = vm.findObjectByKey(vm.states, 'flagId', parseInt(vm.editedItem.countryFlag))
                tt.countryFlag1 = findme.flagCountry;
               } else {
                tt.countryFlag1 = ''; 
               }
               
               if(parseInt(vm.editedItem.companyName) > 0) {
                const findme = vm.findObjectByKey(vm.companies, 'companyId', parseInt(vm.editedItem.companyName))
                tt.companyName1 = findme.companyName;
                } else {
                tt.companyName1 = ''; 
               }

               if(parseInt(vm.editedItem.typeOfShip) > 0) {
                const findme = vm.findObjectByKey(vm.shiptypes, 'shipTypeId', parseInt(vm.editedItem.typeOfShip))
                tt.typeOfShip1 = findme.shipTypeName;
                } else {
                tt.typeOfShip1 = ''; 
               }

               if(parseInt(vm.editedItem.recognizedOrganization) > 0) {
                const findme = vm.findObjectByKey(vm.ros, 'recognizedOrganizationId', parseInt(vm.editedItem.recognizedOrganization))
                tt.recognizedOrganization1 = findme.recognizedOrganizationName;
                } else {
                tt.recognizedOrganization1 = ''; 
               }

               if(parseInt(vm.editedItem.classOrganization) > 0) {
                const findme = vm.findObjectByKey(vm.cls, 'recognizedOrganizationId', parseInt(vm.editedItem.classOrganization))
                tt.classOrganization1 = findme.recognizedOrganizationName;
                } else {
                tt.classOrganization1 = ''; 
               }
                        vm.items.push(tt);
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

  editedItem: {
     handler(val){
       // do stuff
       //alert("change");

       //console.log('change',this.editedItem)

       
       if( this.editedItem.shipName != '' &&
        this.editedItem.companyName != '' &&
        this.editedItem.imoNumber != '' &&
        this.editedItem.classOrganization != '' &&
        this.editedItem.recognizedOrganization != '' &&
        this.editedItem.countryFlag != '' &&
        this.editedItem.officialNr != '' &&
        this.editedItem.year != '' &&
        this.editedItem.gt != '' &&
        this.editedItem.typeOfShip != '') {

          this.disabled = false;

        } else {

          this.disabled = true;

        }
        
      

     },
     deep: true
  }
},
  name: 'Ship'
}
</script>