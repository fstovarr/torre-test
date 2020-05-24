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
          readonly
          required
        ></input-text>
        <input-text
          type="email"
          :name="$t('auth.password')"
          rules="required|min:7"
          v-model="email"
          :label="$t('auth.password')"
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
        <input-text
          type="password"
          :name="$t('auth.password')"
          rules="required|min:7"
          v-model="passwordConfirmation"
          :label="$t('auth.password')"
          required
        ></input-text>
        <v-btn @click.prevent="createUser" color="primary" type="submit" block>
          {{ $t('common.signup') }}
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
  props: { username: { type: String } },
  data() {
    return {
      password: undefined,
      validUsername: false
    }
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    buttonPressed() {
      if (this.validUsername) this.performLogin()
      else this.validateUsername()
    },
    async validateUsername() {
      try {
        const valid = await this.$axios.get(
          `api/v1/auth/validate/${this.username}`
        )
        console.log(valid)
        this.validUsername = true
      } catch (error) {
        console.error(error)
        if (
          error.response.status === 404 &&
          error.response.data.error &&
          !error.response.data.error.code
        ) {
          this.validUsername = true
        }
      }
    },
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
