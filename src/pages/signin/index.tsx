import SignLayout from '@/layouts/SignLayout/SignLayout';
import Logo from '@/components/signForm/Logo/logo';
import SignForm from '@/components/signForm/signForm/signForm';
import SubmitButton from '@/components/signForm/submitButton/submitButton';
import Social from '@/components/signForm/social/social';
import { useState } from 'react';

const SigninPage = () => {
  const [sign, setSign] = useState({
    email: '',
    password: '',
  });

  return (
    <>
      <SignLayout
        signType="sign-in"
        logo={<Logo signType="signin" />}
        signForm={<SignForm signType="signin" sign={sign} setSign={setSign} />}
        submitButton={<SubmitButton signType="signin" />}
        social={<Social />}
        sign={sign}
      />
    </>
  );
};

export default SigninPage;
