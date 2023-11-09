const Router = require('express').Router;
const db = require('../../../config/knexfile.js');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;


// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'ddzo9brne',
  api_key: '626391368456686',
  api_secret: 'MIJVH1OhAZngYr6oRSYGlm5i6vc',
});

// Konfigurasi Multer untuk upload gambar
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function ApiRouterCars() {
  const router = Router();

  // List
  router.get('/', async (_, res) => {
    const data = await db.select('*').from('cars');
    res.status(200).json({
      data,
    });
  });

  // Single
  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await db.select('*').from('cars').where('cars_id', '=', id);
    res.status(200).json({
      data: data[0],
    });
  });

  // Create
  router.post('/', upload.single('photo'), async (req, res) => {
    try {
      const { name, prize, sizes_id } = req.body;
      const uniqueFileName = `car_${Date.now()}`;
      
      // Simpan buffer ke file sementara
      const tempFilePath = `/tmp/${uniqueFileName}.jpg`;
      await fs.writeFile(tempFilePath, req.file.buffer);
  
      // Upload file dari path ke Cloudinary
      const result = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'car_images',
        public_id: uniqueFileName,
        format: 'jpg',
      });
    
      await fs.unlink(tempFilePath);
  
      // Simpan data mobil ke database
      const newCar = {
        name,
        photo: result.secure_url,
        prize,
        sizes_id
      };
  
      const insertedCar = await db('cars').insert(newCar).returning('*');
  
      res.status(201).json({
        message: 'Create success!',
        data: insertedCar[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error creating car',
        error: error.message,
      });
    }
  });
  

  // Update
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
      await db('cars').where('cars_id', '=', id).update(updatedData);
      const data = await db.select('*').from('cars').where('cars_id', '=', id);
      res.status(200).json({
        message: 'Update success!',
        data: data[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error updating car',
        error: error.message,
      });
    }
  });

  // Delete
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
      await db('cars').where('cars_id', '=', id).del();
      res.status(200).json({
        message: 'Delete success!',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error deleting car',
        error: error.message,
      });
    }
  });

  return router;
}

module.exports = ApiRouterCars;
