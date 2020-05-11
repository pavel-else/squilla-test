import offersJSON from './offers.json';
import usersJSON from './users.json';
import wait from './wait';
import sha256 from 'sha256';



class APIServer {
  constructor() {
    this.offers = offersJSON;
    this.users = usersJSON;  
  }

  async request(methodName, data) {
    await wait(700);

    const response = {
      status: '',
      data: {},
    };

    if (methodName === 'login') {
      const login = data.login;
      const hash = sha256(data.pass);

      const user = this.users.find((i) => i.login === login);

      if (!user) {
        response.status = 'undefined_user';
        response.data = {};
      } else if (user.hash !== hash) {
        response.status = "password_error";
        response.data = hash;
      } else {
        response.status = 'success';
        response.data = { token: hash };
      }
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