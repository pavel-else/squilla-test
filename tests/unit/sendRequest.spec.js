import sendRequest from '@/functions/sendRequest';

describe('sendRequest', () => {
  it('getOffers', async () => {
    const response = await sendRequest('getOffers');
    expect(response.status).toBe('success');
    expect(response.data).toBeTruthy();
  });
});
