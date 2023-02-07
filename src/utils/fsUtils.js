const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

async function readFile() {
  try {
    const data = await fs.readFile(talkersPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function writeFile(newTalker) {
  try {
    const oldTalkers = await readFile();
    const newTalkerWithId = { id: oldTalkers[oldTalkers.length - 1].id + 1, ...newTalker };
    // oldTalkers.push(newTalkerWithId);
    // const allTalkers = JSON.stringify(oldTalkers, null, 2);
    const allTalkers = JSON.stringify([...oldTalkers, newTalkerWithId], null, 2);
    await fs.writeFile(talkersPath, allTalkers);
    return newTalkerWithId;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  readFile,
  writeFile,
};