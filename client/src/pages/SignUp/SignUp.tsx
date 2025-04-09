import { ROUTES } from '../../constants';
import SignUpForm from './components/SignUpForm';
import { FormWrapper } from '../../components';

const SignUp = () => {
  return (
    <FormWrapper
      title='Create account'
      actionMessage='Already have an account?'
      linkText='Sign in here'
      linkTo={ROUTES.SIGN_IN}
    >
      <SignUpForm />
    </FormWrapper>
  );
};

export default SignUp;
