import mongoose, { Schema, model, models } from "mongoose";

const BookingSchema = new Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  carName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
}, { timestamps: true });

export const Booking = models.Booking || model("Booking", BookingSchema);
