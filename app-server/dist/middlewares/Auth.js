"use strict";
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ServiceAuth_1 = require("../services/ServiceAuth");
class Auth {
    constructor() { }
    authorize(req, res, next) {
        const headers = req.headers;
        if (!headers.authorization) {
            return res.status(403).json({
                data: 'not authorized',
            });
        }
        const token = req.headers.authorization;
        const userData = jsonwebtoken_1.default.verify(`${token}`, ServiceAuth_1.JWT_KEY);
        if (!userData) {
            return res.status(403).json({
                data: 'not authorized',
            });
        }
        req.user = userData;
        next();
    }
    authorizeSuperAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = req.headers;
            if (!headers.authorization) {
                return res.status(403).json({
                    data: 'not authorized',
                });
            }
            const token = req.headers.authorization;
            const userData = jsonwebtoken_1.default.verify(`${token}`, 'RENTAL_CAR_JWT_KEY');
            if (!(userData.role === 'superadmin')) {
                return res.status(403).json({
                    data: 'not authorized, only superadmin role',
                });
            }
            req.user = userData;
            next();
        });
    }
}
exports.default = Auth;
