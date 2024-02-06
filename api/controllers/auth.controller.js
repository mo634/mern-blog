import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utlis/errorHandler.js";
import jwt from "jsonwebtoken";
export const singUp = async (req, res, next) => {
    // get data from body
    const { username, email, password } = req.body;

    // validate data

    if (
        !username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
    ) {
        // send error to middleware
        return next(errorHandler(400, "all fields required"));
    }

    //hash the password

    const hashedPassword = await bcryptjs.hashSync(password, 10);

    // create new user

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        // save user

        await newUser.save();

        // send response

        res.status(201).json({ message: "User created", newUser });
    } catch (error) {
        // send error to middleware
        next(error);
    }
};

export const singIn = async (req, res, next) => {
    // get data from body
    const { email, password } = req.body;

    try {
        // validate data
        if (!email || !password || email === "" || password === "") {
            return next(errorHandler(400, "all field required"));
        }

        // find user
        const validUser = await User.findOne({ email });

        if (!validUser) {
            console.log("first");
            return next(errorHandler(404, "invalid email"));
        }

        // compare password
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(401, "invalid password"));
        }

        //hash the tokent
        const token = jwt.sign({ id: validUser._id,isAdmin:validUser.isAdmin }, process.env.SECRET_KEY);

        const { password: pass, ...rest } = validUser._doc;
        
        // store credentials in cookie & sent response
        res
            .status(200)
            .cookie("access_token", token, { httpOnly: true })
            .json({ message: "login success", user: rest });
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    // get user data

    const { name, email, googlePhotoUrl } = req.body;

    console.log(name)

    try {
        const user = await User.findOne({ email });

        // if user exist =>  singn in (hashing with jwt the doc id then store in cookie)
        if (user) {
            const token = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin
                },
                process.env.SECRET_KEY
            );

            const { password: pass, ...rest } = user._doc;

            //storer token in cookie
            res
                .status(200)
                .cookie("access_token", token, { httpOnly: true })
                .json(rest);
        } else {
            //create and hash the password
            const generatePassword = Math.random().toString(36).slice(-8);

            const hashPassword = bcryptjs.hashSync(generatePassword, 10);

            // create new user
            const newUser = await User({
                // to make user name is unique
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),

                email,
                password: hashPassword,
                googlePhotoUrl,
            });

            // save changes
            await newUser.save();

            //send response

            const token = jwt.sign(
                {
                    id: newUser._id,
                    isAdmin: newUser.isAdmin
                }
            , process.env.SECRET_KEY)

            const { password: pass, ...rest } = newUser._doc;

            res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest)
        }
    } catch (error) {
        next(error)
    }
};
