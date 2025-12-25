const Itinerary = require('../models/Itinerary');
const User=require('../models/User');   

const { generateItinerary } = require('../services/geminiService');
const createItinerary = async (req, res) => {
    try {
        const { name, destination, startDate, endDate, preferences } = req.body;

        //create or reuse user profile
        let user = await User.findOne({ name });
        if (!user) {
            user= await User.create({ name, preferences });
        }
        // Generate itinerary using the gemini
        const aiResponse=await generateItinerary({
            name,
            destination,
            startDate,
            endDate,
            preferences
        });
        //parse AI JSON response
        const parsedItinerary=JSON.parse(aiResponse);
        // save itinerary to DB
        const itinerary = await Itinerary.create({
            user: user._id,
            destination,
            startDate,
            endDate,
            preferences,
            dailyPlan: parsedItinerary,
        });
        res.status(201).json(itinerary);
    } catch (error) {
        console.error('Error creating itinerary:', error);
        res.status(500).json({ message: 'Failed to generate itinerary' });
    }
};
  module.exports = {createItinerary};