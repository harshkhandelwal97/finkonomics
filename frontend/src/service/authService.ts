import axiosInstance from "./axiosInstance";

export const loginService = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const registerService = async (
  fullname: string,
  email: string,
  password: string
) => {
  const response = await axiosInstance.post("/api/user/register", {
    fullname,
    email,
    password,
  });

  return response.data;
};

export const verifyEmail = async (userId: string, otp: string) => {
  const response = await axiosInstance.post("/api/user/verify-email", {
    userId,
    otp,
  });

  return response.data;
};

export const registerPhoneNo = async (userId: string, phoneNumber: string) => {
  const response = await axiosInstance.post("/api/user/verify-email", {
    userId,
    phoneNumber,
  });

  return response.data;
};

export const verifyPhoneNo = async (userId: string, otp: string) => {
  const response = await axiosInstance.post("/api/user/verify-email", {
    userId,
    otp,
  });

  return response.data;
};