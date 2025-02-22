import axios from 'axios';

async function getAddressCoordinates(address: string): Promise<{ lat: number; lng: number }> {
  const apiKey = process.env.GOOGLE_MAP_API; 
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error(`Geocoding error: ${data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
}

export default getAddressCoordinates;
