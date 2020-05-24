<template>
  <v-container>
    <v-row>
      <v-col xs="12" md="3">
        <profile :user="user">
          <template v-slot:actions>
            <v-btn @click.prevent="openAssignDialog">
              {{ $t('common.assign') }}
            </v-btn>
          </template>
        </profile>
      </v-col>
      <v-col>
        <offers :list="offers" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'companies',
  data: () => ({
    user: { name: 'Test' },
    headhunters: [],
    offers: [],
    openOffers: [],
    selectedOffer: undefined
  }),
  created() {
    this.getInitialData()
  },
  methods: {
    async openAssignDialog() {
      try {
        const offers = await this.$axios.$get('/api/v1/offers/user', {
          // params: { user_email: this.$route.params.id }
        })
        this.openOffers = offers
        this.dialogs.assign = true
      } catch (error) {
        console.error(error)
      }
    },
    async getInitialData() {
      try {
        // const profile = await this.$axios
        //   .get
        //   // `/profile/${this.$route.params.id}`
        //   ()
        // this.user = profile

        const headhunters = await this.$axios.$get(
          '/api/v1/companies/headhunters'
        )
        this.headhunters = headhunters

        const offers = await this.$axios.$get('/api/v1/offers/user')
        this.offers = offers
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
