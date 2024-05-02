function startsWithSubString(mainString, subString) {
  return mainString.substring(0, subString.length) === subString;
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
    if (!itemMatchingUserInput) {
      return;
    }
    const itemFirstLetterUpperCase = capitalizeFirstLetter(
      itemMatchingUserInput
    );
    setterOfDisplayedSuggestion(itemFirstLetterUpperCase);
  }
}
