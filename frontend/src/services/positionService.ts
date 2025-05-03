import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface InterviewStep {
  id: number;
  interviewFlowId: number;
  interviewTypeId: number;
  name: string;
  orderIndex: number;
}

export interface InterviewFlow {
  id: number;
  description: string;
  interviewSteps: InterviewStep[];
}

export interface PositionInterviewFlow {
  positionName: string;
  interviewFlow: InterviewFlow;
}

export interface Candidate {
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
}

const handleError = (error: any) => {
  console.error('API Error:', error);
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
  }
  throw error;
};

export const positionService = {
  getInterviewFlow: async (positionId: string): Promise<PositionInterviewFlow> => {
    try {
      console.log(`Fetching interview flow for position ${positionId}`);
      const response = await axios.get(`${API_URL}/positions/${positionId}/interviewFlow`);
      console.log('Interview flow response:', response.data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getCandidates: async (positionId: string): Promise<Candidate[]> => {
    try {
      console.log(`Fetching candidates for position ${positionId}`);
      const response = await axios.get(`${API_URL}/positions/${positionId}/candidates`);
      console.log('Candidates response:', response.data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateCandidateStage: async (candidateId: string, applicationId: string, newInterviewStep: string) => {
    try {
      console.log(`Updating candidate ${candidateId} stage to ${newInterviewStep}`);
      const response = await axios.put(`${API_URL}/candidates/${candidateId}/stage`, {
        applicationId,
        currentInterviewStep: newInterviewStep
      });
      console.log('Update stage response:', response.data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}; 