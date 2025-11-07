import React, { useEffect } from 'react';
import { useTeachers } from '../hooks/useTeachers';
import { Teacher } from '../types';

const TeacherList: React.FC = () => {
    const { teachers, fetchTeachers, deleteTeacher } = useTeachers();

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            deleteTeacher(id);
        }
    };

    return (
        <div>
            <h2>Teacher List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher: Teacher) => (
                        <tr key={teacher.id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>
                                <button onClick={() => handleDelete(teacher.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherList;