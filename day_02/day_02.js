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
level3 = [9, 7, 6, 2, 1]
level4 = [1, 3, 2, 4, 5]
level5 = [8, 6, 4, 4, 1]
level6 = [1, 3, 6, 7, 9]

levels = []
levels.push(level1)
levels.push(level2)
levels.push(level3)
levels.push(level4)
levels.push(level5)
levels.push(level6)

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

  for (let i = 0; i < level.length - 1; i++) {
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
        return false;
      };
    } else {
      if (next >= current || next < current - 3) {
        return false;
      };
    }
  }
  // console.log(`${level} is true`);
  return true;
}


const validateWithDampening = (levelArray, alreadyRemoved = false) => {
  // base case is array with 2 or fewer items, return true
  if (levelArray.length < 2) {
    console.log('Valid levelset found!  ', levelArray)
    return true;
  }
  
  const allowedDistances = [1, 2, 3]
  for (let i = 0; i < levelArray.length - 2; i++) {
    // must keep track of 3 items at a time
    let increasing;
    // for first set, determine if they are valid
    let set = [levelArray[i], levelArray[i+1], levelArray[i+2]]
    increasing = levelArray[i] < levelArray[i+1] ? true : false
    for (let j = 0; j < set.length -1; j++) {
      let increment = set[j + 1] - set[j]
      if (!increasing) increment *= -1
      if (!allowedDistances.includes(increment)) {
        // set is invalid, check if already removed, if not, check subsets
        if (alreadyRemoved) {
          console.log('Levelset invalid!  ', levelArray)
          return false;
        }
        let leftSubset = levelArray.slice(0, i).concat(set.slice(0,2)).concat(levelArray.slice(i+3))
        let rightSubset = levelArray.slice(0, i).concat(set.slice(1,3)).concat(levelArray.slice(i+3))
        let midSubset = levelArray.slice(0, i + 1).concat(levelArray.slice(i+2))
        // recursively call by stitching together subset to rest
        return validateWithDampening(leftSubset, true) || validateWithDampening(rightSubset, true) || validateWithDampening(midSubset, true);
      }
    }
    // return true if we reach the end of the array without a problewm
  }
  console.log('Valid levelset found! ', levelArray)
  return true;
}

const validateLevelsMitali = (level, alreadyRemoved = false) => {
  // check ascending
  for (let i = 0; i < level.length - 2; i++) {
    let curr = level[i];
    let next = level[i+1];
    if (next < curr + 1 || next > curr + 3) {
      if (!alreadyRemoved)
        // call ascending check recursively with a missing and with b missing
      levelA = level.toSpliced()
      levelB = level.slice(0, i + 1).concat(level.slice(i+2))
      validateAscending(levelA, true);
      validateAscending(levelB)
    }
  }
}


const keepItSimple = (level, alreadyRemoved = false) => {
  // check if the whole array works
  // if it doesnt, iterate the array, checking with the removal of 1 item at a time

  let increasing;
  const acceptedDiffs = [1, 2, 3]
  for (let i = 0; i < level.length; i++) {
    let diff = level[i+1] - level[i]
    if (i == 0) {
      increasing = diff >= 0 ? true : false;
    }
    if (!increasing) diff *= -1
    if (!acceptedDiffs.includes(diff)) {
      if (alreadyRemoved) {
        return false;
      }
      for (let j = 0; j < level.length; j++) {
        return keepItSimple(level.toSpliced(j, 1), true)
      }
    }
  }
  return true;
}


const countValidLevels = (arrayLevels) => {
  let count = 0;
  for (let j = 0; j < arrayLevels.length; j++) {
    let level = arrayLevels[j]
    console.log('Checking level: ', j + 1)
    if (validateLevelWithDampening(level)) {
      console.log(`Array validated on first run: ${level}`)
      count++
      continue;
    }
    for (let i = 0; i < level.length; i++) {
      let shortenedLevel = level.toSpliced(i, 1)
      if (validateLevelWithDampening(shortenedLevel)) {
        console.log(`Array validated on 2nd pass: ${level}...${shortenedLevel}`)
        count++
        break;
      }
    }
  }
  console.log('Valid level count is: ', count)
  return count;
} 


// validateLevel(level4)
// countValidLevels(levels);
// validateWithDampening(level6)

const getArrs = async () => {
  let levels = await parseFileToArr('./day_02/input02.txt')
  return levels
}

testArrays = [[89, 91, 94, 98, 98]]

const getAnswer = async () => {
  let levelsUsed = await getArrs()
  // console.log('levels last in answer: ', levels[levels.length - 1])
  countValidLevels(levelsUsed);
}

getAnswer();


