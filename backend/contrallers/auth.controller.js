import User from '../models/user.model.js'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import RefreshToken from '../models/refreshToken.js'
import HTTPError from '../utils/HttpError.js'
export class AuthController{
    static async register(req, res, next){
        let {fullName, email, password} = req.body;
        try{
            password = await bcrypt.hash(password, 10);
            await User.create({fullName, email, password});
            return res.status(201).json({msg:"user created"});
        }catch(err){
            next(err);
        }
    }

    static async login(req, res, next){
        try{
            let {email, password} = req.body;
            const user = await User.findOne({email: email});
            if(!user || !await bcrypt.compare(password, user.password)){
                return next(new HTTPError(400, 'invalid credentials'))
            } 
            let accessToken = await jwt.sign({userId: user._id, role:user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "4m"});
            let refreshToken = await jwt.sign({userId: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
            const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
            
            await RefreshToken.create({
                user: user._id,
                token: hashedRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });

            return res
            .status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 100,
            })
            .json({
                message: "user logged in successfully",
                accessToken,
            });
                }catch(err){
                    next(err);
                }
        }
    static async logout(req, res, next) {
        // black list for tokens with expire date  => access token only

        // access token + refresh token
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
            return next(new HTTPError(400, "Refresh token required"));

            let payload;
            try {
            payload = await jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
            );
            } catch (err) {
            return next(new HTTPError(401, "invalid refresh token"));
            }
            const userTokens = await RefreshToken.find({ user: payload.userId });

            // find will run callback for each token sync
            // async  => promises
            // promise.all()

            console.log(userTokens);
            const comparisons = await Promise.all(
            userTokens.map((t) => {
                return bcrypt.compare(refreshToken, t.token);
            }),
            );
            console.log(comparisons);
            const matchedIndex = comparisons.findIndex((match) => match == true);

            if (matchedIndex === -1)
            return next(new HTTPError(401, "Refresh token not found"));

            await RefreshToken.findByIdAndDelete(userTokens[matchedIndex]._id);

            return res
            .clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" })
            .json({
                message: "Logged out successfully",
            });
        } catch (err) {
            next(err);
        }
        };

    static async refresh (req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
            return next(new HTTPError(400, "Refresh token required"));

            let payload;
            try {
            payload = await jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
            );
            } catch (err) {
            return next(new HTTPError(401, "invalid refresh token"));
            }

            const userTokens = await RefreshToken.find({ user: payload.userId });

            // find will run callback for each token sync
            // async  => promises
            // promise.all()

            console.log(userTokens);
            const comparisons = await Promise.all(
            userTokens.map((t) => {
                return bcrypt.compare(refreshToken, t.token);
            }),
            );
            console.log(comparisons);
            const matchedIndex = comparisons.findIndex((match) => match == true);

            if (matchedIndex === -1)
            return next(new HTTPError(401, "Refresh token not found"));

            const user = await User.findById(payload.userId);
            const newAccessToken = await jwt.sign(
            {
                userId: payload.userId,
                role: user.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m",
            },
            );

            return res.status(200).json({
            accesstoken: newAccessToken,
            });
        } catch (err) {
            next(err);
        }

    }
}