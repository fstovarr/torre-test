<template>
  <v-container>
    <v-row>
      <h5>{{ $t('common.your-users') }}</h5>
      <users :items="users" />
    </v-row>
    <v-row>
      <v-col xs="12" md="6">
        <h5>{{ $t('common.companies') }}</h5>
        <companies :items="companies" vertical />
      </v-col>
      <v-col xs="12" md="6">
        <h5>{{ $t('common.offers') }}</h5>
        <offers :items="offers" vertical />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  layout: 'headhunters',
  data: () => ({ users: [], companies: [], offers: [] }),
  created() {
    this.getInitialData()
  },
  methods: {
    async getInitialData() {
      try {
        const users = await this.$axios.get('/users')
        this.users = users
        const offers = await this.$axios.get('/offers')
        this.offers = offers
        const companies = await this.$axios.get('/companies')
        this.companies = companies
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
