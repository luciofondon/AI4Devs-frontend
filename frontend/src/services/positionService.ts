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

export const positionService = {
  getInterviewFlow: async (positionId: string): Promise<PositionInterviewFlow> => {
    const response = await axios.get(`${API_URL}/positions/${positionId}/interviewFlow`);
    return response.data;
  },

  getCandidates: async (positionId: string): Promise<Candidate[]> => {
    const response = await axios.get(`${API_URL}/positions/${positionId}/candidates`);
    return response.data;
  },

  updateCandidateStage: async (candidateId: string, applicationId: string, newInterviewStep: string) => {
    const response = await axios.put(`${API_URL}/candidates/${candidateId}/stage`, {
      applicationId,
      currentInterviewStep: newInterviewStep
    });
    return response.data;
  }
}; 