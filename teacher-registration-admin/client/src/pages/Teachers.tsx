import React, { useEffect } from 'react';
import TeacherList from '../components/TeacherList';
import TeacherForm from '../components/TeacherForm';
import { useTeachers } from '../hooks/useTeachers';

const Teachers: React.FC = () => {
    const { teachers, fetchTeachers, addTeacher, updateTeacher } = useTeachers();

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    const handleAddTeacher = (teacherData: any) => {
        addTeacher(teacherData);
    };

    const handleUpdateTeacher = (teacherId: string, updatedData: any) => {
        updateTeacher(teacherId, updatedData);
    };

    return (
        <div>
            <h1>Teacher Registrations</h1>
            <TeacherForm onSubmit={handleAddTeacher} />
            <TeacherList teachers={teachers} onUpdate={handleUpdateTeacher} />
        </div>
    );
};

export default Teachers;