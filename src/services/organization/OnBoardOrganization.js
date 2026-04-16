import { organizationEP } from "../../utils/config/config";
import axiosInstance from "../../utils/axios config/axiosConfig";

export const OnBoardOrganization = async (id) => {
  const url = `${organizationEP}/${id}/onBoard`;
  try {
    const response = await axiosInstance.put(url);
    if (response?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    if (error?.response && error?.response?.data) {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 404:
          return { error: error.response?.data?.msg };
        case 500:
          return { error: error.response?.data?.msg };
        default:
          return { error: error.response?.data?.msg || "Something went wrong" };
      }
    } else if (
      error.code === "ECONNABORTED" ||
      error.message === "Network Error"
    ) {
      return { error: "Connection timed out. Please try again later." };
    }
  }
};
