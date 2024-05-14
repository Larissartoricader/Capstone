import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const StyledToast = styled.div`
  background-color: #5cb85c;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
`;

const ListItem = styled.ul`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 5px;
  padding: 25px;
`;

const CollapsibleButton = styled.button`
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  margin: 5px;
  width: 80%;
  border-radius: 5px;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
`;

const CollapsibleContent = styled.div`
  padding: 0 18px;
  margin: 5px;
  width: 80%;
  overflow: hidden;
  background-color: #f1f1f1;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  transition: max-height 0.3s ease-out;
`;

export default function RecipeDetails({ currentRecipe }) {
	const router = useRouter();
	const { title, ingredients, preparation, usage, symptoms } = currentRecipe;

	const [isPreparationOpen, setIsPreparationOpen] = useState(false);
	const [isUsageOpen, setIsUsageOpen] = useState(false);

	const togglePreparationCollapse = () => {
		setIsPreparationOpen(!isPreparationOpen);
	};

	const toggleUsageCollapse = () => {
		setIsUsageOpen(!isUsageOpen);
	};

	function handleClick() {
		router.push(`/edit/${currentRecipe._id}`);
	}

	const [showToast, setShowToast] = useState(false);

	// Funktion zum Anzeigen der Toast-Nachricht
	const showToastMessage = () => {
		toast.success("Recipe deleted successfully!", {});
	};

	async function handleDelete() {
		const response = await fetch(`/api/recipes/${currentRecipe._id}`, {
			method: "DELETE",
		});
		// TODO kann man den push verzögern damit erst wenn object auch auf home page sichtbar/nicht mehr sichtbar ist
		if (response.ok) {
			router.push("/");
			showToastMessage();
		}
	}

	return (
		<article aria-label="Recipe Details">
			<h2>{title}</h2>
			<h3>Ingredients</h3>
			<ListItem>
				{ingredients.map((ingredient, index) => (
					<li key={index}>{ingredient}</li>
				))}
			</ListItem>
			<CollapsibleButton onClick={togglePreparationCollapse}>
				Open the Preperation
			</CollapsibleButton>
			<CollapsibleContent isOpen={isPreparationOpen}>
				<p>{preparation}</p>
			</CollapsibleContent>
			<CollapsibleButton onClick={toggleUsageCollapse}>
				Open the Usage
			</CollapsibleButton>
			<CollapsibleContent isOpen={isUsageOpen}>
				<p>{usage}</p>
			</CollapsibleContent>
			<h3> Symptoms</h3>
			<ListItem>
				{symptoms.map((symptoms, index) => (
					<li key={index}>{symptoms}</li>
				))}
			</ListItem>
			{currentRecipe.editable && (
				<button type="button" onClick={handleClick}>
					Edit
				</button>
			)}
			{currentRecipe.editable && (
				<button
					type="button"
					onClick={() => {
						handleDelete();
						showToastMessage();
					}}
				>
					Delete
				</button>
			)}
			{showToastMessage}
			{showToast && <StyledToast>Recipe deleted successfully!</StyledToast>}
		</article>
	);
}
