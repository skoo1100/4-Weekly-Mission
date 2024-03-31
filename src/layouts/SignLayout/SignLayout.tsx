import styles from './SignLayout.module.scss';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { usePostUser as UsePostUser } from '@/apis/usePostUser';

type SignState = {
  email: string;
  password: string;
};

type SigninLayoutType = {
  signType: string;
  logo: React.ReactNode;
  signForm: React.ReactNode;
  submitButton: React.ReactNode;
  social: React.ReactNode;
  sign: SignState;
};

const cx = classNames.bind(styles);

const SignLayout = ({ signType, logo, signForm, submitButton, social, sign }: SigninLayoutType) => {
  const router = useRouter();
  console.log(sign);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sign.email && sign.password) {
      const data = await UsePostUser(signType, sign);
      console.log(data);
      if (data === 200) {
        router.push('/folder');
      }
      return;
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      console.log('sex');
      handleSubmit(e);
    }
  };

  return (
    <div className={cx('container')}>
      <div>{logo}</div>
      <form onSubmit={(e) => handleSubmit(e)} onKeyDown={handleEnterKey}>
        <div>{signForm}</div>
        <div>{submitButton}</div>
      </form>
      <div>{social}</div>
    </div>
  );
};

export default SignLayout;
