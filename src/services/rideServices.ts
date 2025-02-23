import Ride from "@/models/ride";
import { getDistanceTime } from "./mapsServices";

interface DistanceTime {
  distance: number;  // Should be a number, not an object
  duration: number;
}

async function getFare(pickupLocation: string, dropLocation: string) {
    if (!pickupLocation || !dropLocation) {
      throw new Error("Missing required fields");
    }
  
    const distanceTime: DistanceTime = await getDistanceTime(pickupLocation, dropLocation);
  
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
    const distanceKm = isNaN(distanceTime.distance) ? 0 : distanceTime.distance / 1000;
    const durationMinutes = isNaN(distanceTime.duration) ? 0 : distanceTime.duration / 60;
  
    // Corrected fare calculation
    const fare = {
        auto: Math.round(baseFare.auto + (distanceKm * perKmRate.auto) + (durationMinutes * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distanceKm * perKmRate.car) + (durationMinutes * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + (distanceKm * perKmRate.motorcycle) + (durationMinutes * perMinuteRate.motorcycle)),
    };

    return fare;
}

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
  vehicleType,
}: RideParams) {
  if (!passenger || !pickupLocation || !dropLocation || !vehicleType) {
    throw new Error("Missing required fields");
  }

  const fare = await getFare(pickupLocation, dropLocation);
  console.log("Calculated Fare:", fare); // Debugging

  if (!(vehicleType in fare)) {
    throw new Error("Invalid vehicle type");
  }

  const ride = await Ride.create({
    passenger,
    pickupLocation,
    dropLocation,
    fare: fare[vehicleType],
    vehicleType, // Adding vehicleType to match schema
  });

  return ride;
}
