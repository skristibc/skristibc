import mongoose, {model, models, Schema} from "mongoose";


const MenuItemSchema = new Schema({
  image: {type: String},
  name: {type: String},
  description: {type: String},
  motor: {type: String},
  age: {type: String},
  seats: {type: String},
  doors: {type: String},
  fuel: {type: String},
  gearShift: {type: String},
  power: {type: String},
  gps: {type: String},
  seatHeating: {type: String},
  climate: {type: String},
  category: {type: mongoose.Schema.Types.ObjectId},
  basePrice: {type: Number},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
