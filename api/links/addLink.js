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

router.post('/links', async (req, res) => {
  const { original } = req.body;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let cutLink = '';

  for (let i = 0; i < 15; i++) {
    cutLink += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const currentDate = new Date();
  const expiredAtDate = currentDate.setDate(currentDate.getDate() + 5);

  const link = new Link({
    'link.original': original,
    'link.cut': cutLink,
    expiredAt: expiredAtDate
  });

  const { link: { cut }, expiredAt } = await link.save()
    .catch((error) => {
      if (error.code == 11000) {
        res.status(400).json({ message: 'This link is already in use' });
      };
    });

  res.status(200).send({
    link: cut,
    expiredAt: expiredAt
  });
});

module.exports = router;