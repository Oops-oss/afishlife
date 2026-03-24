/**
 * 霍兰德职业兴趣测试 - 核心逻辑
 */

(function() {
  'use strict';

  // ==================== 数据获取 ====================
  const { questions: originalQuestions, dimensions, dimensionColors } = window.HOLLAND_DATA;
  const questions = window.SHUFFLED_QUESTIONS;  // 使用打乱后的题目

  // ==================== 状态管理 ====================
  const state = {
    currentQuestion: 0,
    answers: [],
    scores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    result: null,
    currentPage: 'welcome'
  };

  // ==================== DOM 元素 ====================
  const pages = {
    welcome: document.getElementById('welcome-page'),
    test: document.getElementById('test-page'),
    result: document.getElementById('result-page')
  };

  const elements = {
    // 欢迎页
    startBtn: document.getElementById('start-btn'),
    
    // 测试页
    exitBtn: document.getElementById('exit-btn'),
    prevBtn: document.getElementById('prev-btn'),
    currentQ: document.getElementById('current-q'),
    totalQ: document.getElementById('total-q'),
    dimensionTag: document.getElementById('dimension-tag'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    progressFill: document.getElementById('progress-fill'),
    exitModal: document.getElementById('exit-modal'),
    cancelExit: document.getElementById('cancel-exit'),
    confirmExit: document.getElementById('confirm-exit'),
    
    // 结果页
    codeLetters: document.getElementById('code-letters'),
    codeDimensions: document.getElementById('code-dimensions'),
    radarChart: document.getElementById('radar-chart'),
    dimensionsScores: document.getElementById('dimensions-scores'),
    interpretationContent: document.getElementById('interpretation-content'),
    careersList: document.getElementById('careers-list'),
    restartBtn: document.getElementById('restart-btn')
  };

  // ==================== 页面切换 ====================
  function switchPage(pageName) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageName].classList.add('active');
    state.currentPage = pageName;
  }

  // ==================== 测试页渲染 ====================
  function renderQuestion() {
    const q = questions[state.currentQuestion];
    const dim = dimensions[q.dimension];
    
    // 更新题目信息
    elements.dimensionTag.textContent = `${dim.name} ${q.dimension}`;
    elements.questionText.textContent = q.text;
    elements.currentQ.textContent = state.currentQuestion + 1;
    
    // 更新进度
    const progress = ((state.currentQuestion + 1) / questions.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
    
    // 更新上一题按钮可见性
    if (state.currentQuestion > 0) {
      elements.prevBtn.classList.add('visible');
    } else {
      elements.prevBtn.classList.remove('visible');
    }
    
    // 恢复之前的选择状态
    const existingAnswer = state.answers.find(a => a.questionId === q.id);
    const optionBtns = elements.optionsContainer.querySelectorAll('.option-btn');
    
    optionBtns.forEach(btn => {
      btn.classList.remove('selected');
      if (existingAnswer && parseInt(btn.dataset.value) === existingAnswer.selectedOption) {
        btn.classList.add('selected');
      }
    });
    
    // 重新触发动画
    const card = document.querySelector('.question-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'fadeInUp 0.4s ease-out';
  }

  // ==================== 答题处理 ====================
  function handleAnswer(selectedOption, score) {
    const q = questions[state.currentQuestion];
    
    // 移除该题之前的答案（如果存在）
    const existingIndex = state.answers.findIndex(a => a.questionId === q.id);
    if (existingIndex !== -1) {
      const oldAnswer = state.answers[existingIndex];
      state.scores[oldAnswer.dimension] -= oldAnswer.score;
      state.answers.splice(existingIndex, 1);
    }
    
    // 添加新答案
    state.answers.push({
      questionId: q.id,
      selectedOption,
      score,
      dimension: q.dimension
    });
    
    // 更新得分
    state.scores[q.dimension] += score;
    
    // 高亮选中选项
    const optionBtns = elements.optionsContainer.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.value) === selectedOption) {
        btn.classList.add('selected');
      }
    });
    
    // 延迟进入下一题
    setTimeout(() => {
      if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion++;
        renderQuestion();
      } else {
        // 完成测试
        calculateResult();
        switchPage('result');
        renderResult();
      }
    }, 300);
  }

  // ==================== 上一题处理 ====================
  function goToPrevQuestion() {
    if (state.currentQuestion > 0) {
      // 移除当前题目的答案记录
      const currentQ = questions[state.currentQuestion];
      const answerIndex = state.answers.findIndex(a => a.questionId === currentQ.id);
      
      if (answerIndex !== -1) {
        const answer = state.answers[answerIndex];
        state.scores[answer.dimension] -= answer.score;
        state.answers.splice(answerIndex, 1);
      }
      
      state.currentQuestion--;
      
      // 添加滑动动画
      elements.prevBtn.classList.add('sliding');
      setTimeout(() => {
        elements.prevBtn.classList.remove('sliding');
      }, 300);
      
      renderQuestion();
    }
  }

  // ==================== 退出测试 ====================
  function showExitModal() {
    elements.exitModal.classList.add('active');
  }

  function hideExitModal() {
    elements.exitModal.classList.remove('active');
  }

  function exitTest() {
    hideExitModal();
    resetState();
    switchPage('welcome');
  }

  function resetState() {
    state.currentQuestion = 0;
    state.answers = [];
    state.scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    state.result = null;
  }

  // ==================== 结果计算 ====================
  function calculateResult() {
    // 按得分排序
    const sorted = Object.entries(state.scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    
    state.result = {
      code: sorted.map(item => item[0]).join(''),
      scores: { ...state.scores },
      topThree: sorted
    };
  }

  // ==================== 结果页渲染 ====================
  function renderResult() {
    renderHollandCode();
    renderRadarChart();
    renderDimensionScores();
    renderInterpretation();
    renderCareers();
  }

  function renderHollandCode() {
    const { code, topThree } = state.result;
    const letters = elements.codeLetters.querySelectorAll('.code-letter');
    const dimLabels = elements.codeDimensions.querySelectorAll('.code-dim');
    
    // 重置动画
    letters.forEach(l => {
      l.style.animation = 'none';
      l.offsetHeight;
    });
    dimLabels.forEach(d => {
      d.style.animation = 'none';
      d.style.opacity = '0';
    });
    
    // 设置字母
    letters.forEach((letter, index) => {
      letter.textContent = code[index];
      letter.style.animation = 'letterReveal 0.5s ease-out forwards';
      letter.style.animationDelay = `${0.2 + index * 0.2}s`;
    });
    
    // 设置维度名称
    topThree.forEach((item, index) => {
      const dim = dimensions[item[0]];
      dimLabels[index].textContent = dim.name;
      dimLabels[index].style.animation = 'fadeIn 0.3s ease-out forwards';
      dimLabels[index].style.animationDelay = `${0.3 + index * 0.2}s`;
    });
  }

  function renderRadarChart() {
    const canvas = elements.radarChart;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // 设置canvas尺寸
    const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    
    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = (size / 2) - 40;
    
    const labels = ['R', 'I', 'A', 'S', 'E', 'C'];
    const scores = labels.map(l => state.scores[l]);
    const maxScore = 20;
    
    // 清除画布
    ctx.clearRect(0, 0, size, size);
    
    // 动画参数
    let animationProgress = 0;
    const animationDuration = 1000;
    const startTime = performance.now();
    
    function drawGrid() {
      // 绘制背景六边形
      for (let level = 1; level <= 5; level++) {
        const radius = (maxRadius * level) / 5;
        ctx.beginPath();
        
        for (let i = 0; i <= 6; i++) {
          const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 + (level * 0.02)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // 绘制轴线
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + maxRadius * Math.cos(angle),
          centerY + maxRadius * Math.sin(angle)
        );
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    
    function drawLabels() {
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const x = centerX + (maxRadius + 25) * Math.cos(angle);
        const y = centerY + (maxRadius + 25) * Math.sin(angle);
        
        ctx.fillStyle = '#1a1a1a';
        ctx.fillText(labels[i], x, y);
      }
    }
    
    function drawDataShape(progress) {
      ctx.beginPath();
      
      for (let i = 0; i <= 6; i++) {
        const index = i % 6;
        const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
        const normalizedScore = (scores[index] / maxScore) * progress;
        const radius = maxRadius * normalizedScore;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      
      // 填充
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, 'rgba(255, 107, 53, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 179, 71, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // 描边
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // 绘制数据点
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const normalizedScore = (scores[i] / maxScore) * progress;
        const radius = maxRadius * normalizedScore;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = dimensionColors[labels[i]];
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    
    function animate(currentTime) {
      animationProgress = Math.min((currentTime - startTime) / animationDuration, 1);
      
      // 缓动函数
      const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
      const progress = easeOutCubic(animationProgress);
      
      ctx.clearRect(0, 0, size, size);
      drawGrid();
      drawDataShape(progress);
      drawLabels();
      
      if (animationProgress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  function renderDimensionScores() {
    const scoreItems = elements.dimensionsScores.querySelectorAll('.score-item');
    const maxScore = 20;
    
    scoreItems.forEach((item, index) => {
      const dimension = item.dataset.dimension;
      const score = state.scores[dimension];
      const percentage = (score / maxScore) * 100;
      
      const fill = item.querySelector('.score-fill');
      const value = item.querySelector('.score-value');
      
      // 延迟动画
      setTimeout(() => {
        fill.style.width = `${percentage}%`;
        value.textContent = score;
      }, 500 + index * 100);
    });
  }

  function renderInterpretation() {
    const { code, topThree } = state.result;
    const interpretationEl = elements.interpretationContent;
    
    let html = '';
    
    // 1. 主导类型详细描述
    if (topThree.length >= 1) {
      const primary = window.HOLLAND_DATA.dimensions[topThree[0][0]];
      html += `
        <div class="interpretation-block primary">
          <h4 class="block-title">主导类型：${primary.name}</h4>
          <p class="block-desc">${primary.workStyle}</p>
          <p class="block-desc"><strong>沟通风格：</strong>${primary.communication}</p>
          <div class="trait-list">
            ${primary.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
    }
    
    // 2. 你的核心优势 - grid of 6 items
    html += `
      <div class="interpretation-block">
        <h4 class="block-title">你的核心优势</h4>
        <ul class="strength-list">
          ${topThree.flatMap(item => {
            const detail = window.HOLLAND_DATA.dimensions[item[0]];
            return detail.strengths.slice(0, 2).map(s => `<li>${s}</li>`);
          }).slice(0, 6).join('')}
        </ul>
      </div>
    `;
    
    // 3. 性格组合解读
    const codeDesc = window.HOLLAND_DATA.codeDescriptions[code];
    if (codeDesc) {
      html += `
        <div class="interpretation-block combo">
          <h4 class="block-title">${codeDesc.name}</h4>
          <p class="block-desc">${codeDesc.description}</p>
          <p class="block-desc" style="margin-top:8px;">💡 ${codeDesc.suggest}</p>
        </div>
      `;
    } else {
      html += `
        <div class="interpretation-block combo">
          <h4 class="block-title">${topThree.map(t => window.HOLLAND_DATA.dimensions[t[0]].name).join('-')}组合</h4>
          <p class="block-desc">你的霍兰德代码为${code}，代表你在职业选择中偏好${topThree.map(t => window.HOLLAND_DATA.dimensions[t[0]].name).join('、')}的特质组合。</p>
        </div>
      `;
    }
    
    // 4. 发展建议 - grid of 6 items
    html += `
      <div class="interpretation-block advice">
        <h4 class="block-title">发展建议</h4>
        <ul class="advice-list">
          ${topThree.flatMap(item => {
            const detail = window.HOLLAND_DATA.dimensions[item[0]];
            return detail.development.slice(0, 2).map(d => `<li>${d}</li>`);
          }).slice(0, 6).join('')}
        </ul>
      </div>
    `;
    
    // 5. 职业发展路径
    if (topThree.length >= 1) {
      const primary = window.HOLLAND_DATA.dimensions[topThree[0][0]];
      html += `
        <div class="interpretation-block path">
          <h4 class="block-title">职业发展路径</h4>
          <p class="block-desc">${primary.careerPath}</p>
        </div>
      `;
    }
    
    interpretationEl.innerHTML = html;
  }
  
  function getGenericDescription(code) {
    const descMap = {
      'R': '实际动手', 'I': '分析研究', 'A': '创意表达',
      'S': '人际沟通', 'E': '领导管理', 'C': '规划执行'
    };
    return code.split('').map(c => descMap[c] || '').join('、');
  }

  function renderCareers() {
    const { topThree } = state.result;
    elements.careersList.innerHTML = '';
    
    // 收集职业推荐
    const careers = new Set();
    topThree.forEach((item, index) => {
      const dim = dimensions[item[0]];
      const dimCareers = dim.careers.split('、');
      dimCareers.forEach(career => careers.add(career));
    });
    
    // 限制数量
    const limitedCareers = Array.from(careers).slice(0, 8);
    
    limitedCareers.forEach((career, index) => {
      const tag = document.createElement('span');
      tag.className = 'career-tag';
      tag.textContent = career;
      tag.style.animationDelay = `${1 + index * 0.1}s`;
      elements.careersList.appendChild(tag);
    });
  }

  // ==================== 事件绑定 ====================
  function bindEvents() {
    // 欢迎页
    elements.startBtn.addEventListener('click', () => {
      resetState();
      elements.totalQ.textContent = questions.length;
      renderQuestion();
      switchPage('test');
    });
    
    // 测试页 - 选项点击
    elements.optionsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.option-btn');
      if (btn) {
        const value = parseInt(btn.dataset.value);
        handleAnswer(value, value);
      }
    });
    
    // 测试页 - 上一题
    elements.prevBtn.addEventListener('click', goToPrevQuestion);
    
    // 测试页 - 退出
    elements.exitBtn.addEventListener('click', showExitModal);
    elements.cancelExit.addEventListener('click', hideExitModal);
    elements.confirmExit.addEventListener('click', exitTest);
    
    // 点击弹窗背景关闭
    elements.exitModal.addEventListener('click', (e) => {
      if (e.target === elements.exitModal) {
        hideExitModal();
      }
    });
    
    // 结果页 - 重新测试
    elements.restartBtn.addEventListener('click', () => {
      resetState();
      switchPage('welcome');
    });
    
    // 键盘事件
    document.addEventListener('keydown', (e) => {
      if (state.currentPage === 'test') {
        if (e.key === 'ArrowLeft' && state.currentQuestion > 0) {
          goToPrevQuestion();
        } else if (e.key === '1' || e.key === '2' || e.key === '3') {
          const optionIndex = parseInt(e.key) - 1;
          const optionBtns = elements.optionsContainer.querySelectorAll('.option-btn');
          if (optionBtns[optionIndex]) {
            const btn = optionBtns[optionIndex];
            const value = parseInt(btn.dataset.value);
            handleAnswer(value, value);
          }
        } else if (e.key === 'Escape') {
          showExitModal();
        }
      }
    });
    
    // 窗口大小改变时重绘雷达图
    window.addEventListener('resize', () => {
      if (state.currentPage === 'result' && state.result) {
        renderRadarChart();
      }
    });
  }

  // ==================== 初始化 ====================
  function init() {
    elements.totalQ.textContent = questions.length;
    bindEvents();
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
