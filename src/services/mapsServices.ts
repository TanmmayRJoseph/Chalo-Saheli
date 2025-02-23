import axios from "axios";

export async function getAddressCoordinates(
  address: string
): Promise<{ lat: number; lng: number }> {
  const apiKey = process.env.GOOGLE_MAP_API;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error(`Geocoding error: ${data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
}

export async function getDistanceTime(origin: string, destination: string) {
  const apiKey = process.env.GOOGLE_MAP_API;

  if (!apiKey) {
    throw new Error("Missing Google Maps API Key");
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (
      data.status !== "OK" ||
      !data.rows.length ||
      !data.rows[0].elements.length
    ) {
      throw new Error("Invalid response from Distance Matrix API");
    }

    return data.rows[0].elements[0]; // Ensure this exists before accessing
  } catch (error) {
    console.error("Error fetching distance/time:", error);
    throw error;
  }
}

export async function getAutoCompleteSuggestions(address: string) {
  if (!address) {
    throw new Error("Address is required");
  }

  const apiKey = process.env.GOOGLE_MAP_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error(`Autocomplete error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    throw error;
  }
}
