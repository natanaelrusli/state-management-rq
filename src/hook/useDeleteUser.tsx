import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, User } from "../api/user";

const key = "users";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (id: number) => {
      queryClient.setQueryData(
        [key],
        (oldData: User[]) => {
        console.log(oldData)
        return oldData ? oldData.filter((user) => user.id !== id) : oldData;
      }
      );
    },
  });
};
