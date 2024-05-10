import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const StyledCard = styled.div`
  display: flex;
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

const Title = styled.h2`
  font-size: 20px;
  margin: 0;
`;

const TitleSmall = styled.h3`
  margin: 0;
`;

const TipOfTheDay = ({ recipe }) => {
  return (
    <StyledCard className="tip-of-the-day">
      {/* <Title>Tip of the Day</Title> */}
      <TitleSmall>{recipe.title}</TitleSmall>

      <Link
        style={{
          color: "black",
          textUnderlineOffset: "4px",
        }}
        href={`/${recipe.id}`}
      >
        Read More →
      </Link>
    </StyledCard>
  );
};

export default TipOfTheDay;
