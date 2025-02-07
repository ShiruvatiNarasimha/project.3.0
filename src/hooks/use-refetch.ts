import { useQueryClient } from "@tanstack/react-query";

const useRefetch = () => {
  const querryClient = useQueryClient();
  return async () => [
    await querryClient.refetchQueries({
      type: "active",
    }),
  ];
};

export default useRefetch;
