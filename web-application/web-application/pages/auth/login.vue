<template>
  <v-card class="login-container pb-4 align-self-center">
    <logo />

    <v-card-text class="pa-10">
      <validation-observer tag="v-form" ref="validator">
        <input-text
          :name="$t('auth.username')"
          rules="required"
          v-model="username"
          :label="$t('auth.username')"
          required
        ></input-text>
        <input-text
          type="password"
          :name="$t('auth.password')"
          rules="required|min:7"
          v-model="password"
          :label="$t('auth.password')"
          required
        ></input-text>
        <v-btn
          @click.prevent="performLogin"
          color="primary"
          type="submit"
          block
        >
          {{ $t('common.login') }}
        </v-btn>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Logo from '@/components/Logo.vue'

export default {
  layout: 'auth',
  meta: { public: true },
  components: { Logo },
  data() {
    return {
      username: 'fabiostovarr@gmail.com',
      password: undefined
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    async performLogin() {
      const valid = await this.$refs.validator.validate()
      if (!valid) return

      try {
        await this.login({ username: this.username, password: this.password })

        this.$router.push({ path: '/' })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
<style scoped>
.logo {
  border-radius: 50%;
}
.login-container {
  max-width: 600px;
  min-width: 400px;
  border-radius: 5px;
}
.login-btn-title {
  font-size: 14px;
  line-height: 16px;

  text-align: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;
}
</style>
