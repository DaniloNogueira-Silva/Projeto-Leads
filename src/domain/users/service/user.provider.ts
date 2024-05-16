import { UserSchema } from "../schema/user.schema";

export const UserProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];