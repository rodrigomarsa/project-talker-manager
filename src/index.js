const express = require('express');
const auth = require('./middlewares/auth');
const validateAge = require('./middlewares/validateAge');
const validateEmail = require('./middlewares/validateEmail');
const validateName = require('./middlewares/validateName');
const validatePassword = require('./middlewares/validatePassword');
const validateTalk = require('./middlewares/validateTalk');
const validateRate = require('./middlewares/validateTalkRate');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
// const fs = require('fs').promises;
// const path = require('path');
const { readFile, writeFile } = require('./utils/fsUtils');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// const talkersPath = path.resolve(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readFile();
    return res.status(200).json(talkers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const talkers = await readFile();
    const filteredTalker = talkers.find(({ id }) => id === Number(req.params.id));
    if (filteredTalker) {
      return res.status(200).json(filteredTalker);
    }
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker',
auth,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  try {
    const newTalker = req.body;
    const newTalkerWithId = await writeFile(newTalker);
    return res.status(201).json(newTalkerWithId);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});