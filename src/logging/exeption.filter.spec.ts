import { HttpExceptionFilter } from './http-exception.filter';

describe('ExeptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
