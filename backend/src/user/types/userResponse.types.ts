import { userEntity } from '../user.entity';

export type UserResponseType = Omit<userEntity, 'password'> & { token: string };
