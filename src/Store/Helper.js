export function setUserPuzzle(state, payload) {
  return {
    ...state,
    puzzleId: payload.id,
    puzzleImage: payload.title,
    puzzleSource: payload.sourceImage,
    puzzleQuestion: setCurrentBrickPosition(
      shuffleBricks(setPayloadQuestion(payload))
    ),
  };
}

function setPayloadQuestion(payload) {
  return payload.imageFragments.map((image, index) => {
    let attrib = {
      visible: true,
      correct: false,
      selected: false,
      currentPosition: index,
    };
    if (image.actualPosition === payload.hideItem) {
      attrib.visible = false;
    }
    return {...image, ...attrib};
  });
}

function shuffleBricks(puzzleQuestion) {
  let current = puzzleQuestion.length;
  while (current > 0) {
    let toIndex = Math.floor(Math.random() * current);
    let temp = {};
    current -= 1;
    temp = puzzleQuestion[toIndex];
    puzzleQuestion[toIndex] = puzzleQuestion[current];
    puzzleQuestion[current] = temp;
  }
  return puzzleQuestion;
}

function setCurrentBrickPosition(puzzleQuestion) {
  return puzzleQuestion.map((brick, index) => {
    brick.currentPosition = index;
    return brick;
  });
}

export function selectBrick(state, payload) {
  return {
    ...state,
    puzzleQuestion: setBrickSelected(state.puzzleQuestion, payload),
  };
}

function setBrickSelected(puzzleQuestion, payload) {
  return puzzleQuestion.map((image) => {
    const update = {...image};
    if (update.id === payload.id) {
      update.selected = true;
    } else {
      update.selected = false;
    }
    return update;
  });
}

const COL_MAX_LIMIT = 4;
const COL_MIN_LIMIT = -1;
export function updateBrickPosition(state, payload) {
  return {
    ...state,
    puzzleQuestion: setCurrentBrickPosition(
      moveBrick(state.puzzleQuestion, payload)
    ),
  };
}

function moveBrick(puzzleQuestion, payload) {
  let puzzleGrid = makePuzzleGrid(puzzleQuestion);
  const sourcePosition = getCurrentGridPosition(puzzleGrid, payload.id);
  const targetPosition = calculateNextPosition(
    sourcePosition,
    payload.direction
  );
  if (isTargetPositionFeasible(puzzleGrid, targetPosition)) {
    puzzleGrid = changeBrickPosition(
      puzzleGrid,
      sourcePosition,
      targetPosition
    );
  }
  return puzzleGrid.flat();
}

function makePuzzleGrid(puzzleQuestion) {
  return puzzleQuestion.reduce((grid, brick) => {
    if (grid.length > 0) {
      let rowNumber = grid.length - 1;
      if (grid[rowNumber]) {
        if (grid[rowNumber].length < COL_MAX_LIMIT) {
          grid[rowNumber] = [...grid[rowNumber], brick];
        } else {
          rowNumber += 1;
          grid[rowNumber] = [brick];
        }
      } else {
        grid[rowNumber] = [brick];
      }
    } else {
      grid = [[brick]];
    }
    return grid;
  }, []);
}

function getCurrentGridPosition(puzzleGrid, id) {
  return puzzleGrid.reduce(
    (position, gridRow, rowNumber) => {
      let gridColumn = gridRow.findIndex((col) => col.id === id);
      if (gridColumn > -1) {
        position.row = rowNumber;
        position.column = gridColumn;
      }
      return position;
    },
    {row: 0, column: 0}
  );
}

function calculateNextPosition(currentPosition, direction) {
  const updated = {...currentPosition};
  if (direction === 'ARROW-LEFT') {
    updated.column -= 1;
  } else if (direction === 'ARROW-UP') {
    updated.row -= 1;
  } else if (direction === 'ARROW-RIGHT') {
    updated.column += 1;
  } else {
    updated.row += 1;
  }
  return updated;
}

function isTargetPositionFeasible(puzzleGrid, targetPosition) {
  if (
    targetPosition.column >= COL_MAX_LIMIT ||
    targetPosition.row >= COL_MAX_LIMIT
  ) {
    return false;
  } else if (
    targetPosition.column <= COL_MIN_LIMIT ||
    targetPosition.row <= COL_MIN_LIMIT
  ) {
    return false;
  } else {
    const targetBrick = puzzleGrid[targetPosition.row][targetPosition.column];
    return targetBrick.visible === false;
  }
}

function changeBrickPosition(puzzleGrid, source, target) {
  const temp = puzzleGrid[source.row][source.column];
  puzzleGrid[source.row][source.column] = puzzleGrid[target.row][target.column];
  puzzleGrid[target.row][target.column] = temp;
  return puzzleGrid;
}
