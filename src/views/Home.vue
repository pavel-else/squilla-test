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
            <th class="offers-table__th" scope="col">
              <span @click="switchSortFunction('minLoanAmount')">MIN LOAN AMOUNT</span>
            </th>
            <th class="offers-table__th" scope="col">
              <span @click="switchSortFunction('maxLoanAmount')">MAX LOAN AMOUNT</span>
            </th>
            <th class="offers-table__th" scope="col">
              <span @click="switchSortFunction('rate')">INTEREST RATE</span>
            </th>
            <th class="offers-table__th" scope="col">
              <span @click="switchSortFunction('repaimentFrequence')">REPAYMENT FREQUENCY</span>
            </th>
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
  created() {
    this.$store.dispatch('getOffers');
  },
  data() {
    return {
      sortField: 'minLoanAmount',
      sortFunction: (a, b) => a.id - b.id,
      reverseCounter: {
        minLoanAmount: 0,
        maxLoanAmount: 0,
        rate: 0,
        repaimentFrequence: 0,
      },
    };
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
    },
    nullAroundReverseCounter(field) {
     for (let i in this.reverseCounter) {
        this.reverseCounter[i] = i === field ? this.reverseCounter[i] : 0;
     }
    },
    switchSortFunction(field, reverse = false) {
      
      const az = (a, b) => {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      };
      const za = (a, b) => {
        if (a[field] < b[field]) {
          return 1;
        }
        if (a[field] > b[field]) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      };

      this.sortFunction = reverse ? za : az;
    },

  },
  computed: {
    offers() {
      const offers = this.$store.getters.offers;
      offers.sort(this.sortFunction);
      return offers;
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
