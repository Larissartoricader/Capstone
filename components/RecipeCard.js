export default function RecipeCard({ recipe }) {
  return (
    <>
      <h2>{recipe.title}</h2>
      <p>Symptoms:</p>
      <ul>
        {recipe.symptoms.map((symptom) => (
          <li key={symptom}>{symptom}</li>
        ))}
      </ul>
    </>
  );
}
