import { getStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';

export const moveStageHandler = (userId, payload) => {
  const { stages } = getGameAssets();
  const stageData = stages.data;
  const userStages = getStage(userId);

  // 현재 스테이지 정보 찾기
  const currentStageData = stageData.find((stage) => stage.id === payload.currentStage);
  const targetStageData = stageData.find((stage) => stage.id === payload.targetStage);

  if (!currentStageData || !targetStageData) {
    return { status: 'fail', message: 'Invalid stage transition' };
  }

  // 스테이지 순서 확인
  const currentIndex = stageData.indexOf(currentStageData);
  const targetIndex = stageData.indexOf(targetStageData);

  if (targetIndex !== currentIndex + 1) {
    return { status: 'fail', message: 'Invalid stage sequence' };
  }

  // 스테이지 변경
  const serverTime = Date.now();
  setStage(userId, payload.targetStage, serverTime);

  return {
    status: 'success',
    data: {
      stage: payload.targetStage,
      score: targetStageData.score,
    },
  };
};
