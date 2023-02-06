const express = require('express');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
// const fs = require('fs').promises;
// const path = require('path');
const { readFile } = require('./utils/fsUtils');
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

app.post('/login', validateEmail, validatePassword, (req, res) => {
  // const { email, password } = req.body;
  // if ([email, password].includes(undefined)) {
  //   return res.status(401).json({ message: 'Campos ausentes!' });
  //   }
  const token = generateToken();
  return res.status(200).json({ token });
});