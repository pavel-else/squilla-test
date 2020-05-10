<template>
  <div class="page page--create">
    <div class="container">
      <h1 class="page__title" v-if="mod === 'create'">Create offer</h1>
      <h1 class="page__title" v-else>Update offer</h1>

      <table class="table create-table">
        <tbody>
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
              <v-input 
                inClass="form-control"
                type="string"
                v-model.trim="offer.repaimentFrequence"
                @valid="valid.repaimentFrequence = $event"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button class="btn btn-primary" :class="!isValidForm ? 'disabled' : ''" @click="submit" v-if="mod === 'create'">Create</button>
      <button class="btn btn-primary" :class="!isValidForm ? 'disabled' : ''" @click="submit" v-else>Update</button>
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
    if (this.$route.params.id && this.$route.params.id === 'create') {
      return;
    }

    const offers = this.$store.getters.offers;
    const offer = offers.find(i => i.id = this.$route.params.id);

    this.offer = { ...offer };  
    this.mod = 'update'; 
  },
  data() {
    return {
      mod: 'create', // 'update'
      offer: {
        minLoanAmount: null,
        maxLoanAmount: null,
        rate: null,
        repaimentFrequence: null,
      },

      valid: {
        min: false,
        max: false,
        rate: false,
        repaimentFrequence: false,
      }
    };
  },
  methods: {
    submit() {
      if (this.isValidForm) {
        this.$store.dispatch('createOffer', this.offer)
          .then(() => {
            this.$router.push({ name: 'Home' });
          });
      }
    }
  },
  computed: {
    isValidForm() {
      return Object.values(this.valid).reduce((acc, items) => acc && items, true);
    }
  },
};
</script>


<style lang="scss">

</style>