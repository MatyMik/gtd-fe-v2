import { ModalType } from '../types';
import { Backdrop, ModalContainer } from './components';
import { ModalTypes } from './constants';

export const Modal = ({ children, closeHandler, modalType = ModalTypes.NORMAL }
  : ModalType):JSX.Element => (
    <>
      <Backdrop onClick={closeHandler} />
      <ModalContainer modalType={modalType} data-testid="ModalContainer">
        {children}
      </ModalContainer>
    </>
);
