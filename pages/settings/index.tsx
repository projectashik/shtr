import AppLayout from "components/layouts/AppLayout";
import Link from "next/link";

const SettingsIndex = () => {
  return (
    <AppLayout>
      <h1 className="text-xl font-semibold tracking-wider">Settings</h1>
      <div className="mt-5 grid grid-cols-7 gap-4">
        <div className="col-span-2 rounded-md  ">
          <div className="bg-white p-4">
            <div className="flex flex-col ">
              <Link href="/settings/profile">
                <a className="flex items-center rounded p-3 hover:bg-gray-100">
                  Profile
                </a>
              </Link>
              <Link href="/settings/accounts">
                <a className="flex items-center rounded p-3 hover:bg-gray-100">
                  Accounts
                </a>
              </Link>
              <Link href="/settings/profile">
                <a className="flex items-center rounded p-3 hover:bg-gray-100">
                  Profile
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-5 ">
          <div className="bg-white p-4">
            Content
            <br />
            Hello, world
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsIndex;
