function ItineraryView({ itinerary }) {
  const { dailyPlan } = itinerary;

  return (
    <div id="itinerary-content" className="card">
      <h2>{dailyPlan.destination} Itinerary</h2>

      {dailyPlan.days.map((day) => (
        <div
          key={day.day} className="day-card"
          style={{
            marginBottom: "20px",
            padding: "12px",
            background: "#1f1f1f",
            borderRadius: "6px",
          }}
        >
          <h3>Day {day.day}</h3>

          <p>
            <strong>Morning:</strong> {day.morning.activity}  
            <br />
            <small>{day.morning.location}</small>
          </p>

          <p>
            <strong>Afternoon:</strong> {day.afternoon.activity}  
            <br />
            <small>{day.afternoon.location}</small>
          </p>

          <p>
            <strong>Evening:</strong> {day.evening.activity}  
            <br />
            <small>{day.evening.location}</small>
          </p>

          <p>
            <strong>Route Notes:</strong> {day.routeNotes}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ItineraryView;
