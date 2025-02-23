import mongoose, { Schema, model, models } from "mongoose";
interface IRide {
  passenger: mongoose.Types.ObjectId;
  driver?: mongoose.Types.ObjectId | null;
  pickupLocation: string;
  dropLocation: string;
  vehicleType: string;
  status: "pending" | "accepted" | "completed" | "canceled";
  duration: number;
  distance: number;
  paymentID: string;
  orderID: string;
  fare: number;
  createdAt?: Date;
  updatedAt?: Date;
}
const RideSchema = new Schema<IRide>(
  {
    passenger: { type: Schema.Types.ObjectId, ref: "Saheli", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "Saarthi", default: null },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    vehicleType: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "canceled"],
      default: "pending",
    },
    duration: { type: Number },//in seconds
    distance: { type: Number },//in meters
    paymentID: { type: String },
    orderID: { type: String },
    fare: { type: Number, required: true },
  },
  { timestamps: true }
);

const Ride = models?.Ride || model("Ride", RideSchema);
export default Ride;
