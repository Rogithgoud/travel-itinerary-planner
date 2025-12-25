import { useState } from "react";
import { generateItinerary } from "../services/api";
import ItineraryView from "./ItineraryView";
import MapView from "./MapView";
import ExportPDF from "./ExportPDF";




function ItineraryForm() {
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    preferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await generateItinerary(formData);
      setItinerary(result);
    } catch (error) {
      alert("Failed to generate itinerary");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="card">
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div>
        <label>Destination</label>
        <input
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Preferences</label>
        <input
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Generate Itinerary</button>

      {loading && <p>Generating itinerary...</p>}
      {itinerary && <p>Itinerary generated successfully!</p>}
</form>
</div>
      {itinerary && <ItineraryView itinerary={itinerary} />}
      {itinerary && <MapView itinerary={itinerary} />}
      {itinerary && <ExportPDF />}
    </>

    
  );
}

export default ItineraryForm;
