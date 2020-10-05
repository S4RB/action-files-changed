import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';

export default async (base: string, head: string): Promise<string[]> => {
  const token = getInput('token');
  const client = getOctokit(token);

  const {
    repo: { owner, repo },
  } = context;

  const {
    data: { files },
  } = await client.repos.compareCommits({
    base,
    head,
    owner,
    repo,
  });

  return files.map(file => file.filename);
};
