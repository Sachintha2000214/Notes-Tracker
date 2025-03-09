import User, { findOne } from '../models/User';

export const registerUser = async (req, res) => {
    try {
        const { name, registerNumber, email, password } = req.body;
        if (!name || !registerNumber || !email || !password) {
            return res.status(400).json({ message: 'Send all required fields: name, registerNumber, email, password' });
        }
        const existingUser = await findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, registerNumber, email, password });
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).json({ token, message: 'User registered successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


export const loginUser = async (req,res) => {
    try {
        const { registerNumber, password } = req.body;
        if (!registerNumber || !password) {
            return res.status(400).send({
                message: 'Send email and password'
            });
        }
        const user = await User.findOne({ registerNumber });

        if (!user) return res.status(404).send({ message: 'User not found' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });
        const token = user.generateAuthToken();
        res.status(200).json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

};