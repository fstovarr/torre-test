<template>
  <div>Headhunters</div>
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
  }
}
</script>
