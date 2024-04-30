interface User {
    id?: string;
    name: string;
    birth: string;
    email: string;
    phone: string;
    gender: string;
    admin?: boolean;
    profile_pic?: string | undefined;
    diagnosis: string;
    exercise_list?: string[];
    signed_eula?: boolean;
    password: string;
  }

export default User;