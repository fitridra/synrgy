"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseBuilder_1 = __importDefault(require("../utils/ResponseBuilder"));
describe('ResponseBuilder', () => {
    test('should build a response with default meta', () => {
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const data = { example: 'data' };
        const code = 200;
        ResponseBuilder_1.default.response({ res: mockResponse, code, data });
        expect(mockResponse.status).toHaveBeenCalledWith(code);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: undefined,
            data,
            meta: {
                page: 1,
                size: 10,
                totalData: 0,
                totalPages: 0,
            },
        });
    });
    test('should build a response with custom meta', () => {
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const data = { example: 'data' };
        const code = 200;
        const customMeta = {
            page: 2,
            size: 20,
            totalData: 100,
            totalPages: 5,
        };
        ResponseBuilder_1.default.response({
            res: mockResponse,
            code,
            data,
            meta: customMeta,
        });
        expect(mockResponse.status).toHaveBeenCalledWith(code);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: undefined,
            data,
            meta: customMeta,
        });
    });
});
