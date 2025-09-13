import { Department } from './departments';
import { Job } from "./jobs";

export interface RegisterUserRequest {
  fullName: string;
  photoUrl: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  password: string;
  confirmedPassword: string;
  jobId: number;
  departmentId: number;
}

export interface UpdateUserRequest {
  id: number;
  fullName: string;
  photoUrl: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  jobId: number;
  departmentId: number;
}

export interface User {
  id: number;
  fullName: string;
  photoUrl: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  age: number;
  job: Job;
  department: Department;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: Date;
  expiredIn: number;
  userId: number;
}
