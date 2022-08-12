import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//fungsi select user
export const getUser = async(req, res) => {
    try {
        const user = await User.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(user);
    } catch (err) {
        console.log(err);
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    //if pass and conf pass not the same
    if(password != confirmPassword) return res.status(400).json({msg: 'Password and confirm password are not the same!'});
    //if pass and conf pass are the same, encrypt password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    //registering the user to the database
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: 'Successfully registered!'})
    } catch (err) {
        console.log(err);
    }
}

export const Login = async(req, res) => {
    //select user where email as req.body
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        //compare password to the password in the database
        const match = await bcrypt.compare(req.body.password, user[0].password);
        //if the oasswird doesn't match
        if(!match) return res.status(400).json({msg: 'Wrong password!'});
        //if the password matches, create variables based on the selected query
        const userID = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        //create token
        const accessToken = jwt.sign({userID, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userID, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await User.update({refresh_token: refreshToken}, {
            where: {
                id: userID
            }
        });
        //create cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        //send access token to the client
        res.json({ accessToken })
    } catch (err) {
        res.status(404).json({msg: 'This email has not been registered!'});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    //if no refresh token
    if(!refreshToken) return res.sendStatus(204);
    //if there is refresh token
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    //if the token doesn't match the refresh token from database
    if(!user[0]) return res.sendStatus(204);    
    const userID = user[0].id;
    await User.update({refresh_token: null}, {
        where: {
            id: userID
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}