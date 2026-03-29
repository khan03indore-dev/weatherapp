import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const apiKey = "9722a16f22fbfc2b3e765ab23487d42c";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      setWeather(data);
      setError("");
    } else {
      setError("City not found ❌");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Weather App 🌦️</h1>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
          <div>
            <h2>{weather.name}</h2>
            <h3>{weather.main.temp} °C</h3>
            <p>{weather.weather[0].main}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;