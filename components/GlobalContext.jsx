import { createContext, useState } from 'react';
import Modal from './Modal';

export const GlobalContext = createContext({
  showSnackBar: false,
});

export const GlobalContextProvider = props => {
  const [modalText, setModalText] = useState();

  const showMessageModal = text => {
    setModalText(text);
  };

  return (
    <GlobalContext.Provider
      value={{
        showMessageModal,
      }}
    >
      {props.children}
      {modalText && <Modal onClose={() => setModalText('')} message={modalText} />}
    </GlobalContext.Provider>
  );
};
