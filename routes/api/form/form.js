const db = require("../../../config/knexfile.js");
const Router = require("express").Router;

function form() {
  const router = Router();

  router.get("/", async (req, res) => {
    let id = req.params.id;
    let decider = false;
    let realcar;
    if (id) {
      let car = await db
        .select("*")
        .from("cars")
        .where("cars_id", "=", id)
        .first();
      realcar = car;
      decider = true;
    } else {
      decider = false;
    }

    let title = "Add Car";
    let name, photo, price, sizes_id;
    if (decider) {
      title = "Update Car Information";
      name = realcar.name;
      photo = realcar.photo;
      price = realcar.price;
      sizes_id = realcar.sizes_id;
    }

    res.status(200).render("form", {
      title: title,
      id: id,
      name: name,
      photo: photo,
      price: price,
      sizes_id: sizes_id,
    });
  });
}

module.exports = form;
