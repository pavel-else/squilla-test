import APIServer from '@/APIServer/APIServer';

describe('APIServer', () => {
  it('is work', async () => {
    const server = new APIServer();    
    const response1 = await server.request('getOffers');  
    expect(response1.status).toBe('success');    

    // SAVE
    const testOffer = { id: -1, uid: 'aaaa' };
    await server.request('createOffer', testOffer);
    const response2 = await server.request('getOffers');
  
    expect(response2.data.find(i => i.id == -1)).toEqual(testOffer);

    // UPDATE
    const updatedTestOffer = { id: -1, uid: 'bbb' };
    await server.request('updateOffer', updatedTestOffer);
    const response3 = await server.request('getOffers');
    expect(response3.data.find((i) => i.id === -1)).toEqual(updatedTestOffer);

    // DELETE
    server.request('deleteOffer', -1);
    const response4 = await server.request('getOffers');
    expect(response4.data.find((i) => i.id === -1)).toBeUndefined();
  });

});
