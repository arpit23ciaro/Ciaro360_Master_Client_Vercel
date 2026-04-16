import axiosInstance from "../../utils/axios config/axiosConfig";
import { organizationEP } from "../../utils/config/config";

export const DownloadContractDetails = async (orgId, fileId) => {
  const url = `${organizationEP}/${orgId}/contractDetails/${fileId}`;
  try {
    const response = await axiosInstance.get(url, {
      responseType: "blob",
    });
    if (response?.status === 200) {
      return response;
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
