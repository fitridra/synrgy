import Users, { IUsers } from '../models/Users';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

  async registerMember(payload: {
    username: string;
    email: string;
    password: string;
  }) {
    const create = await Users.query().insert({
      ...payload,
      role: 'member',
    });
    return create;
  }

  async getUserByToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, 'RENTAL_CAR_JWT_KEY') as JwtPayload;
      const userId = decodedToken.id;

      const user = await Users.query().findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
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
