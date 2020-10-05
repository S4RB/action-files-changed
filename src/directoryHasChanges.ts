import { info } from '@actions/core';

const fileMatchesFolder = (filename: string, directory: string): boolean =>
  !!filename.match(`(?<!/)${directory}/.*`);

export default (files: string[], directory: string): boolean => {
  const changedFiles = files.filter(filename =>
    fileMatchesFolder(filename, directory),
  );

  info(`Changed Files: ${changedFiles.join(' ')}`);
  return changedFiles.length > 0;
};
