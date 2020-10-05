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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
exports.default = (base, head) => __awaiter(void 0, void 0, void 0, function* () {
    const token = core_1.getInput('token');
    const client = github_1.getOctokit(token);
    const { repo: { owner, repo }, } = github_1.context;
    const { data: { files }, } = yield client.repos.compareCommits({
        base,
        head,
        owner,
        repo,
    });
    return files.map(file => file.filename);
});
