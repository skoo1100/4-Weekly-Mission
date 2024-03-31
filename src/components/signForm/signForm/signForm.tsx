import styles from './signForm.module.scss';
import classNames from 'classnames/bind';
import Input from '../Input/Input';

type SignState = {
  email: string;
  password: string;
};

type SignFormType<T> = {
  signType: string;
  sign: T;
  setSign: (value: T) => void;
};

const cx = classNames.bind(styles);

const SignForm = ({ signType, sign, setSign }: SignFormType<SignState>) => {
  return (
    <div className={cx('inputForm')}>
      <Input
        type="text"
        signType={signType}
        labelText="이메일"
        placeholder="내용 입력"
        sign={sign}
        setSign={setSign}
      />
      <Input
        type="password"
        signType={signType}
        labelText="비밀번호"
        placeholder="비밀번호를 입력하세요"
        sign={sign}
        setSign={setSign}
      />
      {signType === 'signup' && (
        <Input
          type="password"
          signType={signType}
          labelText="비밀번호 확인"
          placeholder="비밀번호를 입력하세요"
          sign={sign}
          setSign={setSign}
        />
      )}
    </div>
  );
};

export default SignForm;
