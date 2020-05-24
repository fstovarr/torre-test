<template>
  <v-card class="login-container pb-4 align-self-center">
    <logo />

    <v-card-text class="pa-10">
      <v-select
        v-model="type"
        :items="[
          { id: 'user', name: $t('common.regular') },
          { id: 'company', name: $t('common.company') },
          { id: 'headhunter', name: $t('common.headhunter') }
        ]"
        item-value="id"
        item-text="name"
        :label="$t('common.user_type')"
        outlined
      />

      <validation-observer
        tag="v-form"
        ref="validator"
        v-if="(type === undefined || type === 'user') && isValidation"
      >
        <input-text
          :name="$t('auth.username')"
          rules="required"
          v-model="username"
          :label="$t('auth.username')"
          required
        ></input-text>

        <v-btn
          @click.prevent="buttonPressed"
          color="primary"
          type="submit"
          block
        >
          {{ buttonTitle }}
        </v-btn>
      </validation-observer>

      <validation-observer
        tag="v-form"
        ref="validator"
        v-if="type === 'company' || type === 'headhunter' || isLogin"
      >
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
          @click.prevent="buttonPressed"
          color="primary"
          type="submit"
          block
        >
          {{ buttonTitle }}
        </v-btn>
      </validation-observer>

      <validation-observer
        tag="v-form"
        ref="validator"
        v-if="type === 'company' || type === 'headhunter' || isSignup"
      >
        <input-text
          :name="$t('auth.username')"
          rules="required"
          v-model="username"
          :label="$t('auth.username')"
          required
        ></input-text>
        <input-text
          :name="$t('auth.name')"
          rules="required"
          v-model="name"
          :label="$t('auth.name')"
          required
        ></input-text>
        <input-text
          type="email"
          :name="$t('auth.email')"
          rules="required|email"
          v-model="email"
          :label="$t('auth.email')"
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
          :name="$t('auth.password-confirmation')"
          rules="required|min:7"
          v-model="passwordConfirmation"
          :label="$t('auth.password-confirmation')"
          required
        ></input-text>

        <v-btn
          @click.prevent="buttonPressed"
          color="primary"
          type="submit"
          block
        >
          {{ buttonTitle }}
        </v-btn>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import jwt from 'jwt-decode'
import Logo from '@/components/Logo.vue'

export default {
  layout: 'auth',
  meta: { public: true },
  components: { Logo },
  data() {
    return {
      username: 'fabiostovarr',
      password: undefined,
      step: 'validation',
      passwordConfirmation: undefined,
      email: undefined,
      type: undefined,
      name: undefined
    }
  },
  computed: {
    buttonTitle() {
      switch (this.step) {
        case 'signup':
          return this.$t('common.signup')
        case 'login':
          return this.$t('common.login')
        default:
          return this.$t('common.continue')
      }
    },
    isSignup() {
      return this.step === 'signup'
    },
    isLogin() {
      return this.step === 'login'
    },
    isValidation() {
      return this.step === 'validation'
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      signup: 'auth/signup'
    }),
    buttonPressed() {
      console.log('PRESSED', this.step)
      switch (this.step) {
        case 'signup':
          this.createUser()
          break
        case 'login':
          this.performLogin()
          break
        case 'validation':
          this.validateUsername()
          break
        default:
          break
      }
    },
    async createUser() {
      try {
        const {
          username,
          email,
          password,
          passwordConfirmation,
          type,
          name
        } = this.$data
        const token = await this.signup({
          username,
          email,
          password,
          passwordConfirmation,
          type,
          name
        })
        this.$router.push(`/${jwt(token).type}/`)
      } catch (error) {
        console.error(error)
      }
    },

    async validateUsername() {
      try {
        const valid = await this.$axios.get(
          `api/v1/auth/validate/${this.username}`
        )
        console.log(valid)
        this.step = 'login'
      } catch (error) {
        console.error(error)
        if (
          error.response.status === 404 &&
          error.response.data.error &&
          !error.response.data.error.code
        ) {
          this.step = 'signup'
        }
      }
    },
    async performLogin() {
      const valid = await this.$refs.validator.validate()
      if (!valid) return

      try {
        const token = await this.login({
          username: this.username,
          password: this.password,
          type: this.type
        })

        this.$router.push(`/${jwt(token).type}/`)
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
