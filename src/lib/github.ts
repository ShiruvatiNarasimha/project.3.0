import { Octokit } from "octokit";
export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const githubUrl = "https://github.com/ShiruvatiNarasimha/AIWorkFlow";

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
  const { data } = await octokit.rest.repos.listCommits({
    owner: "ShiruvatiNarasimha",
    repo: "AIWorkFlow",
  });
  const sortedCommits = data.sort(
    (a: any, b: any) =>
      new Date(b.commit.author.data).getTime() -
      new Date(a.commit.author.date).getTime(),
  ) as any[];
  return sortedCommits.slice(0, 15).map((commit: any) => ({
    commitHash: commit.sha as string,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit?.author?.avatar_url ?? "",
    CommitDate: commit.commit?.author?.date ?? "",
  }));
};

console.log(await getCommitHashes(githubUrl));
