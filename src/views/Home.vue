<template>
  <div class="page page--main">
    <div class="container">
      <div class="page__wrap">
        <h1 class="page__title">Offers</h1>
        <button class="btn btn-outline-primary page__button-create" @click="create">Create offer</button>
      </div>
      <table class="table offers-table">
        <thead>
          <tr>
            <th class="offers-table__th" scope="col"></th>
            <th class="offers-table__th" scope="col">MIN LOAN AMOUNT</th>
            <th class="offers-table__th" scope="col">MAX LOAN AMOUNT</th>
            <th class="offers-table__th" scope="col">INTEREST RATE</th>
            <th class="offers-table__th" scope="col">REPAYMENT FREQUENCY</th>
          </tr>
        </thead>
        <tbody>
          <tr class="offers-table__tr" v-for="(offer, index) in offers" :key="offer.id" @click="edit(offer.id)">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ offer.minLoanAmount }} {{ offer.currency }}</td>
            <td>{{ offer.maxLoanAmount }} {{ offer.currency }}</td>
            <td>{{ offer.rate }}%</td>
            <td>{{ formatFrequancy(offer.repaimentFrequence) }}</td>
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
    create() {
      this.$router.push({ name: 'Offer', params: { id: 'create'} });
    },
    formatFrequancy(key) {
      const map = {
        one_time: 'One time',
        monthly: 'Monthly',
        biweekly: 'Biweekly',
      };
      return map[key];
    }
  },
  computed: {
    offers() {
      return this.$store.getters.offers;
    },
  },
};
</script>

<style lang="scss">
.page__wrap {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page__title {
  font-size: 24px;
}
.page__button-create {
  height: 35px;
  padding: 0 15px;
}

.offers-table {
  &__th {
    font-size: 12px;
  }
  &__tr {
    &:hover {
      background: lightgray;
      cursor: pointer;
    }
  }
}
</style>
