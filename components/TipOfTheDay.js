import styled from "styled-components";

import Link from "next/link";

const StyledCard = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 200px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const TitleSmall = styled.h3`
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
`;
const TipOfTheDay = ({ recipe, onClose }) => {
  return (
    <StyledCard>
      <CloseButton onClick={onClose}>X</CloseButton>
      <TitleSmall>{recipe.title}</TitleSmall>
      <Link
        style={{
          color: "black",
          textUnderlineOffset: "4px",
        }}
        href={`/${recipe._id}`}
      >
        Read More →
      </Link>
    </StyledCard>
  );
};

export default TipOfTheDay;
