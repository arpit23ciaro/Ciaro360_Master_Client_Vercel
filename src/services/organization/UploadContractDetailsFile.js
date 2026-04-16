import axios from "axios";
import { baseURL } from "../../utils/constants/constants";
import { organizationEP } from "../../utils/config/config";

export const UploadContractDetailsFile = async (orgId, files) => {
  const url = `${organizationEP}/${orgId}/contractDetails`;
  const formData = new FormData();

  files.map((file, index) => {
    formData.append(`files`, file);
  });
  const accessToken = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "post",
      url: `${baseURL}${url}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
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
