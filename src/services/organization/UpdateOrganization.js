import { organizationEP } from "../../utils/config/config";
import axiosInstance from "../../utils/axios config/axiosConfig";

export const UpdateOrganization = async (id, data) => {
  const body = {
    organizationName: data?.organizationName,

    location: data?.location,
    employeeSize: data?.employeeSize,
    // frameworksSubscribed: data?.subscribeFramework?.map((item) => item?.value),
    purchaseDate: data?.onboardingDate,
    expiryDate: data?.expireDate,
  };
  const url = `${organizationEP}/${id}`;
  try {
    const response = await axiosInstance.put(url, body, {
      withCredentials: true,
    });
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
