import AuthChecker from "../_component/AuthCheck";
import SignInComponent from "../_component/sign-in";

export default function SignInPage() {
  return (
    <AuthChecker>
      <SignInComponent />
    </AuthChecker>
  );
}
