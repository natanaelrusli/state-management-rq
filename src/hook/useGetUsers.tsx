import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useGetUsers } from "./useUser";
import { useEffect, useState } from "react";
import { User } from "../api/user";

const key = 'users'

export const useGetUsersObserver = () => {
  const get_users = useGetUsers();
  const queryClient = useQueryClient()

  const [users, setUsers] = useState<User[]>(() => {
    const data = queryClient.getQueryData<User[]>([key])

    return data ?? []
  })

  useEffect(() => {
    const observer = new QueryObserver<User[]>(queryClient, {
      queryKey: [key],
    });

    const unsubscribe = observer.subscribe((result) => {
      if (result.data) setUsers(result.data);
    });

    return () => {
        unsubscribe()
    }
  }, [queryClient]);

  return {
    ...get_users,
    data: users,
  };
};
