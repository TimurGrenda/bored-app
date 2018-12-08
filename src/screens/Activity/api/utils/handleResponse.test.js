import { handleResponse } from './handleResponse';

describe('Activity api handleResponse', () => {
  it('should transform OK response to json', () => {
    expect.assertions(2);

    const jsonObj = {};
    const response = {
      json: jest.fn(() => Promise.resolve(jsonObj)),
      ok: true,
    };
    const result = handleResponse(response);

    expect(response.json).toHaveBeenCalledTimes(1);
    return expect(result).resolves.toBe(jsonObj);
  });

  it('should reject Promise when response.ok != true', () => {
    expect.assertions(1);

    const jsonObj = {};
    const response = {
      json: jest.fn(() => Promise.resolve(jsonObj)),
      ok: false,
    };
    const result = handleResponse(response);

    return expect(result).rejects.toBe(jsonObj);
  });

  it('should reject Promise if there is error prop in response json', () => {
    expect.assertions(1);

    const jsonObj = {
      error: 'Error message',
    };
    const response = {
      json: jest.fn(() => Promise.resolve(jsonObj)),
      ok: true,
    };
    const result = handleResponse(response);

    return expect(result).rejects.toThrow();
  });

  it('should throw with text from json.error', () => {
    expect.assertions(1);

    const jsonObj = {
      error: 'Error message',
    };
    const response = {
      json: jest.fn(() => Promise.resolve(jsonObj)),
      ok: true,
    };
    const result = handleResponse(response);

    return expect(result).rejects.toThrowError(new Error('Error message'));
  });
});
