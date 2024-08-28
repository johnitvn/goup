import { marker } from './marker';

describe('marker', () => {
  it('should return the input string unchanged', () => {
    const input = 'test string';
    const result = marker(input);
    expect(result).toBe(input);
  });

  it('should handle empty strings', () => {
    const input = '';
    const result = marker(input);
    expect(result).toBe(input);
  });

  it('should handle strings with special characters', () => {
    const input = 'special!@#$%^&*()_+';
    const result = marker(input);
    expect(result).toBe(input);
  });

  it('should handle strings with spaces', () => {
    const input = 'string with spaces';
    const result = marker(input);
    expect(result).toBe(input);
  });
});
