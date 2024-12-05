const fs = require('fs').promises

// matrix problem

const { start } = require("repl");

// identify target words
// iterate through each row
// iterate each number, it will be a starting point
// if it starts with the first letter, check in all 8 directions if possible within bounds
// if next letter is found, continue

const XMAS = 'XMAS'
const SAMX = 'SAMX'

const getLetterFromPosition = (position, matrix) => {
  const [x, y] = position;
  if (!matrix[y] || y < 0 || x < 0 || x >= matrix[y].length) {
    return 9;
  }
  return matrix[y][x];
}

const getNextPosition = (startingPosition, direction) => {
  return [startingPosition[0] + direction[0], startingPosition[1] + direction[1]]
}

const findWords = (matrix) => {
  let count = 0;
  
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i]
    for (let j = 0; j < row.length; j++) {
      let letterPosition = 0;
      let position1 = [j, i]
      const startingLetter = getLetterFromPosition(position1, matrix)
      // console.log('Starting letter is: ', startingLetter)
      // console.log(`XMAS letter 0 is: ${XMAS[0]} and letter position is ${letterPosition}`)
      if (startingLetter == XMAS[letterPosition]) {
        console.log(`XMAS: Moving on to letter 2 from postion${position1}...`)
        let word = XMAS;
        letterPosition = 1;
        for (x = -1; x < 2; x++) {
          for (y = -1; y < 2; y++) {
            let direction = [x, y]
            if (direction == [0, 0]) continue;
            let position2 = getNextPosition(position1, direction)
            let letter = getLetterFromPosition(position2, matrix)
            if (letter == word[letterPosition] ) {
              console.log('Moving on to letter 3...')
              let position3 = getNextPosition(position2, direction)
              letter = getLetterFromPosition(position3, matrix)
              letterPosition += 1
              if (letter == word[letterPosition] ) {
                console.log('Moving on to letter 4...')
                let position4 = getNextPosition(position3, direction)
                letter = getLetterFromPosition(position4, matrix)
                letterPosition += 1
                if (letter == word[letterPosition] ) {
                  console.log(`${word} found!`)
                  count++
                }
              }
            }
          }
        }
        

      } else if (row[j] == SAMX[letterPosition]) {
        console.log(`SAMX: Moving on to letter 2 from postion${position1}...`)
        let word = SAMX;
        letterPosition = 1;
        for (x = -1; x < 2; x++) {
          for (y = -1; y < 2; y++) {
            let direction = [x, y]
            if (direction == [0, 0]) continue;
            let position2 = getNextPosition(position1, direction)
            let letter = getLetterFromPosition(position2, matrix)
            if (letter == word[letterPosition] ) {
              console.log(`Direction ${direction} good. ${letter} found at position ${position2}. Moving on to letter 3...`)
              let position3 = getNextPosition(position2, direction)
              letter = getLetterFromPosition(position3, matrix)
              letterPosition += 1
              if (letter == word[letterPosition] ) {
                console.log(`${letter} found at position ${position3}. Moving on to letter 4...`)
                let position4 = getNextPosition(position3, direction)
                letter = getLetterFromPosition(position4, matrix)
                letterPosition += 1
                if (letter == word[letterPosition] ) {
                  console.log(`${word} found!`)
                  count++
                }
              }
            }
          }
        }
      }
    }
  }
  console.log('Count is: ', count)
  return count;
}

const parseFile = async (filePath) => {
  console.log('reading text...')
  const text = await fs.readFile(filePath, 'utf8')
  // console.log('start of text is: ', text)
  return text.split('\r');
}

testText = `MMMSXXMASM-MSAMXMSMSA-AMXSXMAAMM-MSAMASMSMX-XMASAMXAMM-XXAMMXXAMA-SMSMSASXSS-SAXAMASAAA-MAMMMXMMMM-MXMXAXMASX`
const testMatrix = testText.split('-')

const findWordsAsync = async () => { 
  const inputMatrix = await parseFile('./day_04/input04.txt')
  // const inputMatrix = testMatrix;
  findWords(inputMatrix);
}

findWordsAsync();


