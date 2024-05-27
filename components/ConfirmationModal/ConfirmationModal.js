import React from "react";
import Herbie from "@/assets/Herbie.png";
import { Dialog, DialogMessage, ButtonWrap, Button, StyledHerbie } from "./ConfirmationModal.styles";

export const ConfirmationModal = ({ modalInfo, modalRef }) => {
  const { message, textButtonClose, textButtonConfirm, onClose, onConfirm } =
    modalInfo;

  return (
    <Dialog ref={modalRef}>
      <StyledHerbie src={Herbie} alt={"Herbie"} width={75} height={100} />
      <DialogMessage>{message}</DialogMessage>
      <ButtonWrap>
        <Button type="button" onClick={onClose}>
          {textButtonClose}
        </Button>
        <Button type="button" onClick={onConfirm}>
          {textButtonConfirm}
        </Button>
      </ButtonWrap>
    </Dialog>
  );
};
