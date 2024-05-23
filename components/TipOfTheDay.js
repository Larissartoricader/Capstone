import styled from "styled-components";

import Link from "next/link";

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
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
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  font-size: 14px;
  padding: 10px;
`;

const TitleBig = styled.h2``;

const TipOfTheDay = ({ recipe, onClose }) => {
  return (
    <StyledCard>
      <TitleBig>Herbies Random Tip</TitleBig>
      <CloseButton onClick={onClose}>X</CloseButton>
      <TitleSmall>
        {recipe.title}
        <StyledLink
          style={{
            color: "black",
            textUnderlineOffset: "4px",
          }}
          href={`/${recipe._id}`}
        >
          Read More →
        </StyledLink>
      </TitleSmall>
    </StyledCard>
  );
};

export default TipOfTheDay;
