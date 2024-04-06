import { accessGetData } from '@/apis/accessGetData';
import Layout from '@/components/feature/layout/Layout';
import FolderLayout from '@/layouts/FolderLayout/FolderLayout';
import FolderToolBar from '@/components/folderToolBar/FolderToolBar';
import SearchBar from '@/components/searchBar/SearchBar';
import { useState, useEffect, useRef } from 'react';
import { ALL_LINKS_ID } from '@/utils/constant';
import LinkForm from '@/components/feature/linkForm/LinkForm';
import CardList from '@/components/feature/cardList/CardList';
import { useRouter } from 'next/router';

const FolderPage = () => {
  const router = useRouter();
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const [folderData, setFolderData] = useState([]);
  const [linkData, setLinkData] = useState([]);
  //const { data: folders } = useGetFolders();
  const [selectedFolderId, setSelectedFolderId] = useState<string | number>(ALL_LINKS_ID);
  //const { data: links, loading } = useGetLinks(selectedFolderId);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [disableLinkForm, setDisableLinkForm] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          //로그인 안하면 signin 페이지로 ㄱㄱ
          router.push('/signin');
        }

        const { data: userData } = await accessGetData(`users`, accessToken);

        const { data: folder } = await accessGetData(
          `users/${userData[0].id}/folders`,
          accessToken,
        );
        setFolderData(folder);

        const { data: link } = await accessGetData(`users/${userData[0].id}/links`, accessToken);
        const { data: selectLink } = await accessGetData(
          `users/${userData[0].id}/links?folderId=${selectedFolderId}`,
          accessToken,
        );
        setFolderData(folder);
        setLinkData(selectLink === undefined ? link : selectLink);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const observerFooter = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setDisableLinkForm(entry.isIntersecting);
      });
    });

    if (footerRef.current) {
      observerFooter.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observerFooter.unobserve(footerRef.current);
      }
    };
  }, [selectedFolderId]);

  return (
    <Layout footerRef={footerRef} isSticky={false}>
      <FolderLayout
        linkForm={<LinkForm folders={folderData} disableLinkForm={disableLinkForm} />}
        searchBar={<SearchBar setSearchValue={setSearchValue} />}
        searchValueText={searchValue}
        folderToolBar={
          <FolderToolBar
            folders={folderData}
            selectedFolderId={selectedFolderId}
            onFolderClick={setSelectedFolderId}
          />
        }
        cardList={
          loading ? null : (
            <CardList folders={folderData} links={linkData} searchValue={searchValue} />
          )
        }
      />
    </Layout>
  );
};

export default FolderPage;
