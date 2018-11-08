<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    :href="source"
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="username" label="Login" id="username" type="text" v-model="username"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

  export default {
    data: () => ({
      drawer: null,
      username: '',
      password: ''
    }),
    created() {
       /*axios.get('/api/Token', {headers: {'X-Custom-Header': 'foobar'}}).then(
         function(response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          const testovi = [];
          
          const data = response.data;
          for(let key in data) {
               const tt = data[key]
               tt.id = key
               testovi.push(tt)
          }

          console.log('testovi',testovi)
         });*/
    },
    methods: {
      login() {
        const formData = {
          Email: this.username,
          Password: this.password
        }
        axios.post('/api/token', formData).then(res => {
          console.log(res.data)
        })
      }
    },
    props: {
      source: String
    }
  }
</script>