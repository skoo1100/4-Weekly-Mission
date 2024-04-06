import { useGetFolder } from '@/apis/useGetFolder';
import Layout from '@/components/feature/layout/Layout';
import SharedLayout from '@/layouts/SharedLayout/SharedLayout';
import CardList from '@/components/card/list/UiCardList';
import FolderInfo from '@/components/feature/folder/folderInfo/FolderInfo';
import ReadOnlyCard from '@/components/card/readOnly/ReadOnlyCard';
import SearchBar from '@/components/searchBar/SearchBar';
import { useState, useEffect } from 'react';
import { accessGetData } from '@/apis/accessGetData';
import { useRouter } from 'next/router';

const SharedPage = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const [links, setLinks] = useState([]);
  const [folderInfo, setFolderInfo] = useState({
    profileImage: '',
    ownerName: '',
    folderName: '',
  });
  //검색 시 입력 값
  const [searchValue, setSearchValue] = useState('');
  const [filterLinks, setFilterLinks] = useState(links);

  useEffect(() => {
    if (folderId) {
      const fetchData = async () => {
        const { data: userData } = await accessGetData(`users`, accessToken);
        const { data: folderData } = await accessGetData(
          `users/${userData[0].id}/folders/${folderId}`,
          accessToken,
        );
        const { data: userFolderData } = await accessGetData(
          `users/${userData[0].id}`,
          accessToken,
        );
        const { data: selectLink } = await accessGetData(
          `users/${userData[0].id}/links?folderId=${folderId}`,
          accessToken,
        );
        setLinks(selectLink);
        setFolderInfo((prev) => ({
          ...prev,
          profileImage: userFolderData[0].image_source,
          ownerName: userFolderData[0].name,
          folderName: folderData[0].name,
        }));
      };

      fetchData();
    }
  }, [folderId]);

  useEffect(() => {
    if (searchValue !== '') {
      const filtered = links.filter(
        (link: any) =>
          link?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          link?.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          link?.url.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilterLinks(filtered);
    }
  }, [searchValue]);

  return (
    <Layout isSticky={true} footerRef={null}>
      <SharedLayout
        folderInfo={
          <FolderInfo
            profileImage={folderInfo.profileImage}
            ownerName={folderInfo.ownerName}
            folderName={folderInfo.folderName}
          />
        }
        searchBar={<SearchBar setSearchValue={setSearchValue} />}
        searchValueText={searchValue}
        cardList={
          <CardList>
            {searchValue !== ''
              ? filterLinks?.map((link: any) => <ReadOnlyCard key={link?.id} {...link} />)
              : links?.map((link: any) => <ReadOnlyCard key={link?.id} {...link} />)}
          </CardList>
        }
      />
    </Layout>
  );
};

export default SharedPage;
