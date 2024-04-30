import { capitalizeFirstLetter } from "./capitalize-first-letter";

function startsWithSubString(mainString, subString) {
  return mainString.substring(0, subString.length) === subString;
}

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
      startsWithSubString(item, userInputLowerCase)
        ? item.includes(userInputLowerCase)
        : setterOfDisplayedSuggestion("")
    );
    const itemFirstLetterUpperCase = capitalizeFirstLetter(
      itemMatchingUserInput
    );
    setterOfDisplayedSuggestion(itemFirstLetterUpperCase);
  } else {
    setterOfDisplayedSuggestion("");
  }
}
