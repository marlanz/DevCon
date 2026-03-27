import AuthChecker from "../_component/AuthCheck";
import SignUpComponent from "../_component/register";

export default function SignUpPage() {
  return (
    <AuthChecker>
      <SignUpComponent />
    </AuthChecker>
  );
}
