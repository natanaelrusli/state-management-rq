import { useParams } from "react-router-dom";
import { User } from "../api/user";
import { useDeleteUser } from "../hook/useDeleteUser";
import { useEditUser } from "../hook/useEditUser";
import { useGetUsersObserver } from "../hook/useGetUsers";

const DeleteUser = ({ id }: Pick<User, "id">) => {
  const delete_user = useDeleteUser();

  const onDelete = async () => {
    await delete_user.mutateAsync(id as number);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {delete_user.isPending && <span>Deletng user...</span>}

      <button onClick={onDelete}>Delete User</button>

      {delete_user.isSuccess && <span>User deleted successfully</span>}
      {delete_user.isError && <span>There was an error deleting user</span>}
    </div>
  );
};

const ViewUser = ({ id }: Pick<User, "id">) => {
  const get_users = useGetUsersObserver();

  const user_selected = get_users.data?.find((user) => user.id === Number(id));

  if (!user_selected) return null;

  return (
    <>
      <h1>Edit user: {id}</h1>
      <span>
        User name: <b>{user_selected.name}</b>
      </span>
    </>
  );
};

const EditUserForm = ({ id }: Pick<User, "id">) => {
  const edit_user = useEditUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    await edit_user.mutateAsync({
      name: data.user as string,
      id,
    });

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" placeholder="Update this user" />
        {edit_user.isPending && <span>Updating user...</span>}

        <button style={{
          marginLeft: '10px'
        }}>Update User</button>

        {edit_user.isSuccess && <span>User updated successfully ✅</span>}
        {edit_user.isError && <span>Ups! it was an error 🚨</span>}
      </form>
    </>
  );
};

export const EditUser = () => {
  const params = useParams();

  const { id } = params;

  if (!id) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <ViewUser id={Number(id)} />
      <EditUserForm id={Number(id)} />
      <DeleteUser id={Number(id)} />
    </div>
  );
};
