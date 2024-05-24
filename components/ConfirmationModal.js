import React from "react";
import styled from "styled-components";
import Herbie from "@/assets/Herbie.png";
import Image from "next/image";

const Dialog = styled.dialog`
  padding: 1.7rem 0;
  margin: auto;
  border: solid 1px var(--secondary-background-color);
  border-radius: var(--big-box-border-radius);
  background-color: var(--primary-button-and-header-color);
  &::backdrop {
    background-color: var(--primary-button-and-header-color);
    opacity: 40%;
  }
`;

const DialogMessage = styled.p`
  margin: 0 4rem 1.4rem 4rem;
  color: white;
  font: var(--font-color);
  font-weight: bold;
  text-align: center;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 30px;
  font: var(--general-font);
  color: var(--font-color);
  border: 2px solid var(--secondary-background-color);
  border-radius: var(--small-box-border-radius);
  background-color: var(--box-background-color);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: none;
  text-transform: uppercase;
  &:hover {
    background-color: #fff4eb;
  }
  &.primary {
    background-color: var(--primary-background-color);
    color: var(--font-color);
    font: var(--general-font);
  }
  &.primary:hover {
    background-color: var(--primary-background-color);
  }
`;

const StyledHerbie = styled(Image)`
  position: absolute;
  top: 50px;
  right: 5px;
  z-index: -1;
`;

export const ConfirmationModal = ({ modalInfo, modalRef }) => {
  const { message, textButtonClose, textButtonConfirm, onClose, onConfirm } =
    modalInfo;

  return (
    <Dialog ref={modalRef} aria-labelledby="confirmation-modal" role="dialog">
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
