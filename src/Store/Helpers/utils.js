export function setCurrentBrickPosition(puzzleQuestion) {
  return puzzleQuestion.map((brick, index) => {
    brick.currentPosition = index;
    return brick;
  });
}
