import UpdatePasswordForm from "components/forms/UpdatePasswordForm";
import UpdateUsernameForm from "components/forms/UpdateUsernameForm";
import SettingsLayout from "components/layouts/SettingsLayout";
import { useUser } from "hooks";
import { FormattedMessage } from "react-intl";

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <SettingsLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wider">
          <FormattedMessage id="label.profile" defaultMessage="Profile" />
        </h1>
      </div>

      <div>
        <UpdateUsernameForm />
        <UpdatePasswordForm />
      </div>
    </SettingsLayout>
  );
};

export default ProfilePage;
