"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const minimatch_1 = __importDefault(require("minimatch"));
exports.default = (files, directory) => {
    const changedFiles = files.filter(filename => minimatch_1.default(filename, directory));
    core_1.info(`Changed Files: ${changedFiles.join(' ')}`);
    return changedFiles.length > 0;
};
