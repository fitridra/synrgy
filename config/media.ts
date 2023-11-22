import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

class Media {
  private _upload;
  private _storage;
  constructor() {
    this._upload = multer({ storage: multer.memoryStorage() });
    this._storage = cloudinary.config({
        cloud_name: "ddzo9brne",
        api_key: "626391368456686",
        api_secret: "MIJVH1OhAZngYr6oRSYGlm5i6vc",
    });
  }

  get upload() {
    return this._upload;
  }

  get storage() {
    return this._storage;
  }
}

export default new Media();
