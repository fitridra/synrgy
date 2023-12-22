import ClientError from '../utils/ClientError';

describe('ClientError', () => {
  test('should have the correct properties', () => {
    const errorMessage = 'This is a client error';
    const statusCode = 400;

    const clientError = new ClientError(errorMessage, statusCode);

    expect(clientError.message).toBe(errorMessage);
    expect(clientError.statusCode).toBe(statusCode);
    expect(clientError.name).toBe('client error');
  });

  test('should be an instance of Error', () => {
    const clientError = new ClientError('Error message', 400);

    expect(clientError).toBeInstanceOf(Error);
  });
});
