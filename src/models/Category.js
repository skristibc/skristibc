const { model, models, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

export const Category = models?.Category || model("Category", CategorySchema);
