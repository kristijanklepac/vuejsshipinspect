<template>
<div>
    <v-dialog v-model="dialog" max-width="500px">
      
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
              <v-flex xs12 sm12 md12>
                <v-text-field label="RCA Code" v-model="editedItem.defaultCodeId" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field :multi-line="true" rows="2" label="Code Description" v-model="editedItem.codeDescription"></v-text-field>
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
  <v-toolbar color="teal" dark>
          
          <v-toolbar-title class="text-xs-center"><h1>{{ actionGrupaNaslov }} - Action Codes</h1></v-toolbar-title>
          <v-spacer></v-spacer>
          
        </v-toolbar>

         
    <v-card-title>
      <v-subheader><h2>{{ actionSubGrupaNaslov}}</h2></v-subheader>
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
        <td class="text-xs-left">{{ props.item.defaultCodeId }}</td>
        <td class="text-xs-left">{{ props.item.codeDescription }}</td>
        

        <td class="text-xs-right px-4">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <!--<v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>-->
          
        </td>

      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>

   
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
        rppi: [15,30,45,60, {"text":"All","value":-1}],
        disabled:true,
       /* rca: 'rca-pr',*/
        actionGroups: [],
        actionGrupaNaslov:'',
        actionSubGrupaNaslov:'',

        dialog: false,
        search:'',
      headers: [
        { text: 'Action Code', align: 'left', value: 'defaultCodeId' },
        { text: 'Code Description', align: 'left', value: 'codeDescription' },
        { text: 'Actions', align: 'right', value: 'actionCodeId', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        defaultCodeId: '',
        codeDescription: '',
        actionCodeId:'',
        actionGroup:'',
        actionSubGroup:''

      },
      defaultItem: {
        defaultCodeId: '',
        codeDescription: '',
        actionCodeId:'',
        actionGroup:'',
        actionSubGroup:''
      }
      
    
      
    }
  },
  props: ['action'],
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Action Code'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      
      action (val) { // on change link param novi axios poziv

        

      const findGroup = this.findObjectByKey(this.actionGroups, 'routeId', this.action);

      this.actionGrupaNaslov = findGroup.group;
      this.actionSubGrupaNaslov = findGroup.subGroup;

        this.initialize()

      },
      editedItem: {
     handler(val){
       // do stuff
       //alert("change");

       //console.log('change',this.editedItem)

       
       if( 
         
        this.defaultCodeId !=  '' &&
        this.codeDescription !=  '' &&
        
        this.actionGroup !=  '' &&
        this.actionSubGroup !=  '' 
              ) {

          this.disabled = false;

        } else {

          this.disabled = true;

        }
        
      

     },
     deep: true
  }
  
    },

    created () {

      const actioncodes = this.$store.state.actionCodes;

      this.actionGroups = actioncodes;

      // nadji group i subgroup prema :prop rca

      const findGroup = this.findObjectByKey(this.actionGroups, 'routeId', this.action);

      this.actionGrupaNaslov = findGroup.group;
      this.actionSubGrupaNaslov = findGroup.subGroup;

      this.initialize()



      //console.log(this.thetis);
      
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
      initialize () {
        this.items = []
        var vm = this;
        axios.get('/api/ActionCode/'+this.action, {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
          /*console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);*/
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



          const formDataPut = {
       
                defaultCodeId: this.editedItem.defaultCodeId,
                codeDescription: this.editedItem.codeDescription,
                actionCodeId: this.editedItem.actionCodeId,
                relatedRootCodeId: this.actionGrupaNaslov
                

          }

          var vm = this;
          console.log('puut', formDataPut)
          axios.put('/api/ActionCode/'+this.editedItem.actionCodeId, formDataPut)
                    .then(response => {

                        console.log(response)

                    }).catch(error => {
                        console.log(err);
                    });
        } else {
          //this.items.push(this.editedItem)

          console.log('action not allowed')
        }
        this.close()
      }
    },
  name: 'ActionCodeGroup'
}
</script>