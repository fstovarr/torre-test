<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" icon style="width: 60px;">
        <country-flag :country="currentLocale.flag" size="small" />
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click.prevent="changeLanguage(item.code)"
        style="width: 100%"
      >
        <v-list-item-title>
          <country-flag :country="item.flag" size="small" />
          {{ $t(`languages.${item.name}`) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { localize } from 'vee-validate'
import CountryFlag from 'vue-country-flag'

export default {
  components: { CountryFlag },
  data() {
    return { items: [] }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locales.find(
        (element) => element.code === this.$i18n.locale
      )
    }
  },
  mounted() {
    this.items = this.$i18n.locales
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.setLocale(lang)
      this.$vuetify.lang.current = lang
      this.loadLocale(lang)
    },
    loadLocale(code) {
      return import(`vee-validate/dist/locale/${code}.json`).then((locale) => {
        localize(code, locale)
      })
    }
  }
}
</script>
