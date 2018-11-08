<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-xs text-xs-left>
    <v-layout row wrap>


    <v-content>
      <template>

    <v-dialog v-model="dialog" max-width="500px">
      <!--<v-btn color="primary" dark slot="activator" class="mb-2">New Recognized Organization</v-btn>-->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <input type="hidden" v-model="editedItem.recognizedOrganizationId" />
                <p>ID: {{editedItem.recognizedOrganizationId}}</p>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Recognized Organization" v-model="editedItem.recognizedOrganizationName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Recognized Organization Initials" v-model="editedItem.recognizedOrganizationInitials"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
               
                <v-select
                        :items="roParisMou"
                        v-model="editedItem.roParisMou"
                        label="Select"
                        single-line
                         item-text="text"
                          item-value="value"
                          return-object
                          hint="RO Paris MOU"
                          persistent-hint
                          
                        
                        ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                
                <v-select
                        :items="roTokyoMou"
                        v-model="editedItem.roTokyoMou"
                        label="Select"
                        single-line
                        item-text="text"
                          item-value="value"
                          return-object
                          hint="RO Tokyo MOU"
                          persistent-hint
                         
                        ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
               
                <v-select
                        :items="roCarribeanMou"
                        v-model="editedItem.roCarribeanMou"
                        label="Select"
                        single-line
                       item-text="text"
                          item-value="value"
                          return-object
                         hint="RO ParCarribean MOU"
                          persistent-hint
                        ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                
                <v-select
                        :items="roMediterraneanMou"
                        v-model="editedItem.roMediterraneanMou"
                        label="Select"
                        single-line
                        item-text="text"
                          item-value="value"
                          return-object
                         hint="RO Mediterranean MOU"
                          persistent-hint
                        ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                
                <v-select
                        :items="roVinaDelMarMou"
                        v-model="editedItem.roVinaDelMarMou"
                        label="Select"
                        single-line
                        item-text="text"
                          item-value="value"
                          return-object
                        hint="RO Vina del Mar MOU"
                          persistent-hint
                        ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                
                <v-select
                        :items="roUsCoastGuardMou"
                        v-model="editedItem.roUsCoastGuardMou"
                        label="Select"
                        single-line
                        item-text="text"
                          item-value="value"
                          return-object
                         hint="RO US Coast Guard MOU"
                          persistent-hint
                        ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                
                <v-select
                        :items="roIndianOceanMou"
                        v-model="editedItem.roIndianOceanMou"
                        label="Select"
                        single-line
                        item-text="text"
                          item-value="value"
                          return-object
                         hint="RO Indian Ocean MOU"
                          persistent-hint
                        ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                
                <v-select
                        :items="roRiyadhMou"
                        v-model="editedItem.roRiyadhMou"
                        label="Select"
                        single-line
                       item-text="text"
                          item-value="value"
                          return-object
                        hint="RO Riyadh MOU"
                          persistent-hint
                        ></v-select>
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
          
          <v-toolbar-title class="text-xs-center"><h1>Recognized Organizations</h1></v-toolbar-title>
          <v-spacer></v-spacer>
           <v-btn color="teal"
      class="white--text" @click.native.stop="dialog = true">NEW Recognized Organizations <v-icon right dark>cloud_upload</v-icon></v-btn>
        </v-toolbar>
    <v-card-title>
      Recognized Organizations
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
      :pagination.sync="pagination"
           item-key="recognizedOrganizationName"
      style="width:100%"
      
    >
    <template slot="headers" slot-scope="props">
      <tr>
        <th v-for="header in props.headers"
          :key="header.text" 
        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"  
      @click="changeSort(header.value)"
      v-html="header.text"
      style="cursor:pointer">
      
        </th>
      </tr>
    </template>
      <template slot="items" slot-scope="props">
        <!--<td>{{ props.item.flagId }}</td>-->
        <td class="text-xs-left">{{ props.item.recognizedOrganizationName }}</td>
        <td class="text-xs-center">{{ props.item.recognizedOrganizationInitials}}</td>
        <td class="text-xs-center">
          <span v-if="props.item.roParisMou">
              {{ props.item.roParisMou.text }}
          </span>
          </td>
        <td class="text-xs-center">
          <span v-if="props.item.roTokyoMou">
              {{ props.item.roTokyoMou.text }}
          </span>
        </td>
        <td class="text-xs-center">
          <span v-if="props.item.roCarribeanMou">
              {{ props.item.roCarribeanMou.text }}
          </span>
        </td>
        <td class="text-xs-center">
          <span v-if="props.item.roMediterraneanMou">
              {{ props.item.roMediterraneanMou.text }}
          </span>
        </td>
        <td class="text-xs-center">
          <span v-if="props.item.roVinaDelMarMou">
              {{ props.item.roVinaDelMarMou.text }}
          </span>
        </td>
        <td class="text-xs-center">
          <span v-if="props.item.roUsCoastGuardMou">
              {{ props.item.roUsCoastGuardMou.text }}
          </span>
        </td>
        <td class="text-xs-center">
          <span v-if="props.item.roIndianOceanMou">
              {{ props.item.IndianOceanMou.text }}
          </span>
        </td>
        <td class="text-xs-center">
          <span v-if="props.item.roRiyadhMou">
              {{ props.item.roRiyadhMou.text }}
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
        pagination: {
        sortBy: 'recognizedOrganizationName'
        },
        roParisMou: [
          { text: 'High', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'Low', value: 2 },
          { text: 'Very Low', value: 3 }
        ],
        roTokyoMou: [
          { text: 'High', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'Low', value: 2 },
          { text: 'Very Low', value: 3 }
        ],
        roCarribeanMou: [
          { text: 'High', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'Low', value: 2 },
          { text: 'Very Low', value: 3 }
        ],
        roMediterraneanMou: [
          { text: 'High', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'Low', value: 2 },
          { text: 'Very Low', value: 3 }
        ],
        roVinaDelMarMou: [
          { text: 'High', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'Low', value: 2 },
          { text: 'Very Low', value: 3 }
        ],
        roUsCoastGuardMou: [
          { text: 'High', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'Low', value: 2 },
          { text: 'Very Low', value: 3 }
        ],
        roIndianOceanMou: [
          { text: 'High', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'Low', value: 2 },
          { text: 'Very Low', value: 3 }
        ],
        roRiyadhMou: [
          { text: 'High', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'Low', value: 2 },
          { text: 'Very Low', value: 3 }
        ],
        snackbarSuccess: false,
        snackbarError: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        textSuccess: 'Your data are saved!',
        textError: 'Data deleted!',
        apiController: 'RecognizedOrganization',
        rppi: [5,10,20,30,40,50,100,150, {"text":"All","value":-1}],
        dialog: false,
        search: '',
        headers: [
        /*{
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'flagId'
        },*/
        { text: 'RO <br>Name', align: 'left', class: 'desetposto', value: 'recognizedOrganizationName' },
        { text: 'RO <br>Initials', class: 'desetposto', align: 'left', value: 'recognizedOrganizationInitials' },
        { text: 'RO <br>(Paris MOU)', class: 'desetposto', align: 'center', value: 'roParisMou' },
        { text: 'RO <br>(Tokyo MOU)', class: 'desetposto', align: 'center', value: 'roTokyoMou' },
        { text: 'RO <br>(Carribean MOU)', class: 'desetposto', align: 'center', value: 'roCarribeanMou' },
        { text: 'RO <br>(Mediterranean MOU)', class: 'desetposto', align: 'center', value: 'roMediterraneanMou' },
        { text: 'RO <br>(Vina del Mar MOU)', class: 'desetposto', align: 'center', value: 'roVinaDelMarMou' },
        { text: 'RO <br>(US Coast Guard MOU)', class: 'desetposto', align: 'center', value: 'roUsCoastGuardMou' },
        { text: 'RO <br>(Indian Ocean MOU)', class: 'desetposto', align: 'center', value: 'roIndianOceanMou' },
        { text: 'RO <br>(Riyadh MOU)', class: 'desetposto', align: 'center', value: 'roRiyadhMou' },
        { text: 'Actions', align: 'right', value: 'recognizedOrganizationId', sortable: false }
      ],
        items: [],
        editedIndex: -1,
      editedItem: {
        recognizedOrganizationId: '',
        recognizedOrganizationName: '',
        roParisMou:{text:'',value:''},
        roTokyoMou:{text:'',value:''},
        roCarribeanMou:{text:'',value:''},
        roMediterraneanMou:{text:'',value:''},
        roVinaDelMarMou:{text:'',value:''},
        roUsCoastGuardMou:{text:'',value:''},
        roIndianOceanMou:{text:'',value:''},
        roRiyadhMou:{text:'',value:''}

        
      },
      defaultItem: {
        recognizedOrganizationTypeId: '',
        recognizedOrganizationTypeName: '',
        roParisMou:{text:'',value:''},
        roTokyoMou:{text:'',value:''},
        roCarribeanMou:{text:'',value:''},
        roMediterraneanMou:{text:'',value:''},
        roVinaDelMarMou:{text:'',value:''},
        roUsCoastGuardMou:{text:'',value:''},
        roIndianOceanMou:{text:'',value:''},
        roRiyadhMou:{text:'',value:''}
        
      }
      
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Recognized Organization' : 'Edit Recognized Organization'
      }
    },
  created() {

        this.items = []
        var vm = this;
        axios.get('/api/'+this.apiController, {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
          /*console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);*/
          const data = response.data;
console.log('rde',response.data);
          for(let key in data) {
               const tt = data[key]
               
               if(data[key].roParisMou && data[key].roParisMou !== null && data[key].roParisMou != '') {

                  console.log('datakey', data[key]);

                  const fcn = vm.findObjectByKey(vm.roParisMou, 'value', parseInt(data[key].roParisMou) );

                  data[key].roParisMou = { text: fcn.text, value: fcn.value };

               } 
               if(data[key].roTokyoMou && data[key].roTokyoMou !== null && data[key].roTokyoMou != '') {

                  console.log('datakey', data[key].roTokyoMou);

                  const fcn = vm.findObjectByKey(vm.roTokyoMou, 'value', parseInt(data[key].roTokyoMou) );

                  data[key].roTokyoMou = { text: fcn.text, value: fcn.value };

               } 
               if(data[key].roCarribeanMou && data[key].roCarribeanMou !== null && data[key].roCarribeanMou != '') {

                  //console.log('datakey', data[key]);

                  const fcn = vm.findObjectByKey(vm.roCarribeanMou, 'value', parseInt(data[key].roCarribeanMou) );

                  data[key].roCarribeanMou = { text: fcn.text, value: fcn.value };

               } 
               if(data[key].roMediterraneanMou && data[key].roMediterraneanMou !== null && data[key].roMediterraneanMou != '') {

                  //console.log('datakey', data[key]);

                  const fcn = vm.findObjectByKey(vm.roMediterraneanMou, 'value', parseInt(data[key].roMediterraneanMou) );

                  data[key].roMediterraneanMou = { text: fcn.text, value: fcn.value };

               } 
               if(data[key].roVinaDelMarMou && data[key].roVinaDelMarMou !== null && data[key].roVinaDelMarMou != '') {

                  //console.log('datakey', data[key]);

                  const fcn = vm.findObjectByKey(vm.roVinaDelMarMou, 'value', parseInt(data[key].roVinaDelMarMou) );

                  data[key].roVinaDelMarMou = { text: fcn.text, value: fcn.value };

               } 
               if(data[key].roUsCoastGuardMou && data[key].roUsCoastGuardMou !== null && data[key].roUsCoastGuardMou != '') {

                  //console.log('datakey', data[key]);

                  const fcn = vm.findObjectByKey(vm.roUsCoastGuardMou, 'value', parseInt(data[key].roUsCoastGuardMou) );

                  //data[key].roUsCoastGuardMou = { text: fcn.text, value: fcn.value };

               } 
               if(data[key].roIndianOceanMou && data[key].roIndianOceanMou !== null && data[key].roIndianOceanMou != '') {

                  //console.log('datakey', data[key]);

                  const fcn = vm.findObjectByKey(vm.roIndianOceanMou, 'value', parseInt(data[key].roIndianOceanMou) );

                  data[key].roIndianOceanMou = { text: fcn.text, value: fcn.value };

               } 
               if(data[key].roRiyadhMou && data[key].roRiyadhMou !== null && data[key].roRiyadhMou != '') {

                  //console.log('datakey', data[key]);

                  const fcn = vm.findObjectByKey(vm.roRiyadhMou, 'value', parseInt(data[key].roRiyadhMou) );

                  data[key].roRiyadhMou = { text: fcn.text, value: fcn.value };

               } 

               
               vm.items = response.data;
          }

          
          
         });

  },
  methods: {
    findObjectByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        },
      changeSort (column) { //alert(column)
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
        /*if(this.editedItem.roParisMou && this.editedItem.roParisMou !== null) {

                  //console.log('datakey', data[key]);

                  const fcn = this.findObjectByKey(vm.roParisMou, 'text', parseInt(this.editedItem.roParisMou) );

                  this.editedItem.roParisMou = fcn.text;

               }*/
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        if(confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)) {
            console.log('obrisano', item)
            const formDataDelete = {
                recognizedOrganizationId: item.recognizedOrganizationId,
                recognizedOrganizationName: item.recognizedOrganizationName,
                recognizedOrganizationInitials: item.recognizedOrganizationInitials,
                roParisMou:item.roParisMou,
                roTokyoMou:item.roTokyoMou,
                roCarribeanMou:item.roCarribeanMou,
                roMediterraneanMou:item.roMediterraneanMou,
                roVinaDelMarMou:item.roVinaDelMarMou,
                roUsCoastGuardMou:item.roUsCoastGuardMou,
                roIndianOceanMou:item.roIndianOceanMou,
                roRiyadhMou:item.roRiyadhMou
            }
            axios.delete('/api/'+this.apiController+'/'+item.recognizedOrganizationId, formDataDelete)
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
          console.log("save",this.editedItem)
          const formDataPut = {
                recognizedOrganizationId: this.editedItem.recognizedOrganizationId,
                recognizedOrganizationName: this.editedItem.recognizedOrganizationName,
                recognizedOrganizationInitials: this.editedItem.recognizedOrganizationInitials,
                roParisMou:this.editedItem.roParisMou ? this.editedItem.roParisMou.value : '',
                roTokyoMou:this.editedItem.roTokyoMou ? this.editedItem.roTokyoMou.value: '',
                roCarribeanMou:this.editedItem.roCarribeanMou ? this.editedItem.roCarribeanMou.value: '',
                roMediterraneanMou:this.editedItem.roMediterraneanMou ? this.editedItem.roMediterraneanMou.value: '',
                roVinaDelMarMou:this.editedItem.roVinaDelMarMou ? this.editedItem.roVinaDelMarMou.value: '',
                roUsCoastGuardMou:this.editedItem.roUsCoastGuardMou ? this.editedItem.roUsCoastGuardMou.value: '',
                roIndianOceanMou:this.editedItem.roIndianOceanMou ? this.editedItem.roIndianOceanMou.value: '',
                roRiyadhMou:this.editedItem.roRiyadhMou ? this.editedItem.roRiyadhMou.value: ''
          }
          axios.put('/api/'+this.apiController+'/'+this.editedItem.recognizedOrganizationId, formDataPut)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(err);
                    });
          this.snackbarSuccess = true;
        } else {
          if(this.editedItem.recognizedOrganizationName != '') {
          var vm = this;
          //this.items.push(this.editedItem)
          const formDataPost = {
              
                
                recognizedOrganizationName: this.editedItem.recognizedOrganizationName,
                recognizedOrganizationInitials: this.editedItem.recognizedOrganizationInitials,
                roParisMou:this.editedItem.roParisMou ? this.editedItem.roParisMou.value : '',
                roTokyoMou:this.editedItem.roTokyoMou ? this.editedItem.roTokyoMou.value : '',
                roCarribeanMou:this.editedItem.roCarribeanMou ? this.editedItem.roCarribeanMou.value : '',
                roMediterraneanMou:this.editedItem.roMediterraneanMou ? this.editedItem.roMediterraneanMou.value : '',
                roVinaDelMarMou:this.editedItem.roVinaDelMarMou ? this.editedItem.roVinaDelMarMou.value : '',
                roUsCoastGuardMou:this.editedItem.roUsCoastGuardMou ? this.editedItem.roUsCoastGuardMou.value : '',
                roIndianOceanMou:this.editedItem.roIndianOceanMou ? this.editedItem.roIndianOceanMou.value : '',
                roRiyadhMou:this.editedItem.roRiyadhMou ? this.editedItem.roRiyadhMou.value : ''
          }
          axios.post('/api/'+this.apiController, formDataPost)
                    .then(response => {
                        console.log('fuck',response);

              if(response.data.roParisMou && response.data.roParisMou !== null && response.data.roParisMou != '') {

                  console.log('datakey', response.data);

                  const fcn = vm.findObjectByKey(vm.roParisMou, 'value', parseInt(response.data.roParisMou) );

                  response.data.roParisMou = { text: fcn.text, value: fcn.value };

               } 
               if(response.data.roTokyoMou && response.data.roTokyoMou !== null && response.data.roTokyoMou != '') {

                  console.log('datakey', response.data.roTokyoMou);

                  const fcn = vm.findObjectByKey(vm.roTokyoMou, 'value', parseInt(response.data.roTokyoMou) );

                  response.data.roTokyoMou = { text: fcn.text, value: fcn.value };

               } 
               if(response.data.roCarribeanMou && response.data.roCarribeanMou !== null && response.data.roCarribeanMou != '') {

                  //console.log('datakey', response.data);

                  const fcn = vm.findObjectByKey(vm.roCarribeanMou, 'value', parseInt(response.data.roCarribeanMou) );

                  response.data.roCarribeanMou = { text: fcn.text, value: fcn.value };

               } 
               if(response.data.roMediterraneanMou && response.data.roMediterraneanMou !== null && response.data.roMediterraneanMou != '') {

                  //console.log('datakey', response.data);

                  const fcn = vm.findObjectByKey(vm.roMediterraneanMou, 'value', parseInt(response.data.roMediterraneanMou) );

                  response.data.roMediterraneanMou = { text: fcn.text, value: fcn.value };

               } 
               if(response.data.roVinaDelMarMou && response.data.roVinaDelMarMou !== null && response.data.roVinaDelMarMou != '') {

                  //console.log('datakey', response.data);

                  const fcn = vm.findObjectByKey(vm.roVinaDelMarMou, 'value', parseInt(response.data.roVinaDelMarMou) );

                  response.data.roVinaDelMarMou = { text: fcn.text, value: fcn.value };

               } 
               if(response.data.roUsCoastGuardMou && response.data.roUsCoastGuardMou !== null && response.data.roUsCoastGuardMou != '') {

                  //console.log('datakey', response.data);

                  const fcn = vm.findObjectByKey(vm.roUsCoastGuardMou, 'value', parseInt(response.data.roUsCoastGuardMou) );

                  //response.data.roUsCoastGuardMou = { text: fcn.text, value: fcn.value };

               } 
               if(response.data.roIndianOceanMou && response.data.roIndianOceanMou !== null && response.data.roIndianOceanMou != '') {

                  //console.log('datakey', response.data);

                  const fcn = vm.findObjectByKey(vm.roIndianOceanMou, 'value', parseInt(response.data.roIndianOceanMou) );

                  response.data.roIndianOceanMou = { text: fcn.text, value: fcn.value };

               } 
               if(response.data.roRiyadhMou && response.data.roRiyadhMou !== null && response.data.roRiyadhMou != '') {

                  //console.log('datakey', response.data);

                  const fcn = vm.findObjectByKey(vm.roRiyadhMou, 'value', parseInt(response.data.roRiyadhMou) );

                  response.data.roRiyadhMou = { text: fcn.text, value: fcn.value };

               } 
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
  name: 'recognizedOrganizationType'
}
</script>

<style scoped>

.pred { color:red}
.pgreen { color: green}
.desetposto { max-width:8% !important }
</style>