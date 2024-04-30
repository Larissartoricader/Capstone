import { capitalizeFirstLetter } from "./capitalize-first-letter";
export function getSuggestion(
  userInput,
  arrayToGetSuggestionsFrom,
  setterOfDisplayedSuggestion
) {
  const userInputLowerCase = userInput.toLowerCase();
  const arrayLowerCase = arrayToGetSuggestionsFrom.map((item) =>
    item.toLowerCase()
  );
  if (userInputLowerCase.length > 0) {
    const itemMatchingUserInput = arrayLowerCase.find((item) =>
      item.startsWith(userInputLowerCase)
    );
    const itemFirstLetterUpperCase = capitalizeFirstLetter(
      itemMatchingUserInput
    );
    setterOfDisplayedSuggestion(itemFirstLetterUpperCase);
  } else {
    setterOfDisplayedSuggestion("");
  }
}
