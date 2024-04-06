import styles from './Layout.module.scss';
import classNames from 'classnames/bind';
import { accessGetData } from '@/apis/accessGetData';
import Footer from '@/components/footer/Footer';
import NavigationBar from '@/components/navigationBar/NavigationBar';
import { LegacyRef, useState, useEffect } from 'react';

type LayoutType = {
  children: React.ReactNode;
  footerRef: LegacyRef<HTMLElement> | null;
  isSticky: boolean;
};

interface Data {
  email?: string;
  //image_source: string;
  profileImageSource?: string;
}

const cx = classNames.bind(styles);

const Layout = ({ children, footerRef, isSticky = true }: LayoutType) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  //const data = await accessGetData('users', accessToken);
  const [profile, setProfile] = useState<Data>({
    email: '',
    profileImageSource: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await accessGetData(`users`, accessToken);
      if (data) {
        setProfile({
          email: data[0].email || '',
          profileImageSource: data[0].image_source || '',
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavigationBar profile={profile} isSticky={isSticky} />
      <main className={cx('main')}>{children}</main>
      <Footer footerRef={footerRef} />
    </div>
  );
};

export default Layout;
