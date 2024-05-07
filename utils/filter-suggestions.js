function startsWithSubString(mainString, subString) {
  return mainString.substring(0, subString.length) === subString;
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function getSuggestion(
  userInput,
  arrayToGetSuggestionsFrom,
  setterOfDisplayedSuggestion,
  selectionArray
) {
  // turn both the user input and the array to pick a suggestion from to lower case
  const userInputLowerCase = userInput.toLowerCase();
  const arrayLowerCase = arrayToGetSuggestionsFrom.map((item) =>
    item.toLowerCase()
  );
  // find array-item of which the user input is a substring
  // set suggestion to empty string if no match is found
  if (userInputLowerCase.length > 0) {
    const itemMatchingUserInput = arrayLowerCase.find((item) =>
      startsWithSubString(item, userInputLowerCase)
        ? item.includes(userInputLowerCase)
        : setterOfDisplayedSuggestion("")
    );
    // leave function if no match was found
    if (!itemMatchingUserInput) {
      return;
    }
    // turn first letter of found suggestion to capital
    const itemFirstLetterUpperCase = capitalizeFirstLetter(
      itemMatchingUserInput
    );
    // if the suggested item is not already being displayed, call setter of suggestion
    selectionArray.includes(itemFirstLetterUpperCase) ||
      setterOfDisplayedSuggestion(itemFirstLetterUpperCase);
  }
}
