const express = require('express');
const auth = require('./middlewares/auth');
const validateAge = require('./middlewares/validateAge');
const validateEmail = require('./middlewares/validateEmail');
const validateName = require('./middlewares/validateName');
const validatePassword = require('./middlewares/validatePassword');
const validateTalk = require('./middlewares/validateTalk');
const validateRate = require('./middlewares/validateTalkRate');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const { readFile, addTalker, getTalkerById, writeFile } = require('./utils/fsUtils');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    const talkers = await readFile();
    if (q) {
      const filteredTalker = talkers
      .filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));
      return res.status(200).json(filteredTalker);
    }
    res.status(200).json(talkers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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
    const { id } = req.params;
    const filteredTalker = await getTalkerById(Number(id));
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
    const newTalkerWithId = await addTalker(newTalker);
    return res.status(201).json(newTalkerWithId);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put('/talker/:id',
auth,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const talker = await getTalkerById(Number(id));
    const index = talkers.indexOf(talker);
    const updated = { id: Number(id), ...req.body };
    talkers.splice(index, 1, updated);
    await writeFile(talkers);
    return res.status(200).json(updated);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete('/talker/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const filteredTalker = talkers.filter((talker) => talker.id !== Number(id));
    await writeFile(filteredTalker);
    res.status(204).end();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});