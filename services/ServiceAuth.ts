import Users, { IUsers } from '../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export type TLoginPayload = {
  username: string;
  password: string;
};

const JWT_KEY = 'RENTAL_CAR_JWT_KEY';

class ServiceAuth {
  constructor() {}

  async login(payload: TLoginPayload) {
    const user = (await Users.query().findOne(
      'username',
      payload.username
    )) as unknown as IUsers;

    if (!user) {
      return {
        success: false,
        data: 'User tidak ditemukan',
      };
    }

    const validatePassword = bcrypt.compareSync(
      payload.password,
      user.password
    );

    if (!validatePassword) {
      return {
        success: false,
        data: 'Username dan Password Anda Salah',
      };
    }

    return {
      success: true,
      data: user,
    };
  }

  async register(payload: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) {
    const create = await Users.query().insert(payload);
    return create;
  }

  async getUserById(id: string) {
    const user = await Users.query().findById(id);
    return user;
  }

  generateToken(user: IUsers) {
    const token = jwt.sign({ ...user }, JWT_KEY);
    return token;
  }
  async validateToken(token: string) {
    const decoded = jwt.verify(token, JWT_KEY);
    return decoded as IUsers;
  }
  async validateRole(user: IUsers, role: string) {
    return user.role === role;
  }
}

export default new ServiceAuth();
