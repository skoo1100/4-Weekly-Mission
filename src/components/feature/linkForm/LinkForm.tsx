import { useGetFolders as UseGetFolders } from '@/apis/useGetFolders';
import AddLinkModal from '@/components/modal/addLink/AddLinkModal';
import UiLinkForm from '@/components/linkForm/UiLinkForm';
import { KeyboardEventHandler, useState } from 'react';

type FolderData = {
  id: number;
  name: string;
  link?: { count: number };
};

type LinkFormType = {
  folders: FolderData[];
  disableLinkForm: boolean;
};

const LinkForm = ({ folders, disableLinkForm }: LinkFormType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const { data: folders } = useGetFolders();
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const closeModal = () => {
    setSelectedFolderId(null);
    setIsModalOpen(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <>
      <UiLinkForm onSubmit={() => setIsModalOpen(true)} disableLinkForm={disableLinkForm} />
      <AddLinkModal
        isOpen={isModalOpen}
        folders={folders}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
        onAddClick={() => {}}
        onCloseClick={closeModal}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default LinkForm;
