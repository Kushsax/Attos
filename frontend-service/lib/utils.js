import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(`Geolocation error: ${error.message}`);
      }
    );
  });
};


export const reverseGeocode = async ({ latitude, longitude }) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    if (!res.ok) throw new Error('Failed to fetch address.');

    const data = await res.json();

    return {
      latitude,
      longitude,
      address: {
        display: data.display_name,
        city: data.address.city || data.address.town || data.address.village || null,
        state: data.address.state || null,
        country: data.address.country || null,
        postcode: data.address.postcode || null,
      },
      raw: data.address,
    };
  } catch (err) {
    throw new Error(`Reverse geocoding failed: ${err.message}`);
  }
};