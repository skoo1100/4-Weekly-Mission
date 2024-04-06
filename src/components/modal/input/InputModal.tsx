import styles from './InputModal.module.scss';
import classNames from 'classnames/bind';
import Input from '@/components/input/Input';
import Modal from '@/components/modal/Modal';
import ModalContentBox from '@/components/modal/content/contentBox/ModalContentBox';
import ModalContentButton from '@/components/modal/content/contentButton/ModalContentButton';
import ModalContentTitle from '@/components/modal/content/contentTitle/ModalContentTitle';
import { usePostUser as UsePostUser } from '@/apis/usePostUser';

type InputModalType = {
  isOpen: boolean;
  title: string;
  placeholder: string;
  buttonText: string;
  onCloseClick: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const cx = classNames.bind(styles);

const InputModal: React.FC<InputModalType> = ({
  isOpen,
  title,
  placeholder,
  buttonText,
  onCloseClick,
  onKeyDown,
  value,
  onChange,
}) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const handleClick = async () => {
    if (title === '폴더 추가') {
      //const { response, data } = await UsePostUser('folders', { name: value }, accessToken);
      //console.log(response);
    }
  };

  return (
    <Modal isOpen={isOpen} onBackdropClick={onCloseClick} onKeyDown={onKeyDown}>
      <ModalContentBox
        header={<ModalContentTitle>{title}</ModalContentTitle>}
        content={
          <div className={cx('modal-content')}>
            <Input value={value} onChange={onChange} placeholder={placeholder} />
            <ModalContentButton onClick={handleClick}>{buttonText}</ModalContentButton>
          </div>
        }
        onCloseClick={onCloseClick}
      />
    </Modal>
  );
};

export default InputModal;
