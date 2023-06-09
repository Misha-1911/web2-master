const Router = require('express');
const { Link } = require('../../models/links');
const { Users } = require('../../models/users');

const router = Router();

router.use('/links', async (req, res, next) => {
  const apiKey = req.header('x-api-key');

  const user = await Users.findOne({ apiKey: apiKey });

  if (!user) {
    res.status(401).send({ message: 'User is not authorized' });
  }

  next();
});

router.get('/links', async (req, res) => {
  const { gt, lt } = req.query;

  const links = await Link.find({
    $or: [
      { expiredAt: { $gt: Date(gt) } },
      { expiredAt: { $lt: Date(lt) } },
    ],
  }).catch((error) => {
    res.status(400).json(error);
  });

  res.status(200).send(links);
});

module.exports = router;