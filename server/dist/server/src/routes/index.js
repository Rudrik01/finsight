import { Router } from 'express';
import transactionsRouter from './transactions.route.js';
import insightsRouter from './insights.route.js';
const router = Router();
router.use('/transactions', transactionsRouter);
router.use('/insights', insightsRouter);
export default router;
//# sourceMappingURL=index.js.map