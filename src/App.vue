<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        search peers @ ngl-dual
      </div>
    </v-app-bar>

    <v-main>
      <SearchPeerList/>
    </v-main>
  </v-app>
</template>

<script>
import SearchPeerList from './components/SearchPeerList';

export default {
  name: 'App',

  components: {
    SearchPeerList,
  },

  data: () => ({
    //
  }),
};
</script>
