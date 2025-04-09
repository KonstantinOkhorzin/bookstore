import { ROUTES } from '../../constants';
import SignInForm from './components/SignInForm';
import { FormWrapper } from '../../components';

const SignIn = () => {
  return (
    <FormWrapper
      title='Sign In'
      actionMessage='Don`t have an account?'
      linkText='Sign up here'
      linkTo={ROUTES.SIGN_UP}
    >
      <SignInForm />
    </FormWrapper>
  );
};

export default SignIn;
