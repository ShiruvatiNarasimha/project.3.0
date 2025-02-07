import { Octokit } from "octokit";
export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const githubUrl = "https://github.com/docker/genai-stack";

type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  CommitDate: string;
};

export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const { data } = await octokit.rest.repos.listCommitCommentsForRepo({
    owner: "docker",
    repo: "genai-stack",
  });
  console.log(data);
};

getCommitHashes(githubUrl);
