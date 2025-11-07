import { Router } from 'express';
import TeachersController from '../controllers/teachersController';

const router = Router();
const teachersController = new TeachersController();

router.get('/', teachersController.getAllTeachers);
router.post('/', teachersController.createTeacher);
router.get('/:id', teachersController.getTeacherById);
router.put('/:id', teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);

export default router;