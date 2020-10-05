"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const fileMatchesFolder = (filename, directory) => !!filename.match(`(?<!/)${directory}/.*`);
exports.default = (files, directory) => {
    const changedFiles = files.filter(filename => fileMatchesFolder(filename, directory));
    core_1.info(`Changed Files: ${changedFiles.join(' ')}`);
    return (changedFiles.length > 0);
};
