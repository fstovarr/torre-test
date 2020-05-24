<template>
  <v-container>
    <v-row>
      <v-col xs="12" md="3">
        <profile :user="user" />
      </v-col>
      <v-col>
        <companies :list="companies" />
        <offers :list="offers" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'headhunters',
  data: () => ({ user: { name: 'Test' }, headhunters: [], offers: [] }),
  created: () => {
    this.getInitialData()
  },
  methods: {
    async getInitialData() {
      try {
        const profile = await this.$axios.$get('/api/v1/offers/headhunter')
        this.user = profile
      } catch (error) {
        console.error(error)
      }

      try {
        const companies = await this.$axios.$get(
          '/api/v1/headhunters/companies'
        )
        this.companies = companies
      } catch (error) {}

      try {
        const offers = await this.$axios.$get('/api/v1/offers/headhunters')
        this.offers = offers
      } catch (error) {}
    }
  }
}
</script>
