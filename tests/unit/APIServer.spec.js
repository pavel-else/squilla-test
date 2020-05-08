import APIServer from '@/APIServer/APIServer';

describe('APIServer', () => {
  it('main check', async () => {
    const server = new APIServer();    
    const testOffer = { id: -1 };

    const offers1 = await server.request('getOffers');
    expect(offers1.find(i => i.id == -1)).toBeUndefined();

    await server.request('createOffer', testOffer);
    const offers2 = await server.request('getOffers');
    expect(offers2.find(i => i.id == -1)).toEqual(testOffer);

    expect(response.data).toBeTruthy();
  });
});
