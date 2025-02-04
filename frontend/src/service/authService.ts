import { FinancialDataTypes } from "@/types/types";
import axiosInstance from "./axiosInstance";

export const loginService = async (email: string, password: string, phoneNumber: string) => {
  const response = await axiosInstance.post("/api/user/login", {
    email,
    password,
    phoneNumber
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
  const response = await axiosInstance.post("/api/user/add-phone", {
    userId,
    phoneNumber,
  });

  return response.data;
};

export const verifyPhoneNo = async (userId: string, otp: string) => {
  const response = await axiosInstance.post("/api/user/verify-phone", {
    userId,
    otp,
  });

  return response.data;
};

export const getAllSellersWithUserRegistration = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get("/api/user/get-all-sellers-user-register", {
    headers :{
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const addSellers = async (companyIds :string[]) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post("/api/user/add-sellers",{
    companyIds
  }, {
    headers :{
      Authorization: `Bearer ${token}`
    }
  }, 
  );

  return response.data;
};

export const getUserPortfolio = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get("/api/user/get-user-portfolio",{
    headers :{
      Authorization: `Bearer ${token}`
    }
  }, 
  );

  return response.data;
}

export const transactionByFinko = async (data:FinancialDataTypes) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post("/api/user/transaction/by-finko", data, {
    headers :{
      Authorization: `Bearer ${token}`
    }
  })

  return response.data;
}
export const getAllSeller = async() => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get("/api/user/get-all-sellers", {
    headers :{
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}