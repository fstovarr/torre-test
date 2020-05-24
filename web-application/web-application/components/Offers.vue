<template>
  <div class="d-flex" v-if="items.length > 0">
    <v-card
      style="margin: 10px;"
      :elevation="2"
      v-for="(item, idx) in items"
      :key="`offer_${idx}`"
    >
      <div>{{ item.offer.objective }}</div>
      <p class="display-1 text--primary"></p>
    </v-card>
  </div>
  <div v-else>
    <h4>{{ $t('common.no_data') }}</h4>
  </div>
</template>
<script>
export default {
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  created() {
    console.log(this.items)
  }
}
</script>
