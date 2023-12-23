"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'client error';
        this.statusCode = statusCode;
    }
}
exports.default = ClientError;
