<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>
<script>
export default {
  layout: 'headhunters',
  data() {
    return {
      totalItems: 0,
      items: [],
      loading: false,
      options: {},
      headers: []
    }
  },
  created() {
    this.getData()
  },
  watch: {
    options: {
      handler() {
        this.getData()
      },
      deep: true
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // getDataFromApi() {
    //   this.loading = true
    //   return new Promise((resolve, reject) => {
    //     const { sortBy, sortDesc, page, itemsPerPage } = this.options

    //     let items = this.getDesserts()
    //     const total = items.length

    //     if (sortBy.length === 1 && sortDesc.length === 1) {
    //       items = items.sort((a, b) => {
    //         const sortA = a[sortBy[0]]
    //         const sortB = b[sortBy[0]]

    //         if (sortDesc[0]) {
    //           if (sortA < sortB) return 1
    //           if (sortA > sortB) return -1
    //           return 0
    //         } else {
    //           if (sortA < sortB) return -1
    //           if (sortA > sortB) return 1
    //           return 0
    //         }
    //       })
    //     }

    //     if (itemsPerPage > 0) {
    //       items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    //     }

    //     setTimeout(() => {
    //       this.loading = false
    //       resolve({
    //         items,
    //         total
    //       })
    //     }, 1000)
    //   })
    // },
    extractHeaders(items) {
      console.log(items)
      let headers = []
      if (items.length > 0)
        headers = Object.keys(items[0]).map((key) => ({
          text: this.$t(`common.${key}`),
          align: 'start',
          sortable: false,
          value: key
        }))
      return headers
    },
    async getData() {
      try {
        const users = await this.$axios.get('/users')
        console.log(users)
        this.headers = this.extractHeaders(users)
      } catch (error) {
        console.error(error)
      } finally {
        this.items = [
          {
            name: 'Frozen Yogurt',
            lastname: 159,
            email: 6.0,
            offers: 24
          }
        ]
        this.headers = this.extractHeaders(this.items)
        this.totalItems = this.items.total

        console.log(this.headers)
      }
    }
  }
}
</script>
