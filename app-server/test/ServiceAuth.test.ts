import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUsers } from '../models/Users';
import RepoUsers from '../repositories/RepoUsers';
import ServiceAuth, { JWT_KEY, TLoginPayload } from '../services/ServiceAuth';
import ClientError from '../utils/ClientError';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('ServiceAuth', () => {
    let mockRepoUser: RepoUsers;
    let serviceAuth: ServiceAuth;
  
    beforeEach(() => {
      mockRepoUser = {
        findByUsername: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
      } as unknown as RepoUsers;
  
      serviceAuth = new ServiceAuth(mockRepoUser);
    });
  
    describe('login', () => {
      test('should throw ClientError if user is not found', async () => {
        (mockRepoUser.findByUsername as jest.Mock).mockResolvedValueOnce(undefined);
  
        await expect(serviceAuth.login({ username: 'nonexistent', password: 'password' }))
          .rejects.toThrow(ClientError);
      });
  
      test('should throw ClientError if password is invalid', async () => {
        const mockUser: IUsers = { id: '1', username: 'existing', password: 'hashedPassword', role: 'user', email: 'user@example.com', createdAt: new Date(), updatedAt: new Date() };
        (mockRepoUser.findByUsername as jest.Mock).mockResolvedValueOnce(mockUser);
        (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(false);
  
        await expect(serviceAuth.login({ username: 'existing', password: 'invalidPassword' }))
          .rejects.toThrow(ClientError);
      });
  
      test('should return a token if login is successful', async () => {
        const mockUser: IUsers = { id: '1', username: 'existing', password: 'hashedPassword', role: 'user', email: 'user@example.com', createdAt: new Date(), updatedAt: new Date() };
        (mockRepoUser.findByUsername as jest.Mock).mockResolvedValueOnce(mockUser);
        (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(true);
        (jwt.sign as jest.Mock).mockReturnValueOnce('mockedToken');
  
        const result = await serviceAuth.login({ username: 'existing', password: 'validPassword' });
  
        expect(result).toEqual('mockedToken');
      });
    });

  describe('register', () => {
    test('should encrypt password and call repoUser.create', async () => {
      const mockRegisterUser = {
        username: 'newuser',
        password: 'newpassword',
        email: 'newuser@example.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockEncryptedPassword = 'hashedPassword';

      jest.spyOn(serviceAuth, 'encryptPassword').mockReturnValueOnce(mockEncryptedPassword);
      jest.spyOn(mockRepoUser, 'create').mockResolvedValueOnce({} as IUsers);

      await serviceAuth.register(mockRegisterUser);

      expect(serviceAuth.encryptPassword).toHaveBeenCalledWith(mockRegisterUser.password);
      expect(mockRepoUser.create).toHaveBeenCalledWith({ ...mockRegisterUser, password: mockEncryptedPassword });
    });
  });

  describe('getUserById', () => {
    test('should call repoUser.findById and return the user', async () => {
      const mockUser: IUsers = {
        id: '1',
        username: 'existing',
        password: 'hashedPassword',
        role: 'user',
        email: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (mockRepoUser.findById as jest.Mock).mockResolvedValueOnce(mockUser);

      const result = await serviceAuth.getUserById('1');

      expect(result).toEqual(mockUser);
      expect(mockRepoUser.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('generateToken', () => {
    test('should call jwt.sign and return a token', () => {
      const mockUser: IUsers = {
        id: '1',
        username: 'existing',
        password: 'hashedPassword',
        role: 'user',
        email: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

      const result = serviceAuth.generateToken(mockUser);

      expect(result).toEqual('mockedToken');
      expect(jwt.sign).toHaveBeenCalledWith({ ...mockUser }, JWT_KEY);
    });
  });

  describe('validateToken', () => {
    test('should call jwt.verify and return the decoded user', () => {
      const mockUser: IUsers = {
        id: '1',
        username: 'existing',
        password: 'hashedPassword',
        role: 'user',
        email: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (jwt.verify as jest.Mock).mockReturnValueOnce(mockUser);

      const result = serviceAuth.validateToken('mockedToken');

      expect(result).toEqual(mockUser);
      expect(jwt.verify).toHaveBeenCalledWith('mockedToken', JWT_KEY);
    });
  });

  describe('validateRole', () => {
    test('should return true if user role matches the provided role', () => {
      const mockUser: IUsers = {
        id: '1',
        username: 'existing',
        password: 'hashedPassword',
        role: 'user',
        email: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = serviceAuth.validateRole(mockUser as IUsers, 'user');

      expect(result).toBeTruthy();
    });

    test('should return false if user role does not match the provided role', () => {
      const mockUser: IUsers = {
        id: '1',
        username: 'existing',
        password: 'hashedPassword',
        role: 'user',
        email: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = serviceAuth.validateRole(mockUser, 'admin');

      expect(result).toBeFalsy();
    });
  });

  describe('encryptPassword', () => {
    test('should call bcrypt.hashSync and return the hashed password', () => {
      const mockPassword = 'password';
      const mockHashedPassword = 'hashedPassword';
      const bcryptHashSyncMock = jest.spyOn(bcrypt, 'hashSync').mockReturnValueOnce(mockHashedPassword);
  
      const result = serviceAuth.encryptPassword(mockPassword);
  
      expect(result).toEqual(mockHashedPassword);
      expect(bcryptHashSyncMock).toHaveBeenCalledWith(mockPassword, 10); // Ensure the saltRounds is correct
    });
  });
  
});
