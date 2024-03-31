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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sign.email && sign.password) {
      const data = await UsePostUser(signType, sign);

      if (data === 200) {
        router.push('/folder');
        return;
      }
      if (signType === 'sign-in') {
        alert('잘못된 로그인 입니다.');
        return;
      }
      alert('잘못된 회원가입 입니다.');
      return;
    }
    alert('이메일과 비밀번호를 정확히 입력해주세요.');
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
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
