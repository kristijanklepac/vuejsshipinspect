<template>

  <div>
    
    <navigation-drawer></navigation-drawer>

<v-container grid-list-xs text-xs-left>
    <v-layout row wrap>

    <v-content>
      <template>

    <v-dialog v-model="dialog" max-width="500px">
     <!-- <v-btn color="primary" dark slot="activator" class="mb-2">New Ship Type</v-btn>-->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <input type="hidden" v-model="editedItem.shipTypeId" />
                <p>ID: {{editedItem.shipTypeId}}</p>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="Ship Type" v-model="editedItem.shipTypeName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <!--<v-text-field label="Points of HRS" v-model="editedItem.pointsOfHrs"></v-text-field>-->
                <v-select
                        :items="phrs"
                        v-model="editedItem.pointsOfHrs"
                        label="Select Points of HRS"
                        single-line
                        bottom
                        ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md12>
                
                <v-checkbox :label="`Can be LRS: ${editedItem.canBeLrs.toString()}`" v-model="editedItem.canBeLrs"></v-checkbox>

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
          
          <v-toolbar-title class="text-xs-center"><h1>Ship Types</h1></v-toolbar-title>
          <v-spacer></v-spacer>
           <v-btn color="teal"
      class="white--text" @click.native.stop="dialog = true">NEW Ship Type <v-icon right dark>cloud_upload</v-icon></v-btn>
        </v-toolbar>
        <v-card-title>
      Ship Types
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
        <td class="text-xs-left">{{ props.item.shipTypeName }}</td>
        <td class="text-xs-center">{{ props.item.pointsOfHrs }}</td>
        <td class="text-xs-center"><span :class="props.item.canBeLrs ? 'pgreen' : 'pred'">{{ props.item.canBeLrs }}</span></td>
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
        phrs: [
          { text: 'Points of HRS 0', value: 0 },
          { text: 'Points of HRS 1', value: 1 },
          { text: 'Points of HRS 2', value: 2 },
          /*{ text: 'Points of HRS 3', value: 3 },
          { text: 'Points of HRS 4', value: 4 },
          { text: 'Points of HRS 5', value: 5 },
          { text: 'Points of HRS 6', value: 6 }*/
        ],
        snackbarSuccess: false,
        snackbarError: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        textSuccess: 'Your data are saved!',
        textError: 'Data deleted!',
        apiController: 'ShipType',
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
        { text: 'Ship Type', align: 'left', value: 'shipTypeName' },
        { text: 'Points of HRS', align: 'center', value: 'pointsOfHrs' },
        { text: 'Can be LRS', align: 'center', value: 'canBeLrs' },
        { text: 'Actions', align: 'right', value: 'shipTypeId', sortable: false }
      ],
        items: [],
        editedIndex: -1,
      editedItem: {
        shipTypeId: '',
        shipTypeName: '',
        pointsOfHrs:[],
        canBeLrs:true
      },
      defaultItem: {
        shipTypeId: '',
        shipTypeName: '',
        pointsOfHrs:[],
        canBeLrs:true
      }
      
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Ship Type' : 'Edit Ship Type'
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
          vm.items = response.data;
          
         });

  },
  methods: {

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
                shipTypeId: item.shipTypeId,
                shipTypeName: item.shipTypeName,
                pointsOfHrs:item.pointsOfHrs,
                canBeLrs:item.canBeLrs
            }
            axios.delete('/api/'+this.apiController+'/'+item.shipTypeId, formDataDelete)
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
          //console.log("save",this.editedItem.flagCountry)
          const formDataPut = {
                shipTypeId: this.editedItem.shipTypeId,
                shipTypeName: this.editedItem.shipTypeName,
                pointsOfHrs:this.editedItem.pointsOfHrs,
                canBeLrs:this.editedItem.canBeLrs
          }
          axios.put('/api/'+this.apiController+'/'+this.editedItem.shipTypeId, formDataPut)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(err);
                    });
          this.snackbarSuccess = true;
        } else {
          if(this.editedItem.shipTypeName != '' && parseInt(this.editedItem.pointsOfHrs) >= 0) {
          var vm = this;
          //this.items.push(this.editedItem)
          const formDataPost = {
              
                shipTypeName: this.editedItem.shipTypeName,
                pointsOfHrs:this.editedItem.pointsOfHrs,
                canBeLrs:this.editedItem.canBeLrs
          }
          axios.post('/api/'+this.apiController, formDataPost)
                    .then(response => {
                        console.log('fuck',response);
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
  name: 'ShipType'
}
</script>

<style scoped>

.pred { color:red}
.pgreen { color: green}

</style>