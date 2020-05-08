<template>
  <div class="mian-page">
    <h1 class="main-page__title">Offers</h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">MIN LOAN AMOUNT</th>
          <th scope="col">MAX LOAN AMOUNT</th>
          <th scope="col">INTEREST RATE</th>
          <th scope="col">REPAYMENT FREQUENCY</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(offer, index) in offers" :key="offer.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ offer.minLoanAmount }} {{ offer.currency.toUpperCase() }}</td>
          <td>{{ offer.maxLoanAmount }} {{ offer.currency.toUpperCase() }}</td>
          <td>{{ offer.rate }}%</td>
          <td>{{ offer.repaimentFrequence }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  computed: {
    offers() {
      return this.$store.getters.offers;
    },
  },
};
</script>
