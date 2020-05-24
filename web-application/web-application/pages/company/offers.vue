<template>
  <v-container>
    <h2>{{ $t('common.offers') }}</h2>
    <v-row>
      <h5>{{ $t('common.active') }}</h5>
      <offers :list="activeOffers" />
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
    dialogs: { assign: false }
  }),
  async created() {
    try {
      const activeOffers = await this.$axios.$get('/api/v1/offers/users')
      this.activeOffers = activeOffers
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
