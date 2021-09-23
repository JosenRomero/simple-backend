import multer from "multer";
import { v4 as uuid } from 'uuid';
import path from 'path';

// multer wil save the photo in the uploads folder
const storage = multer.diskStorage({

    destination: 'uploads',

    filename: (req, file, callback) => {
        let  fileName = uuid() + path.extname(file.originalname);
        callback(null, fileName);
    }

});

const multerConfig = multer({storage});

export default multerConfig;