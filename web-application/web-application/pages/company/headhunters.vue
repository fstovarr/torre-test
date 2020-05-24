<template>
  <v-container>
    <h2>{{ $t('common.headhunters') }}</h2>
    <h5 style="margin-bottom: 20px; margin-top: 20px;">
      {{ $t('common.working-with-you') }}
    </h5>
    <headhunters :list="headhunters" />
  </v-container>
</template>
<script>
export default {
  layout: 'companies',
  data: () => ({ suggestedHeadhunters: [], headhunters: [] }),
  created: async () => {
    try {
      const headhunters = await this.$axios.$get(
        '/api/v1/companies/headhunters'
      )
      console.log(headhunters)
      this.headhunters = headhunters
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
