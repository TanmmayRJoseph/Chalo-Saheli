import mongoose, { model, models } from "mongoose";
import bcrypt from "bcrypt";

interface Isaarthi {
  name: string;
  phoneNo: number;
  gender: string;
  vechile: string;
  dob: Date;
  emailId: string;
  city: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const saarthiSchema = new mongoose.Schema<Isaarthi>(
  {
    name: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    gender: { type: String, required: true },
    vechile: { type: String, required: true },
    dob: { type: Date, required: true },
    emailId: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//hashing the password
saarthiSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

const Saarthi = models?.Saarthi || model("Saarthi", saarthiSchema);
export default Saarthi;