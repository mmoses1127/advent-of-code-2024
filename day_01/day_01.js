// import { FileReader } from 'filereader';
const fs = require('fs').promises
const util = require('util');


console.log('Start of script...')
// const readFilePromise = util.promisify(fs.readFile);

const parseFileToArr = async (filePath) => {
  const text = await fs.readFile(filePath, 'utf8')
  console.log('starting split...');
  const arrayOfLines = text.split('\r');
  let arr1 = [];
  let arr2 = [];
  arrayOfLines.forEach(element => {
    const [el1, el2] = element.split('   ');
    arr1.push(el1);
    arr2.push(el2);
  });
  return [arr1, arr2];
}

const sumSmallestDistances = (filePath, reader) => {
  // parse text file
  let text = '';
  reader.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file: ', err)
      return;
    }
    text = data;
    // for each line, split by the tab, add index 0 to arr1, index 1 to arr2
    if (text) {
      console.log('starting split...');
      const arrayOfLines = text.split('\r');
      let arr1 = [];
      let arr2 = [];
      arrayOfLines.forEach(element => {
        const [el1, el2] = element.split('   ');
        arr1.push(el1);
        arr2.push(el2);
      });
      // sort each list from small to large
      arr1.sort((a, b) => a - b);
      arr2.sort((a, b) => a - b);
      // for each pair, obtain the difference and add to the answer integer
      let answer = 0;
      for (let i = 0; i < arr1.length; i++) {
        const diff = Math.abs(arr1[i] - arr2[i])
        answer += diff
      }
      // return integer
      console.log('answer is: ', answer)
      return answer;
    }
  })
}

similarityScore = (arr1, arr2) => {
  let answer = 0;
  // sort lists
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  // console.log('arr1 sorted is: ', arr1)
  // console.log('arr2 sorted is: ', arr2)
  // iterate through arr1, if next index is same value, move on, else
  for (let i = 0; i < arr1.length; i++) {
    const currentEle = parseInt(arr1[i]);
    // const prevEle = arr1[i-1];
    // if (prevEle && currentEle > prevEle)
    let sameCounter = 0;
    // iterate through arr2, if value is lower than current arr1 input, pop it
    for (let j = 0; j < arr2.length; j++) {
      // if equal, increment same counter and pop
      const currentJEle = parseInt(arr2[j])
      if (currentEle == currentJEle) {
        sameCounter++
        // arr2.splice(j, 1);
      } else if (currentEle < currentJEle) {
        // if more, return after multiplying samecounter with ele value and adding to the answer
        // console.log(`for the arr1 value of ${currentEle}, we found ${sameCounter} instances in arr2 and incremented the answer by ${currentEle*sameCounter}`)
        answer += sameCounter * currentEle
        break;
      }
    }
  }
  console.log('answer is: ', answer)
  return answer;

  
}

a1 = 1, 3, 5, 7, 9
a2 = 2, 4, 7, 10, 11

// sumSmallestDistances('input.txt', reader);

const arr1 = [3, 4, 2, 1, 3, 3]
const arr2 = [4, 3, 5, 3, 9, 3]


// let arrs = parseFileToArr('input.txt');

const getArrs = async () => {
  let arrs = await parseFileToArr('input.txt')
  // console.log('arrs are : ', arrs)
  return arrs
}

// const arrs = getArrs();


const runSims = async () => {
  const [arrs1, arrs2] = await getArrs();
  // console.log('arrs1: ', arrs1)
  arrs2.forEach(num => {
    // console.log('array item is: ', num)
  })
  let res = await similarityScore(arrs1, arrs2);
  return res;
}

runSims();