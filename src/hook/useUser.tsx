import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, User } from "../api/user";

const key = "users"; // this key will be used for the cache also

export const useGetUsers = () => {
  return useQuery({
    queryKey: [key],
    queryFn: getUsers
  });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createUser,
        onSuccess: (user: User) => {
             queryClient.setQueryData([key], (prevUsers: User[] | undefined) => {
              console.log(prevUsers)
              return prevUsers ? [user, ...prevUsers] : [user]
             }
             );
             queryClient.invalidateQueries({
               queryKey: [key],
             });
        }
    }, queryClient)
}
