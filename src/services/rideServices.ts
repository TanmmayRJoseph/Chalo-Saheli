import Ride from "@/models/ride";
import { getDistanceTime } from "./mapsServices";
import { connectToDatabase } from "@/config/db";
import crypto from "crypto"; // Fixed missing import

interface DistanceTime {
  distance: number;
  duration: number;
}

async function getFare(pickupLocation: string, dropLocation: string) {
  if (!pickupLocation || !dropLocation) {
    throw new Error("Missing required fields");
  }

  const distanceTime: DistanceTime = await getDistanceTime(
    pickupLocation,
    dropLocation
  );

  console.log("Raw distanceTime response:", distanceTime); // Debugging

  // Ensure response contains valid numbers
  // if (
  //   !distanceTime ||
  //   typeof distanceTime.distance !== "String" ||
  //   typeof distanceTime.duration !== "number"
  // ) {
  //   throw new Error("Invalid distance or duration data received");
  // }

  const baseFare = { auto: 30, car: 50, motorcycle: 20 };
  const perKmRate = { auto: 10, car: 15, motorcycle: 8 };
  const perMinuteRate = { auto: 2, car: 3, motorcycle: 1.5 };

  // Convert meters to km safely
  const distanceKm = isNaN(distanceTime.distance)
    ? 0
    : distanceTime.distance / 1000;
  const durationMinutes = isNaN(distanceTime.duration)
    ? 0
    : distanceTime.duration / 60;

  // Corrected fare calculation
  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceKm * perKmRate.auto +
        durationMinutes * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        distanceKm * perKmRate.car +
        durationMinutes * perMinuteRate.car
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        distanceKm * perKmRate.motorcycle +
        durationMinutes * perMinuteRate.motorcycle
    ),
  };

  return fare;
}

function getOtp(num: number) {
  function generateOtp(num: number) {
    return crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
  }
  return generateOtp(num);
}

// interface RideParams {
//   passenger: string;
//   pickupLocation: string;
//   dropLocation: string;
//   vehicleType: "auto" | "car" | "motorcycle";
//   otp: string;
// }

// export async function createRides({
//   passenger,
//   pickupLocation,
//   dropLocation,
//   vehicleType,
  
// }: RideParams) {
//   await connectToDatabase(); // Ensure DB is connected before inserting
//   if (!passenger || !pickupLocation || !dropLocation || !vehicleType) {
//     throw new Error("All fields are required");
//   }

//   // Get fare before creating the ride
//   const fare = await getFare(pickupLocation, dropLocation);

//   console.log(fare);
//   const ride = await Ride.create({
//     passenger,
//     pickupLocation,
//     dropLocation,
//     otp: getOtp(6),
//     vehicleType,
//     fare: fare[vehicleType], // Use calculated fare
//   });

//   return ride;
// }


interface RideParams {
  passenger: string;
  pickupLocation: string;
  dropLocation: string;
  vehicleType: "auto" | "car" | "motorcycle";
}

export async function createRides({
  passenger,
  pickupLocation,
  dropLocation,
  vehicleType
}: RideParams) {
  await connectToDatabase(); // Ensure DB is connected before inserting

  if (!passenger || !pickupLocation || !dropLocation || !vehicleType) {
    throw new Error("All fields are required");
  }

  // Get fare before creating the ride
  const fare = await getFare(pickupLocation, dropLocation);

  if (!fare || fare[vehicleType] === undefined) {
    throw new Error("Failed to calculate fare. Please check the input locations.");
  }

  console.log("Fare calculated:", fare);

  const ride = await Ride.create({
    passenger,
    pickupLocation,
    dropLocation,
    otp: getOtp(6), // Generate OTP internally
    vehicleType,
    fare: fare[vehicleType], // Use calculated fare
  });

  return ride;
}
