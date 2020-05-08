export default {
  state: {
    offers: [
      { id: 123123, uid: 'x100', minLoanAmount: 200, maxLoanAmount: 400, currency: 'pax', rate: 6, repaimentFrequence: 'oneTIme' },
      { id: 234235, uid: 'x200', minLoanAmount: 200, maxLoanAmount: 300, currency: 'usdc', rate: 8, repaimentFrequence: 'monthly' },
      { id: 364364, uid: 'x300', minLoanAmount: 300, maxLoanAmount: 500, currency: 'usdc', rate: 7, repaimentFrequence: 'oneTIme' },
    ],
  },
  getters: {
    offers(state) {
      return state.offers;
    },
  },
};