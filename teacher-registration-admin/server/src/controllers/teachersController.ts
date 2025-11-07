import { Request, Response } from 'express';
import TeacherService from '../services/teacherService';

class TeachersController {
    async getAllTeachers(req: Request, res: Response): Promise<void> {
        try {
            const teachers = await TeacherService.getAllTeachers();
            res.status(200).json(teachers);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving teachers', error });
        }
    }

    async getTeacherById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const teacher = await TeacherService.getTeacherById(id);
            if (teacher) {
                res.status(200).json(teacher);
            } else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving teacher', error });
        }
    }

    async createTeacher(req: Request, res: Response): Promise<void> {
        try {
            const newTeacher = await TeacherService.createTeacher(req.body);
            res.status(201).json(newTeacher);
        } catch (error) {
            res.status(500).json({ message: 'Error creating teacher', error });
        }
    }

    async updateTeacher(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const updatedTeacher = await TeacherService.updateTeacher(id, req.body);
            if (updatedTeacher) {
                res.status(200).json(updatedTeacher);
            } else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating teacher', error });
        }
    }

    async deleteTeacher(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deleted = await TeacherService.deleteTeacher(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Teacher not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting teacher', error });
        }
    }
}

export default new TeachersController();