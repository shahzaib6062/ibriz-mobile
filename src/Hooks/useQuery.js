import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "../contexts/sessionContext";

const api_url = "https://false-mitten-production.up.railway.app/api/v1";

export const useClientsByAgent = () => {
  const { user } = useSession();
  return useQuery({
    queryKey: ["clientsByAgent"],
    queryFn: () => {
      return axios.get(
        `${api_url}/agents/${user?.data?._id}/clients?pageNumber=1`
      );
    },
  });
};

export const useFieldAgentsBySalesAgent = () => {
  const { user } = useSession();
  return useQuery({
    queryKey: ["fieldAgentsBySalesAgent"],
    queryFn: () => {
      return axios.get(`${api_url}/agents/${user?.data?._id}/fieldAgents`);
    },
  });
};

export const useClientsOfAgent = (agentId) => {
  return useQuery({
    queryKey: ["clientsOfAgent", agentId],
    queryFn: () => {
      return axios.get(`${api_url}/agents/${agentId}/clients?pageNumber=1`);
    },
  });
};

export const useClient = (clientId) => {
  return useQuery({
    queryKey: ["client", clientId],
    queryFn: () => {
      return axios.get(`${api_url}/clients/${clientId}`);
    },
  });
};
