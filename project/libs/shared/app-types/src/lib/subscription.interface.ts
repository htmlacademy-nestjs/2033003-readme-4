import { User } from './user.interface';

export interface Subscription {
  id: string;
  subscriber: User;
  targetUser: User;
}
