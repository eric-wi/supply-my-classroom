import { useEffect, useState } from 'react';
import { fetchTeachers, createTeacher, updateTeacher, deleteTeacher } from '../services/api';
import { Teacher } from '../types';

const useTeachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTeachers = async () => {
            try {
                const data = await fetchTeachers();
                setTeachers(data);
            } catch (err) {
                setError('Failed to fetch teachers');
            } finally {
                setLoading(false);
            }
        };

        loadTeachers();
    }, []);

    const addTeacher = async (teacher: Teacher) => {
        try {
            const newTeacher = await createTeacher(teacher);
            setTeachers((prev) => [...prev, newTeacher]);
        } catch (err) {
            setError('Failed to add teacher');
        }
    };

    const editTeacher = async (teacher: Teacher) => {
        try {
            const updatedTeacher = await updateTeacher(teacher);
            setTeachers((prev) => prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)));
        } catch (err) {
            setError('Failed to update teacher');
        }
    };

    const removeTeacher = async (id: number) => {
        try {
            await deleteTeacher(id);
            setTeachers((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            setError('Failed to delete teacher');
        }
    };

    return { teachers, loading, error, addTeacher, editTeacher, removeTeacher };
};

export default useTeachers;