import mongoose from 'mongoose';

export interface User {
  _id?: string;
  username: String;
  password: String;
}

// type: mongoose.Types.ObjectId
