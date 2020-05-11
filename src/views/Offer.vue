<template>
  <div class="page page--create">
    <div class="container">
      <div class="page__wrap">
        <h1 class="page__title" v-if="mod === 'create'">Create offer</h1>
        <h1 class="page__title" v-else>Update offer</h1>
      </div>

      <table class="table create-table">
        <tbody>
          <tr>
            <td>WALLET: </td>
            <td>
              <select class="custom-select" v-model="offer.currency">
                <option value="USDT">USDT</option>
                <option value="PAX">PAX</option>
                <option value="USDS">USDS</option>
                <option value="DAI">DAI</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>MIN LOAN AMOUN: </td>
            <td>
              <v-input 
                inClass="form-control"
                type="natural"
                placeholder="Min"
                v-model.trim="offer.minLoanAmount"
                @valid="valid.min = $event"
              />
            </td>
          </tr>
          <tr>
            <td>MAX LOAN AMOUN: </td>
            <td>
              <v-input 
                inClass="form-control"
                type="natural"
                placeholder="Max"
                v-model.trim="offer.maxLoanAmount"
                @valid="valid.max = $event"
              />
            </td>
          </tr>
          <tr>
            <td>INTEREST RATE: </td>
            <td>
              <v-input 
                inClass="form-control"
                type="natural"
                placeholder="interest rate (% per year)"
                v-model.trim="offer.rate"
                @valid="valid.rate = $event"
              />
            </td>
          </tr>
          <tr>
            <td>REPAYMENT FREQUENCY: </td>
            <td>
              <select class="custom-select" v-model="offer.repaimentFrequence">
                <option value="one_time">One time</option>
                <option value="monthly">Monthly</option>
                <option value="biweekly">Biweekly</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="btns">
        <button class="btn btn-primary btns__button" :class="!isValidForm ? 'disabled' : ''" @click="create" v-if="mod === 'create'">Create</button>
        <button class="btn btn-primary btns__button" :class="!isValidForm ? 'disabled' : ''" @click="update" v-else>Update</button>
        
        <button class="btn btn-danger btns__button" v-if="mod === 'update'" @click="deleteOffer">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import vInput from '@/components/v-input';

export default {
  name: 'Offer',
  components: {
    vInput
  },
  mounted() {
    if (this.$route.params.id === 'create') {
      this.mod = 'create';
      return;
    }

    const offers = this.$store.getters.offers;
    const offer = offers.find((i) => i.id === parseInt(this.$route.params.id));

    if (!offer) {
      this.$router.push({ name: 'Home' });
    }

    this.offer = { ...offer };
    this.mod = 'update'; 
  },
  data() {
    return {
      mod: 'create', // 'update'
      offer: {
        currency: 'USDT',
        minLoanAmount: null,
        maxLoanAmount: null,
        rate: null,
        repaimentFrequence: 'one_time',
      },

      valid: {
        min: false,
        max: false,
        rate: false,
      }
    };
  },
  methods: {
    create() {
      if (this.isValidForm) {
        this.$store.dispatch('createOffer', this.offer)
          .then(() => {
            this.$router.push({ name: 'Home' });
          });
      }
    },
    update() {
      if (this.isValidForm) {
        this.$store.dispatch('updateOffer', this.offer)
          .then(() => {
            this.$router.push({ name: 'Home' });
          });
      }
    },
    deleteOffer() {
      const result = confirm('Are you sure?');
      if (result) {
        this.$store.dispatch('deleteOffer', this.$route.params.id)
          .then(() => {
            this.$router.push({ name: 'Home' });
          });
      }
    },
  },
  computed: {
    isValidForm() {
      return Object.values(this.valid).reduce((acc, items) => acc && items, true);
    }
  },
};
</script>


<style lang="scss">
.btns__button {
  padding: 5px 30px;

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>