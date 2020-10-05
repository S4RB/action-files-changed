import { info } from '@actions/core';
import minimatch from 'minimatch';

export default (files: string[], directory: string): boolean => {
  const changedFiles = files.filter(filename => minimatch(filename, directory));

  info(`Changed Files: ${changedFiles.join(' ')}`);
  return changedFiles.length > 0;
};
