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
            <th class="offers-table__th" scope="col">
              <div class="offers-table__th-wrap">
                <span class="col-title col-title--main">MIN LOAN AMOUNT</span>
                <span class="col-title col-title--small">MIN</span>
                <div class="arrows">
                  <div class="arrows__arrow arrows__arrow--up" @click="switchSortFunction('minLoanAmount', false)"></div>
                  <div class="arrows__arrow arrows__arrow--down" @click="switchSortFunction('minLoanAmount', true)"></div>
                </div>
              </div>
            </th>
            <th class="offers-table__th" scope="col">
              <div class="offers-table__th-wrap">
                <span class="col-title col-title--main">MAX LOAN AMOUNT</span>
                <span class="col-title col-title--small">MAX</span>
                <div class="arrows">
                  <div class="arrows__arrow arrows__arrow--up" @click="switchSortFunction('maxLoanAmount', false)"></div>
                  <div class="arrows__arrow arrows__arrow--down" @click="switchSortFunction('maxLoanAmount', true)"></div>
                </div>
              </div>
            </th>
            <th class="offers-table__th" scope="col">
              <div class="offers-table__th-wrap">
                <span class="col-title col-title--main">INTEREST RATE</span>
                <span class="col-title col-title--small">RATE</span>
                <div class="arrows">
                  <div class="arrows__arrow arrows__arrow--up" @click="switchSortFunction('rate', false)"></div>
                  <div class="arrows__arrow arrows__arrow--down" @click="switchSortFunction('rate', true)"></div>
                </div>
              </div>
            </th>
            <th class="offers-table__th" scope="col">
              <div class="offers-table__th-wrap">
                <span class="col-title col-title--main">REPAYMENT FREQUENCY</span>
                <span class="col-title col-title--small">FREQ.</span>
                <div class="arrows">
                  <div class="arrows__arrow arrows__arrow--up" @click="switchSortFunction('repaimentFrequence', false)"></div>
                  <div class="arrows__arrow arrows__arrow--down" @click="switchSortFunction('repaimentFrequence', true)"></div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="offers-table__tr" v-for="(offer) in offers" :key="offer.id" @click="edit(offer.id)">
            <td>{{ offer.minLoanAmount }} {{ offer.currency }}</td>
            <td>{{ offer.maxLoanAmount }} {{ offer.currency }}</td>
            <td>{{ offer.rate }}%</td>
            <td>{{ formatFrequancy(offer.repaimentFrequence) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="page__pagination" v-if="offers && offers.length">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item">
              <span class="page-link" @click="pageCount === 1 ? page -= 0 : page -= 1">Previous</span>
            </li>

            <li class="page-item" v-for="num in pageCount" :key="num">
              <span class="page-link" @click="page = num" :class="num === page ? 'active' : ''">
                {{ num }}
              </span>
            </li>

            <li class="page-item">
              <span class="page-link" @click="pageCount === page ? page += 0 : page += 1">Next</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  created() {
    //this.$store.dispatch('login', { login: 'admin', pass: 'admin' });
    this.$store.dispatch('getOffers');
  },
  data() {
    return {
      sortField: 'minLoanAmount',
      sortFunction: (a, b) => a.id - b.id,
      page: 1,
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
    switchSortFunction(field, reverse) {
        const az = (a, b) => {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        return 0;
      };
      const za = (a, b) => {
        if (a[field] < b[field]) {
          return 1;
        }
        if (a[field] > b[field]) {
          return -1;
        }
        return 0;
      };

      this.sortFunction = reverse ? za : az;
    },

  },
  computed: {
    offers() {
      const offers = [ ...this.$store.getters.offers];
      const slice = offers.slice(0 + 10 * (this.page - 1), 10 * this.page);
      slice.sort(this.sortFunction);
      return slice;
    },
    pageCount() {
      return parseInt(this.$store.getters.offers.length / 10) + 1;
    }
  },
};
</script>

<style lang="scss">
.page {
  &__wrap {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    font-size: 24px;
  }
  &__button-create {
    height: 35px;
    padding: 0 15px;
  }
  &__pagination {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}


.offers-table {
  &__th {
    font-size: 12px;
  }
  &__th-wrap {
    display: flex;
    align-items: center;
  }
  &__tr {
    &:hover {
      background: lightgray;
      cursor: pointer;
    }
  }
  td {
    white-space: nowrap;
  }
}

.col-title--small {
  display: none;
}
@media screen and(max-width: 600px) {
  .col-title--main {
    display: none;
  }
  .col-title--small {
    display: inline;
  }
}


.arrows {
  margin-left: 5px;
  display: flex;
  flex-direction: column;

  &__arrow {
    display: block;

    width: 6px;
    height: 6px;

    border-left: 2px solid lightgray;
    border-top: 2px solid lightgray;

    transform: rotate(45deg);

    &:hover {
      cursor: pointer;
    }
  }

  &__arrow--down {
    transform: rotate(-135deg);
  }
}

.pagination {
  .active {
    background: #e9ecef;
  }
}
</style>
