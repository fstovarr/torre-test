<template>
  <v-container>
    <v-row>
      <v-col xs="12" md="3">
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <v-img height="250" :src="user.profile_pic"></v-img>

          <v-card-title>{{ user.name }}</v-card-title>

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
              {{ user.description }}
            </div>

            <div>
              {{ user.bio }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Title</v-card-title>

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
      <v-col>
        <headhunters :list="headhunters" />
        <offers :list="offers" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'users',
  data: () => ({ user: { name: 'Test' }, headhunters: [], offers: [] }),
  created: () => {
    this.getInitialData()
  },
  methods: {
    async getInitialData() {
      try {
        const profile = await this.$axios.get('/profile')
        this.user = profile

        const headhunters = await this.$axios.get('/headhunters')
        this.headhunters = headhunters

        const offers = await this.$axios.get('/offers')
        this.offers = offers
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
