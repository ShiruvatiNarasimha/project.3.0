import { useLocalStorage } from "usehooks-ts";
import { api } from "@/trpc/react";

const useProject = () => {
  const { data: projects } = api.project.getProjects.useQuery();
  const [projectId, setProjectId] = useLocalStorage("Atuo Github", "");
  const project = projects?.find((project) => project.id === projectId);

  return {
    projects,
    projectId,
    project,
    setProjectId,
  };
};

export default useProject;
