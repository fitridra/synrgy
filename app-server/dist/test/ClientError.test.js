"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientError_1 = __importDefault(require("../utils/ClientError"));
describe('ClientError', () => {
    test('should have the correct properties', () => {
        const errorMessage = 'This is a client error';
        const statusCode = 400;
        const clientError = new ClientError_1.default(errorMessage, statusCode);
        expect(clientError.message).toBe(errorMessage);
        expect(clientError.statusCode).toBe(statusCode);
        expect(clientError.name).toBe('client error');
    });
    test('should be an instance of Error', () => {
        const clientError = new ClientError_1.default('Error message', 400);
        expect(clientError).toBeInstanceOf(Error);
    });
});
