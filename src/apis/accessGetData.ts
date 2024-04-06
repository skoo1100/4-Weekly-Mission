//import { useAsync as UseAsync } from '@/apis/useAsync';
import { axiosInstance } from '@/apis/axiosInstance';

export const accessGetData = async (type: string, accessToken: string | null) => {
  try {
    const response = await axiosInstance.get(type, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
