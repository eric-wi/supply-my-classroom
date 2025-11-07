export interface Teacher {
    id: number;
    name: string;
    subject: string;
    email: string;
    phone: string;
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

export type TeacherListResponse = ApiResponse<Teacher[]>;