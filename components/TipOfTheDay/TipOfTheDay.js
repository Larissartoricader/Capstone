import Herbie from "@/assets/Herbie.png";
import { StyledCard, TitleSmall, CloseButton, StyledLink, StyledHerbie } from "./TipOfTheDay.styles";

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
