import React from "react";
import { useGetAllUsersQuery } from "../../redux/Api/authApi";

const Users = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();

  if (isLoading) return <div className="p-8 text-center text-xl font-semibold">Loading users...</div>;
  if (error) return <div className="p-8 text-center text-red-600 font-semibold">Error loading users.</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-[#7b1d1d] mb-8">User Management</h1>

      {/* Summary Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md border-t-8 border-[#7b1d1d] w-64 mb-8">
        <h2 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Users</h2>
        <p className="text-5xl font-black text-gray-800 mt-2">{users?.length || 0}</p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#7b1d1d] text-white uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users && users.map((user) => (
              <tr key={user._id} className="hover:bg-red-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
