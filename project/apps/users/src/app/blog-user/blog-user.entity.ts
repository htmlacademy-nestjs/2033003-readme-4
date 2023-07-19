import { User, UserRole } from '@project/shared/app-types';

export class BlogUserEntity implements User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  passwordHash: string;
  avatar: string;
  role: UserRole;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      passwordHash: this.passwordHash,
      avatar: this.avatar,
      role: this.role,
    };
  }

  public fillEntity(blogUser: User) {
    this._id = blogUser._id;
    this.email = blogUser.email;
    this.firstname = blogUser.firstname;
    this.lastname = blogUser.lastname;
    this.passwordHash = blogUser.passwordHash;
    this.avatar = blogUser.avatar;
    this.role = blogUser.role;
  }
}
