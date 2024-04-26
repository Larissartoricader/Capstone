import Image from "next/image";
export default function RecipeCard({ recipe }) {
  return (
    <>
      <h2>{recipe.title}</h2>
      <Image
        src="https://images.unsplash.com/photo-1564278453360-c65eda0a200e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={130}
        height={100}
        alt="bottle of rum e.g. remedy"
      ></Image>
      <p>Symptoms:</p>
      <ul>
        {recipe.symptoms.map((symptom) => (
          <li key={symptom}>{symptom}</li>
        ))}
      </ul>
    </>
  );
}
