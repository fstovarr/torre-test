<template>
  <v-container>
    <v-row>
      <v-col xs="12" md="3">
        <profile :user="user" />
      </v-col>
      <v-col>
        <headhunters :list="headhunters" />
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
        const profile = await this.$axios.get('/profile')
        this.user = profile

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
