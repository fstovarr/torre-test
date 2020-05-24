<template>
  <v-container>
    <h2>{{ $t('common.offers') }}</h2>
    <v-row>
      <h5>{{ $t('common.active') }}</h5>
      <offers :list="activeOffers" />
    </v-row>

    <!-- <v-row>
      <h2>{{ $t('common.past') }}</h2>
      <headhunters :list="pastOffers" />
    </v-row> -->
  </v-container>
</template>
<script>
export default {
  layout: 'headhunters',
  data: () => ({ activeOffers: [], pastOffers: [] }),
  created: async () => {
    try {
      const activeOffers = await this.$axios.$get('/api/v1/offers/headhunter')
      console.log(activeOffers)
      this.activeOffers = activeOffers
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
