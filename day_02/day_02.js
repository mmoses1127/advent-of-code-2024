const fs = require('fs').promises

const parseFileToArr = async (filePath) => {
  const text = await fs.readFile(filePath, 'utf8')
  console.log('starting split...');
  const arrayOfLevels = text.split('\r');
  let levels = []
  arrayOfLevels.forEach(element => {
    const level = element.split(' ');
    levels.push(level)
  });
  // console.log('levels last: ', levels[levels.length - 1])
  return levels;
}

level1 = [7, 6, 4, 2, 1]
level2 = [1, 2, 7, 8, 9]
level3 = [1, 3, 2, 4, 5]
level5 = [9, 7, 6, 2, 1]
level6 = [8, 6, 4, 4, 1]
level7 = [1, 3, 6, 7, 9]

levels = []
levels.push(level1)
levels.push(level2)
levels.push(level3)
levels.push(level5)
levels.push(level6)
levels.push(level7)

const validateLevel = (level) => {
  // set increase /decrease
  let increasing = false;
  if (parseInt(level[1]) > parseInt(level[0])) increasing = true;
  if (!increasing) console.log('increasing is: ', increasing)
  for (let i = 0; i < level.length - 1; i++) {
    const current = parseInt(level[i])
    const next = parseInt(level[i+1])
    // if increasing, next must be more than current but less than current + 4
    if (increasing) {
      if (next <= current || next > current + 3) return false;
    } else {
      if (next >= current || next < current - 3) return false;
    }
  }
  // console.log(`${level} is true`);
  return true;
}

const validateLevelWithDampening = (level) => {
  // set increase /decrease
  let increasing = false;
  let alreadyRemoved = false;
  let justRemoved = false

  for (let i = 0; i < level.length - 1; i++) {
    if (justRemoved) {
      // console.log('skipping, justremoved an item')
      justRemoved = false;
      break;
    }
    const current = parseInt(level[i])
    // console.log('current value is: ', current)
    const next = parseInt(level[i+1])
    const nextNext = parseInt(level[i+2])
    if (i == 0) {
      increasing = current == next ? current < nextNext : current < next;
    }
    // if increasing, next must be more than current but less than current + 4
    if (increasing) {
      if (next <= current || next > current + 3) {
        if (!alreadyRemoved && (!(nextNext <= current || nextNext > current + 3) || i == level.length - 2)) {
          alreadyRemoved = true;
          justRemoved = true;
        } else {
          // console.log('failed on value: ', current)
          return false;
        }
      };
    } else {
      if (next >= current || next < current - 3) {
        if (!alreadyRemoved && (!(nextNext >= current || nextNext < current - 3) || i == level.length - 2)) {
          alreadyRemoved = true;
          justRemoved = true;
        } else {
          return false;
        }
      };
    }
  }
  // console.log(`${level} is true`);
  return true;
}

const countValidLevels = (arrayLevels) => {
  let count = 0;
  arrayLevels.forEach(level => {
    if (validateLevelWithDampening(level)) count++
  });
  console.log('Valid level count is: ', count)
  return count;
} 


// validateLevel(level4)
// countValidLevels(levels);
// validateLevelWithDampening(level6)

const getArrs = async () => {
  let levels = await parseFileToArr('./day_02/input02.txt')
  return levels
}


const getAnswer = async () => {
  let levels = await getArrs()
  // console.log('levels last in answer: ', levels[levels.length - 1])
  countValidLevels(levels);
}

getAnswer();