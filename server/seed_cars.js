import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/car.js";
import User from "./models/user.js";

dotenv.config();

// Updated URLs with verified/cleaner Unsplash IDs and reasonable width
const cars = [
  {
    brand: "Tesla",
    model: "Model S Plaid",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1280&auto=format&fit=crop",
    year: 2024,
    category: "Electric",
    seating_capacity: 5,
    fuel_type: "Electric",
    transmission: "Automatic",
    pricePerDay: 199,
    location: "Los Angeles, CA",
    description: "The quickest accelerating car in production today. 0-60 in 1.99s.",
    isAvaliable: true
  },
  {
    brand: "Porsche",
    model: "911 Carrera S",
    image: "https://images.unsplash.com/photo-1597687210385-e4177c98f24c?q=80&w=1280&auto=format&fit=crop",
    year: 2023,
    category: "Sports",
    seating_capacity: 2,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 350,
    location: "Miami, FL",
    description: "An icon of automotive design and engineering. Pure driving pleasure.",
    isAvaliable: true
  },
  {
    brand: "Mercedes-Benz",
    model: "G-Wagon",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1280&auto=format&fit=crop",
    year: 2023,
    category: "SUV",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 400,
    location: "New York, NY",
    description: "The ultimate status symbol. Rugged off-road capability meets supreme luxury.",
    isAvaliable: true
  },
  {
    brand: "BMW",
    model: "M4 Competition",
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1280&auto=format&fit=crop",
    year: 2024,
    category: "Coupe",
    seating_capacity: 4,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 250,
    location: "San Francisco, CA",
    description: "Precision handling and aggressive styling. The ultimate driving machine.",
    isAvaliable: true
  },
  {
    brand: "Audi",
    model: "RS e-tron GT",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1280&auto=format&fit=crop",
    year: 2023,
    category: "Electric",
    seating_capacity: 4,
    fuel_type: "Electric",
    transmission: "Automatic",
    pricePerDay: 280,
    location: "Seattle, WA",
    description: "Electric performance meets Audi's legendary Quattro all-wheel drive.",
    isAvaliable: true
  },
  {
    brand: "Rolls-Royce",
    model: "Ghost",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1280&auto=format&fit=crop",
    year: 2022,
    category: "Luxury",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 800,
    location: "Las Vegas, NV",
    description: "The pinnacle of automotive luxury. A magic carpet ride.",
    isAvaliable: true
  }
];

const seedDB = async () => {
    try {
      // Connect using the logic from db.js (appending /car-rental is safer if that's what the app uses)
      await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
      console.log("Connected to MongoDB...");
  
      // Find a user to assign the cars to
      let owner = await User.findOne({ role: "owner" });
      if (!owner) {
          owner = await User.findOne({ role: "admin" });
      }
      if (!owner) {
          owner = await User.findOne({});
      }
  
      if (!owner) {
        console.log("❌ No users found in the database. Please register a user first.");
        process.exit(1);
      }
  
      console.log(`Assigning cars to user: ${owner.name} (${owner.email}) - ID: ${owner._id}`);
  
      // IMPORTANT: Clear existing cars to avoid duplicates with broken images
      await Car.deleteMany({ owner: owner._id });
      console.log("Cleared existing cars for this user.");
  
      // Insert cars
      const carsWithOwner = cars.map(car => ({ ...car, owner: owner._id }));
      
      await Car.insertMany(carsWithOwner);
      console.log("✅ 6 Premium Cars added successfully with Updated Images!");
      
      process.exit(0);
  
    } catch (error) {
      console.error("❌ Error seeding database:", error);
      process.exit(1);
    }
  };
  
  seedDB();
