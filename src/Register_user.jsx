import React, { useState } from "react";
import axios from "axios";

const Register_user = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [type, setType] = useState("user");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [vehicle_number, setVehicle] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      mobile,
      type,
      password,
      address,
      username: name,
      vehicle_number,
      latitude,
      longitude,
    };
    console.log("Submitting data:", data);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        data
      );
      console.log("✅ Registration Success:", response.data);
    } catch (err) {
      console.error("❌ Registration Error:", err);
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);

          try {
            // Reverse Geocoding with OpenStreetMap
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await res.json();
            if (data && data.display_name) {
              setAddress(data.display_name);
            } else {
              setAddress("Address not found");
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setAddress("Error fetching address");
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setAddress("Location access denied");
        }
      );
    } else {
      setAddress("Geolocation not supported by this browser");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name:
        <input
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        Mail:
        <input
          id="mail"
          name="mail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        Mobile:
        <input
          id="mobile"
          name="mobile"
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <br />
        Type:
        <select
          id="type"
          onChange={(e) => setType(e.target.value)}
          name="type"
          required
        >
          <option value="user">User</option>
          <option value="mechanic">Mechanic</option>
        </select>
        <br />
        {type === "mechanic" && (
          <div>
            Address:
            <input
              id="address"
              name="address"
              value={address}
              readOnly
            />
            <br />
            Location:
            <button type="button" onClick={getLocation}>
              Get Location
            </button>
            {latitude && longitude && (
              <p>
                📍 Latitude: {latitude}, Longitude: {longitude}
              </p>
            )}
          </div>
        )}
        {type === "user" && (
          <div>
            Vehicle Number:
            <input
              id="vehicle_number"
              name="vehicle_number"
              onChange={(e) => setVehicle(e.target.value)}
            />
          </div>
        )}
        Password:
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register_user;
