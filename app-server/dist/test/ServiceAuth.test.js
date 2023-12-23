"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ServiceAuth_1 = __importStar(require("../services/ServiceAuth"));
const ClientError_1 = __importDefault(require("../utils/ClientError"));
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
describe('ServiceAuth', () => {
    let mockRepoUser;
    let serviceAuth;
    beforeEach(() => {
        mockRepoUser = {
            findByUsername: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
        };
        serviceAuth = new ServiceAuth_1.default(mockRepoUser);
    });
    describe('login', () => {
        test('should throw ClientError if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRepoUser.findByUsername.mockResolvedValueOnce(undefined);
            yield expect(serviceAuth.login({ username: 'nonexistent', password: 'password' }))
                .rejects.toThrow(ClientError_1.default);
        }));
        test('should throw ClientError if password is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: '1', username: 'existing', password: 'hashedPassword', role: 'user', email: 'user@example.com', createdAt: new Date(), updatedAt: new Date() };
            mockRepoUser.findByUsername.mockResolvedValueOnce(mockUser);
            bcrypt_1.default.compareSync.mockReturnValueOnce(false);
            yield expect(serviceAuth.login({ username: 'existing', password: 'invalidPassword' }))
                .rejects.toThrow(ClientError_1.default);
        }));
        test('should return a token if login is successful', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: '1', username: 'existing', password: 'hashedPassword', role: 'user', email: 'user@example.com', createdAt: new Date(), updatedAt: new Date() };
            mockRepoUser.findByUsername.mockResolvedValueOnce(mockUser);
            bcrypt_1.default.compareSync.mockReturnValueOnce(true);
            jsonwebtoken_1.default.sign.mockReturnValueOnce('mockedToken');
            const result = yield serviceAuth.login({ username: 'existing', password: 'validPassword' });
            expect(result).toEqual('mockedToken');
        }));
    });
    describe('register', () => {
        test('should encrypt password and call repoUser.create', () => __awaiter(void 0, void 0, void 0, function* () {
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
            jest.spyOn(mockRepoUser, 'create').mockResolvedValueOnce({});
            yield serviceAuth.register(mockRegisterUser);
            expect(serviceAuth.encryptPassword).toHaveBeenCalledWith(mockRegisterUser.password);
            expect(mockRepoUser.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, mockRegisterUser), { password: mockEncryptedPassword }));
        }));
    });
    describe('getUserById', () => {
        test('should call repoUser.findById and return the user', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = {
                id: '1',
                username: 'existing',
                password: 'hashedPassword',
                role: 'user',
                email: 'user@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockRepoUser.findById.mockResolvedValueOnce(mockUser);
            const result = yield serviceAuth.getUserById('1');
            expect(result).toEqual(mockUser);
            expect(mockRepoUser.findById).toHaveBeenCalledWith('1');
        }));
    });
    describe('generateToken', () => {
        test('should call jwt.sign and return a token', () => {
            const mockUser = {
                id: '1',
                username: 'existing',
                password: 'hashedPassword',
                role: 'user',
                email: 'user@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            jsonwebtoken_1.default.sign.mockReturnValue('mockedToken');
            const result = serviceAuth.generateToken(mockUser);
            expect(result).toEqual('mockedToken');
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith(Object.assign({}, mockUser), ServiceAuth_1.JWT_KEY);
        });
    });
    describe('validateToken', () => {
        test('should call jwt.verify and return the decoded user', () => {
            const mockUser = {
                id: '1',
                username: 'existing',
                password: 'hashedPassword',
                role: 'user',
                email: 'user@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            jsonwebtoken_1.default.verify.mockReturnValueOnce(mockUser);
            const result = serviceAuth.validateToken('mockedToken');
            expect(result).toEqual(mockUser);
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith('mockedToken', ServiceAuth_1.JWT_KEY);
        });
    });
    describe('validateRole', () => {
        test('should return true if user role matches the provided role', () => {
            const mockUser = {
                id: '1',
                username: 'existing',
                password: 'hashedPassword',
                role: 'user',
                email: 'user@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = serviceAuth.validateRole(mockUser, 'user');
            expect(result).toBeTruthy();
        });
        test('should return false if user role does not match the provided role', () => {
            const mockUser = {
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
            const bcryptHashSyncMock = jest.spyOn(bcrypt_1.default, 'hashSync').mockReturnValueOnce(mockHashedPassword);
            const result = serviceAuth.encryptPassword(mockPassword);
            expect(result).toEqual(mockHashedPassword);
            expect(bcryptHashSyncMock).toHaveBeenCalledWith(mockPassword, 10); // Ensure the saltRounds is correct
        });
    });
});
