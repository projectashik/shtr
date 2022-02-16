import { user } from "@prisma/client";
import axios from "axios";
import AddUserForm from "components/forms/AddUserForm";
import SettingsLayout from "components/layouts/SettingsLayout";
import { Button, Modal } from "components/ui";
import { fetcher } from "lib/fetchers";
import { toast } from "lib/toast";
import { useState } from "react";
import { FiCheckCircle, FiUserPlus, FiXCircle } from "react-icons/fi";
import useSWR from "swr";

const AccountsPage = () => {
  const { data: users, mutate } = useSWR("/api/users", fetcher);
  const [currentSelectedUser, setCurrentSelectedUser] = useState<number | null>(
    null
  );
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isConfrimDeleteUserOpen, setIsConfrimDeleteUserOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onDelete = async (user_id: any) => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/user/${user_id}/delete`);
      toast({ message: "Deleted user" });
      setIsConfrimDeleteUserOpen(false);
      mutate();
    } catch (e: any) {
      console.log(e.response.data);
      toast({ message: e.response.data });
    }
    setDeleteLoading(false);
  };

  return (
    <SettingsLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wider">Accounts</h1>
        <Button
          onClick={() => setIsAddUserModalOpen(true)}
          leftIcon={<FiUserPlus className="mr-2" />}
        >
          Add Account
        </Button>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="dark:border-dark102 overflow-hidden rounded border-b border-gray-200 shadow">
              <table className="dark:divide-dark102 min-w-full divide-y divide-gray-200">
                <thead className="dark:bg-dark101  bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Admin
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="dark:bg-dark101 dark:divide-dark102 divide-y divide-gray-200 bg-white">
                  {users &&
                    users.length > 0 &&
                    users.map((user: user, index: number) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.username}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.is_admin ? (
                            <span className="text-green-500">
                              <FiCheckCircle />
                            </span>
                          ) : (
                            <span className="text-red-500">
                              <FiXCircle />
                            </span>
                          )}
                        </td>
                        <td className="flex gap-2 whitespace-nowrap px-6 py-4">
                          <Button look="alternate">Edit</Button>
                          <Button
                            look="danger"
                            onClick={() => {
                              setCurrentSelectedUser(user.user_id);
                              setIsConfrimDeleteUserOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <AddUserForm
                isOpen={isAddUserModalOpen}
                setIsOpen={setIsAddUserModalOpen}
              />
              <Modal
                isOpen={isConfrimDeleteUserOpen}
                setIsOpen={setIsConfrimDeleteUserOpen}
                title="Delete user"
                confirmLook="danger"
                description="Are you sure you want to delete this user?"
                loading={deleteLoading}
                onConfirm={() => {
                  onDelete(currentSelectedUser);
                }}
              ></Modal>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default AccountsPage;
