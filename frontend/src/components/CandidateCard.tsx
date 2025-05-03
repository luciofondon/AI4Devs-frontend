import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Candidate } from '../services/positionService';

interface CandidateCardProps {
  candidate: Candidate;
  id: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-4 rounded-lg shadow-md mb-3 cursor-move hover:shadow-lg transition-shadow"
    >
      <h3 className="font-semibold text-gray-800">{candidate.fullName}</h3>
      <div className="mt-2 flex items-center">
        <span className="text-sm text-gray-600">Puntuación:</span>
        <span className="ml-2 text-sm font-medium text-blue-600">
          {candidate.averageScore.toFixed(1)}
        </span>
      </div>
    </div>
  );
}; 