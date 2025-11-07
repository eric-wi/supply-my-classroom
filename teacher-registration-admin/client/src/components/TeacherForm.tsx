import React, { useEffect, useState } from 'react';
import { Teacher } from '../types';
import { createTeacher, updateTeacher } from '../services/api';

interface TeacherFormProps {
    teacher?: Teacher;
    onSave: () => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ teacher, onSave }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');

    useEffect(() => {
        if (teacher) {
            setName(teacher.name);
            setEmail(teacher.email);
            setSubject(teacher.subject);
        }
    }, [teacher]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const teacherData = { name, email, subject };

        if (teacher) {
            await updateTeacher(teacher.id, teacherData);
        } else {
            await createTeacher(teacherData);
        }

        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Subject:</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{teacher ? 'Update' : 'Add'} Teacher</button>
        </form>
    );
};

export default TeacherForm;