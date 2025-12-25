## Travel Itinerary Planner with AI

# Overview
This project is a Travel Itinerary Planner built using the MERN stack and Google Gemini API. It allows users to enter travel details such as destination, dates, and preferences, and generates a day-wise travel itinerary using AI. The generated itinerary is stored in MongoDB, displayed in the UI, visualized on a map,and can be exported as a PDF.The focus of this project is on clean architecture, practical AI integration, and clear data flow, rather than heavy UI design or overengineering.

# Features
• React UI to input travel destination, dates, and preferences
• AI-powered itinerary generation using Google Gemini
• User profiles and itineraries stored in MongoDB
• Day-wise itinerary display
• Map view using Leaflet
• Multi-page PDF export of the itinerary

# Tech Stack
Frontend 
• React (Vite)
• Axios
• Leaflet / React-Leaflet
• jsPDF & html2canvas

Backend
• Node.js
• Express.js
• MongoDB with Mongoose
• Google Gemini API

# Project Structure
travel-itinerary-planner/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── itineraryController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Itinerary.js
│   ├── routes/
│   │   └── itineraryRoutes.js
│   ├── services/
│   │   └── geminiService.js
│   ├── app.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItineraryForm.jsx
│   │   │   ├── ItineraryView.jsx
│   │   │   ├── MapView.jsx
│   │   │   └── ExportPDF.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md

# AI Integration
The backend integrates Google Gemini API to generate travel itineraries. A carefully designed prompt
ensures the AI returns structured JSON output, making it easy to:

• Store in MongoDB
• Render in the frontend
• Use for map visualization
• Export as a PDF
AI logic is isolated in a dedicated service layer to keep controllers clean and maintainable.

# Map View
A map view is implemented using Leaflet to provide a visual context of the itinerary. The map focuses on displaying locations related to the itinerary without introducing complex routing or geocoding logic, keeping the solution aligned with the task scope.

# PDF Export
The itinerary can be exported as a multi-page PDF directly from the frontend. The PDF is generated from the rendered itinerary content, which keeps the backend simple and avoids unnecessary server-side processing.

# Setup Instructions
Prerequisites
• Node.js
• MongoDB (local or MongoDB Atlas)
• Google Gemini API key

# Backend Setup
cd backend
npm install

# Create a .env file inside the backend folder:
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000

# Start the backend server:
node app.js

# Frontend Setup
cd frontend
npm install
npm run dev

# The frontend will run at:
http://localhost:5173
Demo Flow
1. Enter name, destination, travel dates, and preferences
2. Click Generate Itinerary
3. View the AI-generated, day-wise itinerary
4. See itinerary locations on the map
5. Export the itinerary as a PDF

# Design Decisions
• UI kept minimal to prioritize clarity and usability
• Authentication intentionally excluded as it was out of scope
• AI output strictly controlled using structured prompts
• Frontend-based PDF generation to reduce backend complexity
• Clear separation of concerns across frontend, backend, and AI logic

# Future Improvements 
• User authentication and login
• Improved map accuracy with geocoding APIs
• Support for saving and managing multiple itineraries per user 
• Sharing and collaboration features

# Conclusion
This project demonstrates a practical approach to integrating AI into a full-stack application. The emphasis is on correctness, maintainability, and real-world engineering decisions, while staying strictly aligned with the task requirements.
