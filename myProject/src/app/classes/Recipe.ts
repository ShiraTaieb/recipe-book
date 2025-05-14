import mongoose from 'mongoose';

export interface Recipe {
  _id?: string;
  name: String;
  difficultLevel: Number;
  time: Number;
  ingrediets: String[];
  img: String;
}
