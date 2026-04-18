import axios from "axios";
import { baseURL } from "../../utils/constants/constants";
import { organizationEP } from "../../utils/config/config";

export const RemoveFramework = async (orgId, frameworkId) => {
  try {
    const accessToken = localStorage.getItem("token");
    const response = await axios({
      method: "delete",
      url: `${baseURL}${organizationEP}/${orgId}/removeFramework/${frameworkId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response?.status === 200) {
      return response.data;
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
