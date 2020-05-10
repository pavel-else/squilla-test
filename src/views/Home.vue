<template>
  <div class="page page--main">
    <div class="container">
    <h1 class="page__title">Offers</h1>

      <table class="table offers-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">MIN LOAN AMOUNT</th>
            <th scope="col">MAX LOAN AMOUNT</th>
            <th scope="col">INTEREST RATE</th>
            <th scope="col">REPAYMENT FREQUENCY</th>
            <th class="offers-table__th offers-table__th--tools"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="offers-table__tr" v-for="(offer, index) in offers" :key="offer.id" @click="edit(offer)">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ offer.minLoanAmount }} {{ offer.currency }}</td>
            <td>{{ offer.maxLoanAmount }} {{ offer.currency }}</td>
            <td>{{ offer.rate }}%</td>
            <td>{{ offer.repaimentFrequence }}</td>
            <td>
              <div class="offers-table__tools">
                <div class="offer-tools">
                  <span class="offer-tools__btn" @click="deleteOffer(offer.id)">✕</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  created() {
    this.$store.dispatch('getOffers');
  },
  methods: {
    edit(offerId) {
      this.$router.push({ name: 'Offer', params: { id: offerId }});
    },
    deleteOffer(offerId) {
      this.$store.dispatch('deleteOffer', offerId);
    },
  },
  computed: {
    offers() {
      return this.$store.getters.offers;
    },
  },
};
</script>

<style lang="scss">
.offers-table {
  &__th--tools {
    min-width: 50px;
  }
  &__tr {
    &:hover {
      background: lightgray;
      .offers-table__tools {
        display: flex;
      }
    }
  }
  &__tools {
    display: none;
  }
}

.offer-tools {
  display: flex;
  &__btn {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
