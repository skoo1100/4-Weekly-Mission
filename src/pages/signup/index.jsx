import SignLayout from '@/layouts/SignLayout/SignLayout';
import Logo from '@/components/signForm/Logo/logo';
import SignForm from '@/components/signForm/signForm/signForm';
import SubmitButton from '@/components/signForm/submitButton/submitButton';
import Social from '@/components/signForm/social/social';
import { useState } from 'react';

const SignupPage = () => {
  const [sign, setSign] = useState({
    email: '',
    password: '',
  });

  return (
    <>
      <SignLayout
        signType="sign-up"
        logo={<Logo signType="signup" />}
        signForm={<SignForm signType="signup" sign={sign} setSign={setSign} />}
        submitButton={<SubmitButton signType="signup" />}
        social={<Social />}
        sign={sign}
      />
    </>
  );
};

export default SignupPage;
