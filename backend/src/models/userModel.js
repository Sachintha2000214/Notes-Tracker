import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true
         },
        registerNumber: { 
            type: String, 
            unique: true, 
            required: true 
        },
        email: { 
            type: String, 
            unique: true, 
            required: true },
        password: { 
            type: String, 
            required: true 
        },
    },
    {
        timestamps: true,
    }
);


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ id: this._id, name: this.name }, 'your_secret_key_here', { expiresIn: '1h' });
};

export const User = mongoose.model('User', userSchema);

