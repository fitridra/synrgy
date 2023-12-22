import Users, { IUsers } from '../models/Users';

export interface IRegisterUser {
  username: string;
  password: string;
  email: string;
  role: string;
}

class RepoUsers {
  constructor() {}
  async findByUsername(username: string): Promise<IUsers | undefined> {
    const user = await Users.query().findOne('username', username);
    return user as unknown as IUsers | undefined;
  }
  async findById(id: string): Promise<IUsers | undefined> {
    const user = await Users.query().findById(id);
    return user as unknown as IUsers | undefined;
  }
  async create(userData: IRegisterUser): Promise<IUsers> {
    const user = await Users.query().insert(userData);
    return user as unknown as IUsers;
  }
}

export default RepoUsers;
