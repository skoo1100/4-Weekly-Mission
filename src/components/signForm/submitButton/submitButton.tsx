import styles from './submitButton.module.scss';
import classNames from 'classnames/bind';

type SubmitButtonType = {
  signType: string;
};

const cx = classNames.bind(styles);

const SubmitButton = ({ signType }: SubmitButtonType) => {
  return (
    <>
      {signType === 'signin' ? (
        <button className={cx('signButton')}>로그인</button>
      ) : (
        <button className={cx('signButton')}>회원가입</button>
      )}
    </>
  );
};

export default SubmitButton;
