import User from '../models/Users.js';
import jwt from 'jsonwebtoken';

export const RefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        //if no refresh token
        if(!refreshToken) return res.sendStatus(401);
        //if there is refresh token
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        //if the token doesn't match the refresh token from database
        if(!user[0]) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if(err) res.sendStatus(403);
            
            const userID = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userID, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken });
        })

    } catch (err) {
        console.log(err);
    }
}