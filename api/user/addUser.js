const Router = require('express');
const { v4: uuidv4 } = require('uuid');
const { Users } = require('../../models/users');

const router = Router();

router.post('/users', async (req, res) => {
  const { email, password } = req.body;

  const user = new Users({ email, password, apiKey: uuidv4() });

  if (!email) {
    res.status(400).json({ message: `This field email is required` });
  }

  if (!password) {
    res.status(400).json({ message: `This field password is required` });
  }

  const result = await user.save().catch((error) => {
    if (error.code == 11000) {
      res.status(400).json({ message: 'This email is already in use' });
    }
  });

  res.status(200).send(result);
});

module.exports = router;