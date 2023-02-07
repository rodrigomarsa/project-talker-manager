function validateDate(dateString) {
  const [day, month, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);
  // const validDate = date.toLocaleDateString('pt-BR');
  return date instanceof Date && !Number.isNaN(Number(date));
}

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validateDate(watchedAt) || watchedAt[2] !== '/' || watchedAt[5] !== '/') {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateWatchedAt;