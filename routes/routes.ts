import { Request, Router } from "express";
import Model from "../model/model";
import { Error, MongooseOptions, QueryOptions } from "mongoose";
import { IPost } from "../types/post";
import { TypedRequest } from "../types/core/express";

export const router = Router();

//Post Method
router.post("/post", async (req: TypedRequest<IPost>, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message: message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message: message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ message: message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req: TypedRequest<IPost>, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options: QueryOptions = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message: message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);

    res.status(200).send(`Document with name: ${data?.name} has been deleted`);
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message: message });
  }
});
