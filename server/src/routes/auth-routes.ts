import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  // extract userinfo
  const { username, password } = req.body;
  // get user from database
  const user = await User.findOne({
    where: { username },
  });

  //if user doesnt exist, send error
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed!' });
  }

  //compare given password to stored password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  //if invalid, send error
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Authentication failed!' });
  }
  
  //get secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  //generate a jwt token for user
  const token = jwt.sign({ username}, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
