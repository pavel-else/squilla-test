import APIServer from '@/APIServer/APIServer';
import sha256 from 'sha256';

describe('APIServer', () => {
  it('offers', async () => {
    const server = new APIServer();    
    const response1 = await server.request('getOffers');  
    expect(response1.status).toBe('success');    

    // SAVE
    const testOffer = { uid: 'test', minLoanAmount: 222 };
    const responseSave = await server.request('createOffer', testOffer);
    expect(responseSave.status).toBe('success');

    const response2 = await server.request('getOffers');
    const offer = response2.data.find(i => i.uid == 'test');
    expect(offer.minLoanAmount).toBe(222);

    // UPDATE
    const updatedTestOffer = { id: offer.id, uid: 'test', minLoanAmount: 333 };
    await server.request('updateOffer', updatedTestOffer);
    const response3 = await server.request('getOffers');
    expect(response3.data.find((i) => i.id === offer.id)).toEqual(updatedTestOffer);

    // DELETE
    server.request('deleteOffer', offer.id);
    const response4 = await server.request('getOffers');
    expect(response4.data.find((i) => i.id === offer.id)).toBeUndefined();
  });

  it('users', async () => {
    const server = new APIServer();
    const user = { login: 'admin', pass: 'admin' };

    const response1 = await server.request('login', user);
    
    expect(response1.status).toBe('success');
    expect(response1.data).toEqual({ token: sha256(user.pass)});

    const undefinedUser = { login: 'undef', pass: 'askfdljh' };
    const response2 = await server.request('login', undefinedUser);
    expect(response2.status).toBe('undefined_user');

    const userWithFailedPass = { login: 'admin', pass: 'askfdljh' };
    const response3 = await server.request('login', userWithFailedPass);
    expect(response3.status).toBe('password_error');
  });

});
