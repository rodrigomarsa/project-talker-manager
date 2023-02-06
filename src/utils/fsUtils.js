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

module.exports = { readFile };