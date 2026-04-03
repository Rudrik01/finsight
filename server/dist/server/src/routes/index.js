import { Router } from 'express';
import transactionsRouter from './transactions.route';
import insightsRouter from './insights.route';
const router = Router();
router.use('/transactions', transactionsRouter);
router.use('/insights', insightsRouter);
export default router;
//# sourceMappingURL=index.js.map