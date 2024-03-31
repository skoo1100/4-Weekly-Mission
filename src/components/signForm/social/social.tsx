import styles from './social.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

const cx = classNames.bind(styles);

const Social = () => {
  return (
    <>
      <div className={cx('social')}>
        <p>소셜 로그인</p>
        <div className={cx('link')}>
          <Link className={cx('social-icon-google')} href="https://www.google.com">
            <Image
              className={cx('google')}
              src="/images/google.png"
              alt="구글 로고"
              width={22}
              height={22}
            />
            <Image
              className={cx('google-background')}
              src="/images/google-background.svg"
              alt="구글 배경"
              width={42}
              height={42}
            />
          </Link>
          <Link className={cx('social-icon-kakaotalk')} href="https://www.kakaocorp.com/page">
            <Image
              className={cx('kakaotalk')}
              src="/images/kakaotalk.svg"
              alt="카카오톡 로고"
              width={22}
              height={22}
            />
            <Image
              className={cx('kakaotalk-background')}
              src="/images/kakaotalk-background.svg"
              alt="카카오톡 배경"
              width={42}
              height={42}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Social;
