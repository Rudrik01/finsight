import { Router } from 'express';
import { getSummary, getMonthly, getCategories } from '../controllers/insights.controller.js';
const router = Router();
router.get('/summary', getSummary);
router.get('/monthly', getMonthly);
router.get('/categories', getCategories);
export default router;
//# sourceMappingURL=insights.route.js.map