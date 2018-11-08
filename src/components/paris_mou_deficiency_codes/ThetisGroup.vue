<template>
<div>
    <v-dialog v-model="dialog" max-width="500px">
      <!--v-btn color="primary" dark slot="activator" class="mb-2">New Paris MOU Deficiency Code</v-btn>-->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
              <v-flex xs12 sm12 md12>
                <v-text-field label="THETIS Code" v-model="editedItem.thetisCode" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field :multi-line="true" rows="2" label="Defective Item" v-model="editedItem.defectiveItem"></v-text-field>
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




      


<v-card>
  <v-toolbar color="teal" dark>
          
          <v-toolbar-title class="text-xs-center"><h1>{{ thetisGrupaNaslov }} - Deficiency Codes</h1></v-toolbar-title>
          <v-spacer></v-spacer>
          
        </v-toolbar>

         
    <v-card-title>
      <v-subheader><h2>{{ thetisSubGrupaNaslov}}</h2></v-subheader>
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
        <td class="text-xs-left">{{ props.item.thetisCode }}</td>
        <td class="text-xs-left">{{ props.item.defectiveItem }}</td>
        

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
        thetisGroups: [],
        thetisGrupaNaslov:'',
        thetisSubGrupaNaslov:'',

        dialog: false,
        search:'',
      headers: [
        { text: 'Thetis Code', align: 'left', value: 'thetisCode' },
        { text: 'Defective Item', align: 'left', value: 'defectiveItem' },
        { text: 'Actions', align: 'right', value: 'parisMouDeficiencyCodeId', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        parisMouDeficiencyCodeId: '',
        defectiveItem: '',
        thetisCode:'',
        thetisGroup:'',
        thetisSubGroup:''

      },
      defaultItem: {
        parisMouDeficiencyCodeId: '',
        defectiveItem: '',
        thetisCode:'',
        thetisGroup:'',
        thetisSubGroup:''
      }
      
    
      
    }
  },
  props: ['thetis'],
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Paris Mou Deficiency Code'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      
      thetis (val) { // on change link param novi axios poziv

        //console.log(this.thetis);

         // nadji group i subgroup prema :prop thetis

      const findGroup = this.findObjectByKey(this.thetisGroups, 'routeId', this.thetis);

      this.thetisGrupaNaslov = findGroup.group;
      this.thetisSubGrupaNaslov = findGroup.subGroup;

        this.initialize()

      },
      editedItem: {
     handler(val){
       // do stuff
       //alert("change");

       //console.log('change',this.editedItem)

       
       if( 
         
              this.editedItem.thetisCode != '' &&
              this.editedItem.defectiveItem != '' &&
              this.editedItem.parisMouDeficiencyCodeId != '' &&
              this.editedItem.thetisGroup !='' &&
              this.editedItem.thetisSubGroup !=''
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

      const tstr = this.$store.state.thetisGroupRuterData;

      this.thetisGroups = tstr;

      // nadji group i subgroup prema :prop thetis

      const findGroup = this.findObjectByKey(this.thetisGroups, 'routeId', this.thetis);

      this.thetisGrupaNaslov = findGroup.group;
      this.thetisSubGrupaNaslov = findGroup.subGroup;

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
        axios.get('/api/ParisMouDeficiencyCode/Thetis'+this.thetis, {headers: {'X-Custom-Header': 'foobar'}}).then(
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
       
              thetisCode:this.editedItem.thetisCode,
              defectiveItem:this.editedItem.defectiveItem,
              parisMouDeficiencyCodeId:this.editedItem.parisMouDeficiencyCodeId,
              thetisGroup:this.editedItem.thetisGroup,
              thetisSubGroup:this.editedItem.thetisSubGroup

          }

          var vm = this;
          console.log('puut', formDataPut)
          axios.put('/api/ParisMouDeficiencyCode/'+this.editedItem.parisMouDeficiencyCodeId, formDataPut)
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
  name: 'ThetisGroup'
}
</script>