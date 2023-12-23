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
const ResponseBuilder_1 = __importDefault(require("../../utils/ResponseBuilder"));
class ControllerAuth {
    constructor(serviceAuth) {
        this._serviceAuth = serviceAuth;
    }
    login() {
        const auth = this._serviceAuth;
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield auth.login({
                    username: req.body.username,
                    password: req.body.password,
                });
                return ResponseBuilder_1.default.response({
                    res,
                    code: 200,
                    data: response,
                    message: 'login success',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    registerAdmin() {
        const auth = this._serviceAuth;
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield auth.register({
                    email: req.body.email,
                    password: req.body.password,
                    role: 'admin',
                    username: req.body.username,
                });
                return ResponseBuilder_1.default.response({
                    res,
                    code: 201,
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ControllerAuth;
