import type {UserWithNoPassword} from 'hybrid-types/DBTypes';

const UserList = ({users}: {users: UserWithNoPassword[]}) => {
  return (
    <>
      <h2 className="mt-4 text-center text-2xl font-semibold text-white">
        User list
      </h2>

      <section className="bg-card text-card-foreground mx-auto mt-4 flex w-full max-w-md flex-col gap-4 rounded-md p-6 shadow">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default UserList;
