const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '..', 'talker.json');

async function readFile() {
  try {
    const data = await fs.readFile(talkersPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function writeFile(talker) {
  try {
    await fs.writeFile(talkersPath, JSON.stringify(talker, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}

async function addTalker(newTalker) {
  try {
    const talkers = await readFile();
    const newTalkerWithId = { id: talkers[talkers.length - 1].id + 1, ...newTalker };
    talkers.push(newTalkerWithId);
    await writeFile(talkers);
    return newTalkerWithId;
  } catch (error) {
    console.error(error.message);
  }
}

const getTalkerById = async (id) => {
  const talkers = await readFile();
  return talkers.find((talker) => talker.id === id);
};

module.exports = {
  readFile,
  writeFile,
  addTalker,
  getTalkerById,
};