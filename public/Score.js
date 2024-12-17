import { sendEvent, getGameAssets } from '../Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  currentStage = 1000; // 초기 스테이지

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;

    // 스테이지 변경 이벤트 리스너 추가
    window.addEventListener('stageChange', (e) => {
      console.log('Stage changed to:', e.detail.stage);
      this.currentStage = e.detail.stage;
      // 필요한 경우 여기서 추가적인 스테이지 변경 처리
    });
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001;

    const assets = getGameAssets();
    if (!assets) return; // 에셋이 로드되지 않았으면 리턴

    const stages = assets.stages.data;
    const currentStageIndex = stages.findIndex((stage) => stage.id === this.currentStage);

    // 다음 스테이지가 존재하는지 확인
    if (currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1];

      // 현재 점수가 다음 스테이지의 요구 점수를 넘었는지 확인
      if (Math.floor(this.score) >= nextStage.score) {
        const currentStage = this.currentStage;
        this.currentStage = nextStage.id;

        // 서버에 스테이지 변경 이벤트 전송
        sendEvent(11, {
          currentStage: currentStage,
          targetStage: this.currentStage,
        });
      }
    }
  }

  getItem(itemId) {
    // 아이템 획득시 점수 변화
    this.score += 20;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    // 스테이지 표시 (왼쪽)
    const stageX = 25 * this.scaleRatio;
    this.ctx.fillText(`STAGE ${this.currentStage - 999}`, stageX, y); // 1000을 Stage 1로 표시하기 위해 999를 뺌

    // 기존 점수 표시 (오른쪽)
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
