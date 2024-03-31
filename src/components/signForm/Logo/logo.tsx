import { ROUTE } from '@/utils/constant';
import styles from './logo.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

type LogoType = {
  signType: string;
};

const cx = classNames.bind(styles);

const Logo = ({ signType }: LogoType) => {
  return (
    <header className={cx('logo')}>
      <Link href={'/'}>
        <Image src="/images/logo.svg" alt="Linkbrary 로고" width={212} height={38} />
      </Link>
      {signType === 'signin' ? (
        <p className={cx('text')}>
          회원이 아니신가요?{' '}
          <span>
            <Link href={ROUTE.회원가입}>회원 가입하기</Link>
          </span>
        </p>
      ) : (
        <p className={cx('text')}>
          이미 회원이신가요?{' '}
          <span>
            <Link href={ROUTE.로그인}>로그인 하기</Link>
          </span>
        </p>
      )}
    </header>
  );
};

export default Logo;
