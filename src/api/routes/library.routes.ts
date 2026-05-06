import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import { LibraryHttpController } from '@controllers/LibraryHttpController';

const router = Router();
const controller = new LibraryHttpController();

router.get('/all', requireAuth, controller.getAll);

// Game actions — :userGameId is the user_games.id (exposed as userGameId in GET /all)
router.post('/:userGameId/launch',    requireAuth, controller.launchGame);
router.post('/:userGameId/install',   requireAuth, controller.installGame);
router.post('/:userGameId/uninstall', requireAuth, controller.uninstallGame);

export default router;