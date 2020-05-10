import offersJSON from './offeers.json';
import wait from './wait';



class APIServer {
  constructor() {
    this.offers = offersJSON;    
  }

  async request(methodName, data) {
    await wait(700);

    const response = {};

    if (methodName === 'getOffers') {
      response.status = 'success';
      response.data = this.offers;
    }
    if (methodName === 'createOffer') {
      this.offers.push(data);
      response.status = 'success';
      response.data = {};
    }
    if (methodName === 'deleteOffer') {
      const idOfferDelete = data;
      const offerList = this.offers.filter(i => i.id !== idOfferDelete);
      this.offers = offerList;
      response.status = 'success';
      response.data = {};
    }
    if (methodName === 'updateOffer') {
      const offer = data;
      const newOffers = this.offers.reduce((acc, item) => {
        acc.push(item.id === offer.id ? offer : item);
        return acc;
      }, []);

      this.offers = newOffers;

      response.status = 'success';
      response.data = {};
    }
      
    return response;
  }
}

export default APIServer;