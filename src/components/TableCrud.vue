<template>

  <div>
    
    <navigation-drawer></navigation-drawer>


 

    <v-content>
      

    
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Flag Id" v-model="editedItem.flagId"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Flag Name" v-model="editedItem.flagName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Flag Country" v-model="editedItem.flagCountry"></v-text-field>
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


<v-container grid-list-md>

  <v-layout row wrap>

    <v-flex xs12>

      <v-card>

<v-card-title>
      Nutrition
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
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.flagId }}</td>
        <td class="text-xs-right">{{ props.item.flagName }}</td>
        <td class="text-xs-right">{{ props.item.flagCountry }}</td>
        
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>

      </v-card>

    </v-flex>

  </v-layout>
       
  </v-container>

    </v-content>



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

        dialog: false,
        search:'',
      headers: [
        {
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'flagId'
        },
        
        { text: 'Flag Name', align: 'right', value: 'flagName' },
        { text: 'Flag Country', align: 'right', value: 'flagCountry' },
        { text: 'Actions', align: 'right', value: 'flagId', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        flagId: '',
        flagName: '',
        flagCountry:''
      },
      defaultItem: {
        flagId: '',
        flagName: '',
        flagCountry:''
      }
      
    }
  },
  name: 'TableCrud',
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.items = []
        var vm = this;
        axios.get('http://localhost:36946/api/Flag', {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          vm.items = response.data;
          
         });
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
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
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    }
}
</script>