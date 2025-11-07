import axios from 'axios';

const API_URL = 'http://localhost:5000/api/teachers';

export const fetchTeachers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchTeacherById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createTeacher = async (teacherData) => {
    const response = await axios.post(API_URL, teacherData);
    return response.data;
};

export const updateTeacher = async (id, teacherData) => {
    const response = await axios.put(`${API_URL}/${id}`, teacherData);
    return response.data;
};

export const deleteTeacher = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};