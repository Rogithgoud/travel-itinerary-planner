const mongoose=require('mongoose');
const ItinerarySchema=new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    preferences:{
        type:String,
    },
    dailyPlan:{
        type:Object,
        required:true
    },
},{timestamps:true

});
module.exports=mongoose.model('Itinerary',ItinerarySchema); 

//Since the itinerary is AI-generated and can evolve, I
//stored it as a structured object rather than rigid fields