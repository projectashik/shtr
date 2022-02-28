import axios from "axios";
import InvokeApiForm from "components/forms/InvokeApiForm";
import SettingsLayout from "components/layouts/SettingsLayout";
import { Button, Modal } from "components/ui";
import { fetcher } from "lib/fetchers";
import { toast } from "lib/toast";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import useSWR from "swr";
import { ApiWithUser } from "types";
import WithPageAuthRequired from "utils/WithPageAuthRequired";

const ApiPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: apis, mutate } = useSWR("/api/api", fetcher);
  console.log(apis);
  const [isConfrimDeleteApiOpen, setIsConfrimDeleteApiOpen] = useState(false);
  const [currentSelectedApi, setCurrentSelectedApi] = useState<number | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onDelete = async (id: number) => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/api/${id}/delete`);
      toast({
        message: (
          <FormattedMessage
            id="label.apiDeleted"
            defaultMessage="Api Deleted"
          />
        ),
      });
      setIsConfrimDeleteApiOpen(false);
      mutate();
    } catch (e: any) {
      console.log(e.response.data);
      toast({
        message: (
          <FormattedMessage
            id="error.somethingWrong"
            defaultMessage="Something went wrong"
          />
        ),
      });
    }
    setDeleteLoading(false);
  };
  return (
    <SettingsLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wider">
          <FormattedMessage id="label.apis" defaultMessage="Apis" />
        </h1>
        <Button onClick={() => setIsOpen(true)} leftIcon={<FiPlus />}>
          <FormattedMessage
            id="label.invokeNewAPI"
            defaultMessage="Invoke New API"
          />
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
                      <FormattedMessage id="label.name" defaultMessage="Name" />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      <FormattedMessage
                        id="label.actions"
                        defaultMessage="Actions"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody className="dark:bg-dark101 dark:divide-dark102 divide-y divide-gray-200 bg-white">
                  {apis &&
                    apis.length > 0 &&
                    apis.map((api: ApiWithUser, index: number) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4">
                          {api.name}
                        </td>
                        <td className="flex gap-2 whitespace-nowrap px-6 py-4">
                          <Button
                            look="danger"
                            onClick={() => {
                              setCurrentSelectedApi(api.api_id);
                              setIsConfrimDeleteApiOpen(true);
                            }}
                          >
                            <FormattedMessage
                              id="label.delete"
                              defaultMessage="Delete"
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <InvokeApiForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <Modal
        isOpen={isConfrimDeleteApiOpen}
        setIsOpen={setIsConfrimDeleteApiOpen}
        title={
          <FormattedMessage
            id="model.title.deleteAPI"
            defaultMessage="Delete api key"
          />
        }
        confirmLook="danger"
        description={
          <FormattedMessage
            id="model.description.deleteAPI"
            defaultMessage={"Are you sure you want to delete this api?"}
          />
        }
        loading={deleteLoading}
        onConfirm={() => {
          onDelete(currentSelectedApi as number);
        }}
      ></Modal>
    </SettingsLayout>
  );
};

export default WithPageAuthRequired(ApiPage);
