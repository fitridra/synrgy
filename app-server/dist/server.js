"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const ResponseBuilder_1 = __importDefault(require("./utils/ResponseBuilder"));
const { PORT = 3000 } = process.env;
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: 'https://synrgy.vercel.app',
        }));
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
        this.app.use('/api', api_1.default);
        // Handle not found errors
        this.app.use(this.notFoundHandler);
        // Handle other errors
        this.app.use(this.errorHandler);
    }
    notFoundHandler(_, res, __) {
        return ResponseBuilder_1.default.response({
            res,
            code: 404,
            message: 'resource, data or page not found',
            data: 'not found',
        });
    }
    errorHandler(err, _, res, __) {
        var _a;
        console.log(err.stack);
        return ResponseBuilder_1.default.response({
            res,
            code: (_a = err === null || err === void 0 ? void 0 : err.statusCode) !== null && _a !== void 0 ? _a : 500,
            message: err.message,
            data: err.name,
        });
    }
    run() {
        this.app.listen(PORT, () => {
            console.log('Server running on http://localhost:%s', PORT);
        });
    }
}
new Server().run();
