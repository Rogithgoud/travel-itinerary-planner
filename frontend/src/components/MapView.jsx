import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fixing default marker icon issue in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView({ itinerary }) {
  const { days } = itinerary.dailyPlan;

  // Collect all locations
  const locations = [];

  days.forEach((day) => {
    locations.push(day.morning.location);
    locations.push(day.afternoon.location);
    locations.push(day.evening.location);
  });

  // Default center (safe fallback)
  const center = [48.8566, 2.3522]; // Paris default

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Map View</h2>

      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <Marker key={index} position={center}>
            <Popup>{location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
