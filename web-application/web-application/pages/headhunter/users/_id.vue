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

    <v-dialog v-model="dialogs.assign">
      <v-card>
        <v-card-title
          ><h2>{{ user.name }}</h2></v-card-title
        >

        <v-card-text>
          <offers v-model="selectedOffer" :list="openOffers" selectable />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click.prevent="assignUser(user.id, selectedOffer.id)">{{
            $t('common.assign')
          }}</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: 'headhunters',
  data: () => ({
    user: { name: 'Test' },
    headhunters: [],
    offers: [],
    dialogs: { assign: false },
    openOffers: [],
    selectedOffer: undefined
  }),
  created() {
    this.getInitialData()
  },
  methods: {
    async openAssignDialog() {
      try {
        const offers = await this.$axios.get('/offers/open', {
          params: { user_email: this.$route.params.id }
        })
        this.openOffers = offers
        this.dialogs.assign = true
      } catch (error) {
        console.error(error)
      }
    },
    async getInitialData() {
      try {
        const profile = await this.$axios.get(
          `/profile/${this.$route.params.id}`
        )
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
