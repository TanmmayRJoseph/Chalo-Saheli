import mongoose ,{ Schema ,model, models} from "mongoose";
interface IRide {
    passenger: mongoose.Types.ObjectId;
    driver?: mongoose.Types.ObjectId|null;
    pickupLocation: string;
    dropLocation: string;
    vehicleType: string;
    status: 'pending' | 'accepted' | 'completed' | 'canceled';
    fare: number;
    createdAt?: Date;
    updatedAt?: Date;
}
const RideSchema = new Schema<IRide>(
    {
      passenger: { type: Schema.Types.ObjectId, ref: 'Saheli', required: true },
      driver: { type: Schema.Types.ObjectId, ref: 'Saarthi', default: null },
      pickupLocation: { type: String, required: true },
      dropLocation: { type: String, required: true },
      vehicleType: { type: String, required: true },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'canceled'],
        default: 'pending',
      },
      fare: { type: Number, required: true },
    },
    { timestamps: true }
  );

const Ride = models?.Ride || model("Ride", RideSchema);
export default Ride