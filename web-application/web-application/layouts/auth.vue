<template>
  <v-app dark>
    <v-content class="background-container">
      <v-app-bar :clipped-left="clipped" fixed app>
        <language-selector style="" />
      </v-app-bar>
      <v-container fill-height align-content-center justify-center>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      style="background-color: transparent;"
      class="justify-center mb-4"
      app
    >
      <span class="footer-title">{{ $t('app.name') }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import LanguageSelector from '@/components/LanguageSelector'

export default {
  components: { LanguageSelector },
  data() {
    return {
      fixed: true,
      title: this.$t('app.name')
    }
  }
}
</script>
<style>
.background-container {
  background-color: rgba(0, 0, 0, 0.12);
}
.footer-title {
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
}
</style>
