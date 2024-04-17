import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "../contexts/sessionContext";

const api_url = "https://false-mitten-production.up.railway.app/api/v1";

export const useLogin = () => {
  const { saveUser } = useSession();
  return useMutation({
    mutationFn: (data) => {
      return axios.post(`${api_url}/agents/login`, data);
    },
    onSuccess: (data) => {
      saveUser(data.data);
    },
    onError: (error) => {
      console.error("Error occurred during login:", error);
    },
  });
};

export const useAddVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return axios.post(`${api_url}/visits`, data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clientsVisits"] });
    },
  });
};
