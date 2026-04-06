import AuthChecker from "../_component/auth";
import SignInComponent from "../_component/sign-in";

export default function SignInPage() {
  return (
    <AuthChecker>
      <SignInComponent />
    </AuthChecker>
  );
}
