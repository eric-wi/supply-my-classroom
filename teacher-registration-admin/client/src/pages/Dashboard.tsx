import React, { useEffect } from 'react';
import { useTeachers } from '../hooks/useTeachers';
import TeacherList from '../components/TeacherList';
import TeacherForm from '../components/TeacherForm';

const Dashboard: React.FC = () => {
    const { teachers, fetchTeachers } = useTeachers();

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    return (
        <div>
            <h1>Teacher Registrations</h1>
            <TeacherForm />
            <TeacherList teachers={teachers} />
        </div>
    );
};

export default Dashboard;