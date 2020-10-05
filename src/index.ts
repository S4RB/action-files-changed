import { getInput, setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';

import getFiles from './getFiles';
import directoryHasChanges from './directoryHasChanges';

async function run(): Promise<void> {
  try {
    const directory = getInput('directory');
    const { eventName } = context;

    let base: string | undefined;
    let head: string | undefined;

    switch (eventName) {
      case 'pull_request':
        base = context.payload.pull_request?.base?.sha;
        head = context.payload.pull_request?.head?.sha;
        break;
      case 'push':
        base = context.payload.before;
        head = context.payload.after;
        break;
      default:
        setFailed(`Only supports push and pull request`);
    }

    if (!base || !head) {
      setFailed(`Failure: base and head commits are missing`);

      base = '';
      head = '';
    }

    const files = await getFiles(base, head);

    setOutput('hasChanged', directoryHasChanges(files, directory).toString());
  } catch (err) {
    setFailed(err.message);
  }
}

run();
