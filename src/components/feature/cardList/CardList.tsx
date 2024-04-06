import { useGetFolders as UseGetFolders } from '@/apis/useGetFolders';
import AddLinkModal from '@/components/modal/addLink/AddLinkModal';
import EditableCard from '@/components/editableCard/EditableCard';
import NoLink from '@/components/noLink/NoLink';
import { useCallback, useRef, useState, useEffect } from 'react';
import UiCardList from '@/components/card/list/UiCardList';
import AlertModal from '@/components/modal/alert/AlertModal';
import { MODALS_ID } from '@/utils/constant';
import { KeyboardEventHandler } from 'react';

type LinkData = {
  title: string;
  id: number;
  url: string;
  imageSource: string;
  alt: string;
  elapsedTime: string;
  description: string;
  createdAt: string;
  length: number;
};

type FolderData = {
  id: number;
  name: string;
  link?: { count: number };
};

type CardListType = {
  folders: FolderData[];
  links: LinkData[];
  searchValue: string;
};

const CardList = ({ folders, links, searchValue }: CardListType) => {
  //const { data: folders } = useGetFolders();
  const cardListRef = useRef(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [selectedLinkUrl, setSelectedLinkUrl] = useState<string | undefined>(undefined);
  const [filterLinks, setFilterLinks] = useState<LinkData[]>(links);

  const closeModal = () => setCurrentModal(null);
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const getPopoverPosition = useCallback(
    (cardIndex: number) => {
      const count =
        cardListRef?.current !== null
          ? window
              .getComputedStyle(cardListRef?.current)
              .getPropertyValue('grid-template-columns')
              .split(' ').length
          : 1;
      if ((cardIndex + 1) % count === 0) {
        return { right: 0 };
      }
      return { left: 0 };
    },
    [cardListRef],
  );

  useEffect(() => {
    if (searchValue !== '') {
      const filtered = links.filter(
        (link) =>
          link.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          link.description?.toLowerCase().includes(searchValue.toLowerCase()) ||
          link.url?.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilterLinks(filtered);
    } else {
      setFilterLinks(links);
    }
  }, [searchValue, links]);

  if (filterLinks.length === 0) return <NoLink />;
  return (
    <UiCardList ref={cardListRef}>
      {filterLinks.map((link: LinkData, index: number) => (
        <EditableCard
          key={link?.id}
          {...link}
          popoverPosition={getPopoverPosition(index)}
          onDeleteClick={() => {
            setSelectedLinkUrl(link?.url);
            setCurrentModal(MODALS_ID.deleteLink);
          }}
          onAddToFolderClick={() => setCurrentModal(MODALS_ID.addToFolder)}
        />
      ))}
      <AlertModal
        isOpen={currentModal === MODALS_ID.deleteLink}
        title="링크 삭제"
        description={selectedLinkUrl}
        buttonText="삭제하기"
        onCloseClick={closeModal}
        onKeyDown={handleKeyDown}
      />
      <AddLinkModal
        isOpen={currentModal === MODALS_ID.addToFolder}
        folders={folders}
        selectedLinkUrl={selectedLinkUrl}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
        onAddClick={() => {}}
        onCloseClick={() => {
          setSelectedFolderId(null);
          closeModal();
        }}
        onKeyDown={handleKeyDown}
      />
    </UiCardList>
  );
};

export default CardList;
