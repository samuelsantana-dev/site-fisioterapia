export interface User {
    id?: string;
    user_id?: string;
    name: string;
    birth: string;
    email: string;
    phone: string;
    gender: string;
    admin?: boolean;
    profile_pic?: string | undefined | null;
    diagnosis: string;
    exercise_list?: string[];
    signed_eula?: boolean;
    password: string;
}

export interface Exercise {
    exercise_id?: string;
    muscle_group: string;
    muscle: string;
    difficulty: number;
    name: string;
    reps: number;
    description: string;
    instructions?: [];
    file: string;
}