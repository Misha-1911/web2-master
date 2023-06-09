const Router = require('express');
const { Users } = require('../../models/users');

const router = Router();

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email, password });

  if (!user) {
    return res.status(400).send({ message: 'User with such credentials was not found' });
  }

  res.status(200).send(user);
});

module.exports = router;