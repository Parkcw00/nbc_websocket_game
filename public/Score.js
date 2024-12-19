import { sendEvent, getGameAssets } from '../Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  currentStage = 1000; // 초기 스테이지
  hasInitialized = false; // 초기화 여부를 추적하는 플래그 추가

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
    const assets = getGameAssets();
    if (!assets) return; // 에셋이 로드되지 않았으면 리턴

    // 현재 스테이지의 scorePerSecond 값을 찾아서 적용
    const currentStageData = assets.stages.data.find((stage) => stage.id === this.currentStage);

    if (currentStageData) {
      // deltaTime은 밀리초 단위이므로 1000으로 나누어 초 단위로 변환
      this.score += (currentStageData.scorePerSecond * deltaTime) / 1000;
    }

    // 다음 스테이지 체크
    const stages = assets.stages.data;
    const currentStageIndex = stages.findIndex((stage) => stage.id === this.currentStage);

    if (currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1];

      if (Math.floor(this.score) >= nextStage.score) {
        const currentStage = this.currentStage;
        this.currentStage = nextStage.id;

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
    // 이미 초기화된 상태라면 리턴
    if (this.hasInitialized && this.score === 0) {
      return;
    }

    this.score = 0;
    this.currentStage = 1000; // 스테이지도 초기화
    this.hasInitialized = true;

    // 게임 시작 이벤트를 서버로 전송 (handlerId: 2)
    sendEvent(2, {
      timestamp: Date.now(),
    });

    console.log('Game reset called'); // 디버깅을 위한 로그
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
