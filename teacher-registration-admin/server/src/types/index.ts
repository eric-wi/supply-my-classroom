export interface Teacher {
    id: string;
    name: string;
    subject: string;
    email: string;
    phone: string;
    registrationDate: Date;
}

export interface TeacherFormValues {
    name: string;
    subject: string;
    email: string;
    phone: string;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}