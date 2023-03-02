import { Router } from 'express';
import { VendorController } from '../controllers/vendor.controller';

const router = Router();

router.post('/update-one-apparel', VendorController.updateOneApparel);
router.post('/update-multiple-apparels', VendorController.updateMultipleApparels);


export default router;