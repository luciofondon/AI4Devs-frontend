import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { KanbanColumn } from '../components/KanbanColumn';
import { positionService, PositionInterviewFlow, Candidate } from '../services/positionService';
import { ArrowLeft } from 'react-bootstrap-icons';

export const Position: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [positionData, setPositionData] = useState<PositionInterviewFlow | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const [flowData, candidatesData] = await Promise.all([
          positionService.getInterviewFlow(id),
          positionService.getCandidates(id)
        ]);
        setPositionData(flowData);
        setCandidates(candidatesData);
      } catch (err) {
        setError('Error al cargar los datos de la posición');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const candidateId = active.id.toString().split('-')[0];
    const newStepId = over.id.toString();

    try {
      await positionService.updateCandidateStage(
        candidateId,
        candidateId, // Asumiendo que applicationId es el mismo que candidateId
        newStepId
      );

      // Actualizar el estado local
      setCandidates(prevCandidates =>
        prevCandidates.map(candidate =>
          candidate.fullName === candidateId
            ? {
                ...candidate,
                currentInterviewStep: positionData?.interviewFlow.interviewSteps.find(
                  step => step.id.toString() === newStepId
                )?.name || candidate.currentInterviewStep
              }
            : candidate
        )
      );
    } catch (err) {
      console.error('Error al actualizar la fase del candidato:', err);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!positionData) return <div className="p-4">No se encontró la posición</div>;

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{positionData.positionName}</h1>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex overflow-x-auto pb-4">
          {positionData.interviewFlow.interviewSteps
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map(step => (
              <KanbanColumn
                key={step.id}
                step={step}
                candidates={candidates}
              />
            ))}
        </div>
      </DndContext>
    </div>
  );
}; 