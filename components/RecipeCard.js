import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { BookmarkIcon } from "./BookmarkIcon";
import { useRouter } from "next/router";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledArticle = styled.article`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-left: 1vw;
  box-sizing: border-box;
  position: relative;
`;

const StyledListHeader = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`;

const StyledListItems = styled.li`
  margin-bottom: 0.5em;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const StyledImageWrapper = styled.div``;

const StyledLink = styled.link`
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  background-color: #eee;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

const StyledBookmarkIcon = styled.div`
  position: absolute;
  top: -12px;
  right: 0;
`;
const StyledLinkWrapper = styled.div`
  text-align: right;
  width: 100%;
`;

export default function RecipeCard({
	bookmarkedRecipesIDs,
	onHandleBookmarkedIcon,
	recipe,
}) {
	return (
		<StyledArticle>
			<StyledImageWrapper>
				<Image
					src={recipe.image}
					style={{ width: "100%" }}
					height={200}
					width={200}
					objectFit="contain"
					alt={recipe.title}
				/>
			</StyledImageWrapper>
			<StyledBookmarkIcon>
				<BookmarkIcon
					onHandleBookmarkedIcon={onHandleBookmarkedIcon}
					bookmarkedRecipesIDs={bookmarkedRecipesIDs}
					recipe={recipe}
				/>
			</StyledBookmarkIcon>
			<StyledCardWrapper>
				<h2>{recipe.title}</h2>
				<StyledListHeader>Symptoms:</StyledListHeader>
				<StyledList>
					{recipe.symptoms.map((symptom) => (
						<StyledListItems key={symptom}>{symptom}</StyledListItems>
					))}
				</StyledList>
				<StyledLinkWrapper>
					<Link
						style={{
							color: "black",
							textUnderlineOffset: "4px",
						}}
						href={`/${recipe._id}`}
					>
						Read More →
					</Link>
				</StyledLinkWrapper>
			</StyledCardWrapper>
		</StyledArticle>
	);
}
