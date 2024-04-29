import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 10px;
`;

export default function RecipeForm() {
  return (
    <>
      <h2>Add or Edit your Recipe</h2>
      <StyledForm>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          placeholder="What's the recipe's name?"
          min="4"
          id="title"
          name="title"
          required
        ></input>
        <label htmlFor="ingredients">Ingedients*</label>
        <input
          type="text"
          placeholder="Separate the ingredients by comma"
          min="4"
          id="ingredients"
          name="ingredients"
        ></input>
        <label htmlFor="preparation">Preparation</label>
        <input
          type="text"
          placeholder="e.g Add thyme to the water"
          min="4"
          required
          id="preparation"
          name="preparation"
        ></input>
        <label htmlFor="symptom">Symptom</label>
        <input
          type="text"
          placeholder="min 2 Symptom"
          required
          id="symptom"
          name="symptom"
        ></input>
      </StyledForm>
    </>
  );
}
