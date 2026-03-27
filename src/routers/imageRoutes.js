import express from 'express';
import { saveImage, getImage, updateImage, deleteImage } from '../controllers/imageController.js';

const router = express.Router();


router.post('/', saveImage);


router.get('/:firebaseId', getImage);

router.put('/:firebaseId', updateImage);

router.delete('/:firebaseId', deleteImage);

export default router;