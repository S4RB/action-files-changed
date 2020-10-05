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
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const getFiles_1 = __importDefault(require("./getFiles"));
const directoryHasChanges_1 = __importDefault(require("./directoryHasChanges"));
function run() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const directory = core_1.getInput('directory');
            const { eventName } = github_1.context;
            let base;
            let head;
            switch (eventName) {
                case 'pull_request':
                    base = (_b = (_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.base) === null || _b === void 0 ? void 0 : _b.sha;
                    head = (_d = (_c = github_1.context.payload.pull_request) === null || _c === void 0 ? void 0 : _c.head) === null || _d === void 0 ? void 0 : _d.sha;
                    break;
                case 'push':
                    base = github_1.context.payload.before;
                    head = github_1.context.payload.after;
                    break;
                default:
                    core_1.setFailed(`Only supports push and pull request`);
            }
            if (!base || !head) {
                core_1.setFailed(`Failure: base and head commits are missing`);
                base = '';
                head = '';
            }
            const files = yield getFiles_1.default(base, head);
            core_1.setOutput('hasChanged', directoryHasChanges_1.default(files, directory).toString());
        }
        catch (err) {
            core_1.setFailed(err.message);
        }
    });
}
run();
