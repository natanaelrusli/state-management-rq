import { useCreateUser } from "../hook/useUser";

export const CreateUser = () => {
  const create_user = useCreateUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    console.info(data);

    await create_user.mutateAsync({
      name: data.user as string,
    });

    form.reset();
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit} className="mt" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <input type="text" name="user" placeholder="Add new user" />

        <button disabled={create_user.isPending}>
          {create_user.isPending ? "Adding User..." : "Add User"}
        </button>
      </form>
    </div>
  );
};
