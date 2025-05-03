import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { CandidateCard } from './CandidateCard';
import { Candidate, InterviewStep } from '../services/positionService';

interface KanbanColumnProps {
  step: InterviewStep;
  candidates: Candidate[];
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ step, candidates }) => {
  const { setNodeRef } = useDroppable({
    id: step.id.toString(),
  });

  return (
    <div className="flex-1 min-w-[300px] bg-gray-100 rounded-lg p-4 mx-2">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">{step.name}</h2>
      <div
        ref={setNodeRef}
        className="min-h-[200px]"
      >
        {candidates
          .filter(candidate => candidate.currentInterviewStep === step.name)
          .map((candidate, index) => (
            <CandidateCard
              key={`${candidate.fullName}-${index}`}
              candidate={candidate}
              id={`${candidate.fullName}-${step.id}`}
            />
          ))}
      </div>
    </div>
  );
}; 