import offersJSON from './offeers.json';
import wait from './wait';
import crc32 from 'crc-32';



class APIServer {
  constructor() {
    this.offers = offersJSON;    
  }

  async request(methodName, data) {
    await wait(700);

    const response = {};

    if (methodName === 'login') {
      const user = data;
      const hash = crc32.str(user.pass);
      console.log(hash);
    }

    if (methodName === 'getOffers') {
      response.status = 'success';
      response.data = this.offers;
    }
    if (methodName === 'createOffer') {
      const newOffer = { ...data, id: this.getNewId() };
      this.offers.push(newOffer);
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

  getNewId() {
    const ids = this.offers.map((i) => i.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }
}

export default APIServer;