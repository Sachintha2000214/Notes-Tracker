import { User } from '../models/userModel.js';

export const registerUser = async (req, res) => {
    try {
        const { name,registerNumber, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                message: 'Send all required fields: name, email, password'
            });
        }
        const user = new User({ name,registerNumber, email, password });
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
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