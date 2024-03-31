import { useState, ChangeEvent, useEffect } from 'react';
import { usePostUser as UsePostUser } from '@/apis/usePostUser';
import styles from './Input.module.scss';
import Image from 'next/image';

type SignState = {
  email: string;
  password: string;
};

interface InputProps<T> {
  type: string;
  signType: string;
  labelText: string;
  placeholder: string;
  sign: T;
  setSign: (value: T) => void;
}

const PASSWORD: string = 'password';
const TEXT: string = 'text';
const eyeIcon = '/images/eye-on.svg';
const eyeSlashIcon = 'images/eye-off.svg';
const REGEXP_EMAIL = new RegExp('[a-z0-9]+@[a-z]+.[a-z]'); // 이메일 정규 표현식
const REGEXP_PASSWORD = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/); // 영문, 숫자 1개 이상 포함 및 8자 이상

const Input = ({
  type,
  signType,
  labelText,
  placeholder,
  sign,
  setSign,
}: InputProps<SignState>) => {
  const [inputValue, setInputValue] = useState('');
  const [isView, setIsView] = useState(true);
  const [isError, setIsError] = useState('');
  const [check, setCheck] = useState({
    email: false,
    password: false,
  });

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setIsView((prev) => !prev);
  };

  const handleError = async () => {
    if (labelText === '이메일') {
      if (signType === 'signup') {
        const data = await UsePostUser('check-email', { email: inputValue });
        if (data === 409) {
          setCheck({
            ...check,
            email: true,
          });
          return;
        }
        setCheck({
          ...check,
          email: false,
        });
      }
      !REGEXP_EMAIL.test(inputValue) ? setIsError('이메일을 입력해주세요.') : setIsError('');
      return;
    }

    if (labelText === '비밀번호') {
      !REGEXP_PASSWORD.test(inputValue)
        ? setIsError('비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.')
        : setIsError('');
      return;
    }

    if (labelText === '비밀번호 확인' && sign.password) {
      sign.password !== inputValue ? setIsError('비밀번호가 일치하지 않아요.') : setIsError('');
      return;
    }
  };

  useEffect(() => {
    if (check.email === true) {
      setIsError('이미 사용 중인 이메일입니다.');
      return;
    }

    if (labelText === '이메일') {
      !REGEXP_EMAIL.test(inputValue)
        ? setSign({
            ...sign,
            email: '',
          })
        : setSign({
            ...sign,
            email: inputValue,
          });
    }

    if (labelText === '비밀번호') {
      !REGEXP_PASSWORD.test(inputValue)
        ? setSign({
            ...sign,
            password: '',
          })
        : setSign({
            ...sign,
            password: inputValue,
          });
    }
  }, [check, inputValue]);

  return (
    <>
      <div className={styles.inputBox}>
        <label htmlFor={labelText} className={styles.labels}>
          {labelText}
        </label>
        <div className={styles.inputContent}>
          <input
            id={labelText}
            onChange={(e) => handleInputValue(e)}
            onBlur={handleError}
            className={isError ? styles.inputError : styles.input}
            type={!isView ? TEXT : PASSWORD}
            placeholder={placeholder}
          />
          {type === PASSWORD && (
            <Image
              data-status={labelText}
              className={styles.eyeIcon}
              src={isView ? eyeSlashIcon : eyeIcon}
              width={16}
              height={16}
              alt="눈 모양 아이콘"
              onClick={handleClick}
            />
          )}
          {isError && <div className={styles.errorMessage}>{isError}</div>}
        </div>
      </div>
    </>
  );
};

export default Input;
