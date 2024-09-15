import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "../contexts/sessionContext";

const api_url = "https://ibriz-backend.up.railway.app/api/v1";

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

export const useAddClient = () => {
  const { user } = useSession();
  const token = user?.token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (client) => {
      const { data } = await axios.post(`${api_url}/clients`, client, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
    },
  });
};

export const useAgents = () => {
  const { user } = useSession();
  const token = user?.token;
  return useMutation({
    mutationFn: async (agentType) => {
      const queryKey = ["agents"];
      const { data } = await axios.get(
        `${api_url}/agents?pageNumber=1&agentType=${agentType}&fetchAssociations=${true}&showInactive=${true}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("agents");
    },
  });
};

export const usePumpsHistory = () => {
  const { user } = useSession();
  const token = user?.token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (date) => {
      const { data } = await axios.get(`${api_url}/devices?startDate=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        // queryKey: [],
      });
    },
  });
};

export const useVisitKpis = () => {
  const { user } = useSession();
  const token = user?.token;
  return useMutation({
    mutationFn: async (payload) => {
      console.log("🚀 ~ mutationFn: ~ payload:", payload)
      try {
        const response = await axios.get(`${api_url}/kpis/visits?startDate=${payload?.startDate}&endDate=${payload?.endDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.log('useVisitKpis error:', error.response.data);
        throw error;
      }
    },
  });
};

export const useVisitsAgents = () => {
  const { user } = useSession();
  const token = user?.token;
  return useMutation({
    mutationFn: async (payload) => {
      try {
        const response = await axios.get(`${api_url}/kpis/visits?startDate=${payload?.startDate}&endDate=${payload?.endDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.log('useVisitKpis error:', error.response.data);
        throw error;
      }
    },
  });
};

export const useVisitsClients = () => {  
  const { user } = useSession();
  const token = user?.token;
  return useMutation({
    mutationFn: async (payload) => {
      try {
        const response = await axios.get(`${api_url}/kpis/visits?startDate=${payload?.startDate}&endDate=${payload?.endDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.log('useVisitKpis error:', error.response.data);
        throw error;
      }
    },
  });
}


export const useAddAgent = () => {
  const { user } = useSession();
  const token = user?.token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (agent) => {
      const { data } = await axios.post(`${api_url}/agents`, agent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("agents");
    },
  });
};


export const useEditAgent = () => {
  const { user } = useSession();
  const token = user?.token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedAgent) => {
      const { data } = await axios.patch(
        `${api_url}/agents/${updatedAgent.id}`,
        updatedAgent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("agents");
    },
  });
};

export const useUpdateClient = () => {
  const { user } = useSession();
  const token = user?.token;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedClient) => {
      const { data } = await axios.patch(
        `${api_url}/clients/${updatedClient.id}`,
        updatedClient,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
    },
  });
};