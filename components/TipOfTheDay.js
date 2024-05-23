import styled from "styled-components";
import Image from "next/image";
import Herbie from "@/assets/Herbie.png";
import Link from "next/link";

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcfbf4;
  flex-direction: column;
  gap: 10px;
  padding: 15px 25px 25px 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  border-color: black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 250px;
  height: 150px;
  position: absolute;
  bottom: 100%;
  left: 40%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const TitleSmall = styled.h3`
  margin: 0;
  background-color: #f1efe2;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  font-size: 14px;
  padding: 10px;
  color: var(--primary-button-and-header-color);
`;

const StyledHerbie = styled(Image)`
  position: absolute;
  top: -100px;
  right: 20px;
  z-index: -1;
`;

const TipOfTheDay = ({ recipe, onClose }) => {
  return (
    <StyledCard>
      <StyledHerbie src={Herbie} alt={"Herbie"} width={75} height={100} />
      <CloseButton onClick={onClose}>X</CloseButton>
      <h2>Herbies Random Tip</h2>
      <TitleSmall>
        {recipe.title}
        <StyledLink href={`/${recipe._id}`}>Read More →</StyledLink>
      </TitleSmall>
    </StyledCard>
  );
};

export default TipOfTheDay;
