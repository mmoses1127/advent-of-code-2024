const fs = require('fs').promises

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const mulDoDontRegex = /(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g;

const parseFile = async (filePath) => {
  console.log('reading text...')
  const text = await fs.readFile(filePath, 'utf8')
  // console.log('start of text is: ', text)
  return text;
}

const extractMulsAndMultiply = (text) => {
  console.log('extracting muls...');
  const matches = text.matchAll(mulDoDontRegex);
  let answer = 0;
  let active = true;
  matches.forEach(match => {
    // console.log(`Match is: `, match)
    if (match[0].includes('mul') && active) {
      let product = match[2]*match[3]
      console.log('Product is: ', product)
      answer += product;
    } else if (match[0].includes("don't()")) {
      active = false;
      console.log('Changed active to: ', active)
    } else if (match[0].includes("do()")) {
      active = true
      console.log('Changed active to: ', active)
    }
  });
  return answer;
}

const getAllMuls = async () => {
  let text = await parseFile('./day_03/input03.txt')
  let answer = extractMulsAndMultiply(text)
  console.log('answer is: ', answer)

}

getAllMuls();