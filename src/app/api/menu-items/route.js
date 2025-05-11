import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    if(await isAdmin()){
        const menuItemDoc = await MenuItem.create(data);
        return Response.json(menuItemDoc);
    }
    else {
        return Response.json({});
    }
}

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    if (await isAdmin()){
        const {_id, ...data} = await req.json();
        await MenuItem.findByIdAndUpdate(_id, data);
    }
    return Response.json(true);
}  

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const search = url.searchParams.get('search');

  const query = {};

if (search) {
  query.$or = [
    { name: { $regex: search, $options: "i" } },
    { fuel: { $regex: search, $options: "i" } },
    { gearShift: { $regex: search, $options: "i" } },
    { age: { $regex: search, $options: "i" } },
  ];
}
  const results = await MenuItem.find(query);
  return Response.json(results);
}
export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()){
        await MenuItem.deleteOne({_id});
    }
    return Response.json(true);
  }