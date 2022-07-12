import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';

export const checkUUID = (id: string): boolean => {
  return uuidValidate(id) && uuidVersion(id) === 4;
}