const fs = require('fs');

const createOffer = async (offer) => {
  console.log('FS', fs)
  const path = '../offers.json';

  const id = Math.random();

  const offersJSON = await fs.readFile(path);

  const offers = JSON.parse(offersJSON);

  offers.push({ ...offer, id });

  return fs.writeFile(path, JSON.stringify(offers));
};

export default createOffer;