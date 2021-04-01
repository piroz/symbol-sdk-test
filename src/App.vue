<template>
  <v-app>
    <v-app-bar
      app
      color="purple darken-3"
      dark
    >
      <div class="d-flex align-center">
        ノード上のハーベストアドレスの一覧
      </div>
    </v-app-bar>

    <v-main>
      <ShowHarvesters/>
    </v-main>
    <v-footer color="lighten-1" padless>
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="lighten-2 py-4 text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>piroz</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import ShowHarvesters from './components/ShowHarvesters';

export default {
  name: 'App',

  components: {
    ShowHarvesters,
  },

  data: () => ({
    //
  }),
};
</script>
