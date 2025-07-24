"use client"

import { useState, useEffect } from "react"

export function useGeolocation() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLoading(false)
      },
      (error) => {
        // Fallback to Thadomal Shahani Engineering College location
        setLocation({
          latitude: 19.0896,
          longitude: 72.8656,
        })
        setError("Using default location: Thadomal Shahani Engineering College")
        setLoading(false)
      },
    )
  }, [])

  return { location, error, loading }
}
