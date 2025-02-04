import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  // extract userinfo
  console.log("Request Body- ", req.body);
  // const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;
  // get user from database
  const user = await User.findOne({
    where: { username: username },
  });

  //if user doesnt exist, send error
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed! - User does not exist!' });
  }

  //compare given password to stored password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  //if invalid, send error
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Authentication failed! - Password is not valid!' });
  }
  
  //get secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  //generate a jwt token for user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' }) || '';
  console.log("User Authenticated - Sending Token.");
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
