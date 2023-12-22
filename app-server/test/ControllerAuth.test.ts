import { Request, Response, NextFunction } from 'express';
import ControllerAuth from '../controllers/api/ControllerAuth';
import ServiceAuth from '../services/ServiceAuth';
import ResponseBuilder from '../utils/ResponseBuilder';
import RepoUsers from '../repositories/RepoUsers';

jest.mock('../services/ServiceAuth');
jest.mock('../repositories/RepoUsers');

const MockedServiceAuth = ServiceAuth as jest.Mocked<typeof ServiceAuth>;
const MockedRepoUsers = RepoUsers as jest.Mocked<typeof RepoUsers>;

describe('ControllerAuth', () => {
  let controllerAuth: ControllerAuth;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    const repoUser = new MockedRepoUsers();
    const serviceAuth = new ServiceAuth(repoUser);
    controllerAuth = new ControllerAuth(serviceAuth);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('login', () => {
    it('should handle login success', async () => {
      const mockLoginResponse = { userId: 123, token: 'mockToken' };
      (MockedServiceAuth.prototype.login as jest.Mock).mockResolvedValue(mockLoginResponse);

      mockRequest.body = { username: 'mockUsername', password: 'mockPassword' };

      await controllerAuth.login()(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(MockedServiceAuth.prototype.login).toHaveBeenCalledWith({
        username: 'mockUsername',
        password: 'mockPassword',
      });
      expect(mockNext).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle login failure', async () => {
      const mockError = new Error('Login failed');
      (MockedServiceAuth.prototype.login as jest.Mock).mockRejectedValue(mockError);

      mockRequest.body = { username: 'mockUsername', password: 'mockPassword' };

      await controllerAuth.login()(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(MockedServiceAuth.prototype.login).toHaveBeenCalledWith({
        username: 'mockUsername',
        password: 'mockPassword',
      });
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('registerAdmin', () => {
    it('should handle admin registration success', async () => {
      const mockRegisterResponse = { userId: 456, message: 'Registration successful' };
      (MockedServiceAuth.prototype.register as jest.Mock).mockResolvedValue(mockRegisterResponse);

      mockRequest.body = {
        email: 'mockEmail',
        password: 'mockPassword',
        role: 'admin',
        username: 'mockUsername',
      };

      await controllerAuth.registerAdmin()(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(MockedServiceAuth.prototype.register).toHaveBeenCalledWith({
        email: 'mockEmail',
        password: 'mockPassword',
        role: 'admin',
        username: 'mockUsername',
      });
      expect(mockNext).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle admin registration failure', async () => {
      const mockError = new Error('Registration failed');
      (MockedServiceAuth.prototype.register as jest.Mock).mockRejectedValue(mockError);

      mockRequest.body = {
        email: 'mockEmail',
        password: 'mockPassword',
        role: 'admin',
        username: 'mockUsername',
      };

      await controllerAuth.registerAdmin()(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(MockedServiceAuth.prototype.register).toHaveBeenCalledWith({
        email: 'mockEmail',
        password: 'mockPassword',
        role: 'admin',
        username: 'mockUsername',
      });
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
