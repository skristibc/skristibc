import mongoose from "mongoose";
import {MenuItem} from "@/models/MenuItem";
import {Category} from "@/models/Category";

export async function GET(req) {
  try {
    mongoose.connect(process.env.MONGO_URL);

    const { searchParams } = new URL(req.url);
    const categoryName = searchParams.get("category");
    const search = searchParams.get("search");

    let query = {};

    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      
      if (category) {
        query.category = category._id;
      } else {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const cars = await MenuItem.find(query);

    return new Response(JSON.stringify(cars), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Hiba történt az autók lekérdezésekor:", error.message);
    return new Response(
      JSON.stringify({ message: "Hiba történt az autók lekérdezésekor." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

