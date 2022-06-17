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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
(async () => {
    var _a;
    if (cluster_1.default.isPrimary) {
        const numCPUs = (0, os_1.cpus)().length;
        console.log(`Master process started`);
        for (let i = 0; i < numCPUs; i++) {
            cluster_1.default.fork();
        }
    }
    else {
        const id = (_a = cluster_1.default.worker) === null || _a === void 0 ? void 0 : _a.id;
        await Promise.resolve().then(() => __importStar(require('./index')));
        console.log(`Worker with id ${process.pid} has been spawned`);
    }
})();
//# sourceMappingURL=cluster.js.map