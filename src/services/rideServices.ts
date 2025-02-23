import Ride from "@/models/ride";
import { getDistanceTime } from "./mapsServices";

interface DistanceTime {
  distance: number;
  duration: number;
}

async function getFare(pickupLocation: string, dropLocation: string) {
  if (!pickupLocation || !dropLocation) {
    throw new Error("Missing required fields");
  }

  const distanceTime: DistanceTime = await getDistanceTime(pickupLocation, dropLocation);

  if (!distanceTime || typeof distanceTime.distance !== "number" || typeof distanceTime.duration !== "number") {
    throw new Error("Invalid distance or duration data received");
  }

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };
  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  return {
    auto:
      baseFare.auto +
      distanceTime.distance * perKmRate.auto +
      distanceTime.duration * perMinuteRate.auto,
    car:
      baseFare.car +
      distanceTime.distance * perKmRate.car +
      distanceTime.duration * perMinuteRate.car,
    motorcycle:
      baseFare.motorcycle +
      distanceTime.distance * perKmRate.motorcycle +
      distanceTime.duration * perMinuteRate.motorcycle,
  };
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

  if (!(vehicleType in fare)) {
    throw new Error("Invalid vehicle type");
  }

  const ride = await Ride.create({
    passenger,
    pickupLocation,
    dropLocation,
    fare: fare[vehicleType],
  });

  return ride;
}
