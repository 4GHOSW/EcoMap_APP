import {Category, Profile} from '../types/domain';
import {getEncryptStorage} from '../utils';
import axiosInstance from './axios';

type RequestUser = {
  name?: string;
  email: string;
  password: string;
};

const postSignup = async ({
  name,
  email,
  password,
}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/user/auth/eco/signup/', {
    name,
    email,
    password,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/user/auth/eco/login/', {
    email,
    password,
  });

  console.log('login');

  return data;
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get(`/user/info/carbon/`);

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.post('/user/auth/eco/refresh/', {
    refreshToken,
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/eco/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
export type {RequestUser, ResponseToken, ResponseProfile};
