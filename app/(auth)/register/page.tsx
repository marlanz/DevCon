import AuthChecker from "../_component/auth";
import SignUpComponent from "../_component/register";

export default function SignUpPage() {
  return (
    <AuthChecker>
      <SignUpComponent />
    </AuthChecker>
  );
}
