import mongoose, { model, models } from "mongoose";
import bcrypt from "bcrypt";

interface ISaheli {
  name: string;
  phoneNo: number;
  gender: string;
  emergencyNo: number;
  dob: Date;
  emailId: string;
  address: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const saheliSchema = new mongoose.Schema<ISaheli>(
  {
    name: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    gender: { type: String, required: true },
    emergencyNo: { type: Number, required: true },
    dob: { type: Date, required: true },
    emailId: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//hasing the password
saheliSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})
const Saheli = models?.Saheli || model("Saheli", saheliSchema);

export default Saheli;