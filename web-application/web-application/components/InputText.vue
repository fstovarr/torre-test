<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
    <v-text-field
      name="text"
      v-bind="props"
      :type="isPassword ? (showContent ? 'text' : 'password') : type"
      v-model="internalValue"
      :error-messages="errors"
      :label="label"
      :required="required"
      :append-icon="
        isPassword && internalValue
          ? showContent
            ? 'mdi-eye'
            : 'mdi-eye-off'
          : undefined
      "
      @click:append="showContent = !showContent"
      outlined
    />
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: { ValidationProvider },
  props: {
    required: { type: Boolean, default: false },
    name: { type: String, default: undefined },
    type: { type: String, default: 'text' },
    rules: { type: String },
    label: { type: String },
    props: { type: Object },
    value: {}
  },
  data() {
    return {
      internalValue: undefined,
      showContent: false
    }
  },
  mounted() {
    this.internalValue = this.value
  },
  watch: {
    value(value) {
      this.internalValue = value
    },
    internalValue(value) {
      this.$emit('input', value)
    }
  },
  computed: {
    isPassword() {
      return this.type === 'password'
    }
  }
}
</script>
