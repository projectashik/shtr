import Layout from "components/layouts/Layout";
import { withRedirectIfAuthenticated } from "utils";
import { LoginForm } from "components/forms";

const LoginPage = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default withRedirectIfAuthenticated(LoginPage);
