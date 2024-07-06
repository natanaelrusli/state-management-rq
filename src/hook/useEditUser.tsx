import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser, User } from "../api/user";

const key = "users";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUser,
    onSuccess: (user_updated: User) => {
      queryClient.setQueryData([key], (prevUsers: User[] | undefined) => {
        if (prevUsers) {
          prevUsers?.map((user) => {
            if (user.id === user_updated.id) {
              user.name = user_updated.name;
            }

            return user;
          });
          
          return prevUsers;
        }
      });
    },
  });
};
