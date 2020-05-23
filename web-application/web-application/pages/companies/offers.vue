<template>
  <v-container>
    <h2>{{ $t('common.offers') }}</h2>
    <v-row>
      <h5>{{ $t('common.active') }}</h5>
      <offers :list="activeOffers" />
    </v-row>

    <v-row>
      <h2>{{ $t('common.past') }}</h2>
      <headhunters :list="pastOffers" />
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
  layout: 'companies',
  data: () => ({
    activeOffers: [],
    pastOffers: [],
    dialogs: { assign: false }
  }),
  created: async () => {
    try {
      const activeOffers = await this.$axios.get('/offers')
      console.log(activeOffers)
      this.activeOffers = activeOffers

      const pastOffers = await this.$axios.get('/offers/finished')
      this.pastOffers = pastOffers
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
