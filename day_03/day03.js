const fs = require('fs').promises

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const doRegex = g
const dontReges = g

const parseFile = async (filePath) => {
  console.log('reading text...')
  const text = await fs.readFile(filePath, 'utf8')
  // console.log('start of text is: ', text)
  return text;
}

const extractMulsAndMultiply = (text) => {
  console.log('extracting muls...');
  const muls = text.matchAll(mulRegex);
  let answer = 0
  muls.forEach(mul => {
    // console.log(`Mul is: `, mul)
    answer += (mul[1]*mul[2])
  });
  return answer;
}

const getAllMuls = async () => {
  let text = await parseFile('./day_03/input03.txt')
  let answer = extractMulsAndMultiply(text)
  console.log('answer is: ', answer)

}

getAllMuls();



// scan the input and search for reges substrings that match mul(n,n) where n can be 1-3 digits
// toss the digits into a subarray
// iterate the subarray, multiply the numbers and increment an asnwer counter