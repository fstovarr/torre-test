<template>
  <v-container>
    <h2>{{ $t('common.headhunters') }}</h2>
    <h5>{{ $t('common.working-with-you') }}</h5>
    <headhunters :list="headhunters" />

    <h5>{{ $t('common.explore-collaborators') }}</h5>
    <headhunters :list="suggestedHeadhunters" />
  </v-container>
</template>
<script>
export default {
  layout: 'headhunters',
  data: () => ({ suggestedHeadhunters: [], headhunters: [] }),
  created: async () => {
    try {
      const headhunters = await this.$axios.get('/headhunters')
      console.log(headhunters)
      this.headhunters = headhunters

      const suggestedHeadhunters = await this.$axios.get(
        '/headhunters/suggested'
      )
      this.suggestedHeadhunters = suggestedHeadhunters
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
