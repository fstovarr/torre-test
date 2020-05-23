<template>
  <v-container>
    <v-row>
      <h5>{{ $t('common.your-offers') }}</h5>
      <offers :items="offers" />
    </v-row>
    <v-row>
      <v-col xs="12" md="6">
        <h5>{{ $t('common.headhunters') }}</h5>
        <headhunters :items="headhunters" vertical />
      </v-col>
      <v-col xs="12" md="6">
        <h5>{{ $t('common.headhunters') }}</h5>
        <headhunters vertical />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  layout: 'users',
  meta: { public: true },
  data: () => ({ headhunters: [], offers: [] }),
  created() {
    this.getInitialData()
  },
  methods: {
    async getInitialData() {
      try {
        const headhunters = await this.$axios.get('/headhunters')
        this.headhunters = headhunters
        const offers = await this.$axios.get('/offers')
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
