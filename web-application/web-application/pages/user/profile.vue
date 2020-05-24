<template>
  <v-container>
    <v-row>
      <v-col xs="12" md="3">
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <v-img height="250" :src="user.person.picture"></v-img>

          <v-card-title>{{ user.person.name }}</v-card-title>

          <v-card-text>
            <!-- <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row> -->
            <div class="my-4 subtitle-1">
              {{ user.person.professionalHeadline }}
            </div>

            <div>
              {{ user.person.location.name }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <!-- <v-card-title>Title</v-card-title> -->

          <v-card-text>
            <!-- <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group> -->
          </v-card-text>

          <v-card-actions>
            <!-- <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col style="padding: 20px;">
        <h4 style="margin-top: 30px;">{{ $t('common.headhunters') }}</h4>
        <headhunters :list="headhunters" />

        <h4 style="margin-top: 30px;">{{ $t('common.offers') }}</h4>
        <offers :list="offers" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import jwt from 'jwt-decode'
export default {
  layout: 'users',
  data: () => ({
    user: { person: { location: {} } },
    headhunters: [],
    offers: []
  }),
  created() {
    this.getInitialData()
  },
  methods: {
    async getInitialData() {
      try {
        const profile = await this.$axios.$get(
          `/api/v1/profile/${jwt(this.$store.state.auth.token).username}`
        )
        console.log(profile)
        this.user = profile
      } catch (error) {
        console.error(error)
      }
      try {
        const headhunters = await this.$axios.$get('/api/v1/headhunters')
        this.headhunters = headhunters
      } catch (error) {
        console.error(error)
      }

      try {
        const offers = await this.$axios.$get('/api/v1/offers')
        this.offers = offers
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
