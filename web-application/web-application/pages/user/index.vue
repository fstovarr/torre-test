<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h5>{{ $t('common.your-offers') }}</h5>
      </v-col>
      <v-col cols="12">
        <offers :items="offers" />
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12">
        <v-col cols="12">
          <h5>{{ $t('common.headhunters') }}</h5>
        </v-col>
        <v-col cols="12">
          <headhunters :items="headhunters" vertical />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  layout: 'users',
  data: () => ({ headhunters: [], offers: [] }),
  created() {
    this.getInitialData()
  },
  methods: {
    async getInitialData() {
      try {
        const headhunters = await this.$axios.$get('/api/v1/users/headhunters')
        this.headhunters = headhunters
      } catch (error) {
        console.error(error)
      }

      try {
        const offers = await this.$axios.$get('/api/v1/offers/user')
        console.log(offers)
        this.offers = offers
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
<style scoped>
.logo {
  border-radius: 50%;
}
.login-container {
  max-width: 600px;
  min-width: 400px;
  border-radius: 5px;
}
.login-btn-title {
  font-size: 14px;
  line-height: 16px;

  text-align: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;
}
</style>
