/**
 * 测测你的隐藏人格 - 应用逻辑
 * 包含页面切换、题目渲染、结果计算、星空背景等
 */

// ==================== 状态管理 ====================

let currentQuestion = 0;
let answers = [];
let featureScores = {};

// ==================== 页面切换 ====================

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageName + '-page').classList.add('active');
}

function startTest() {
    currentQuestion = 0;
    answers = [];
    featureScores = {};
    showPage('quiz');
    renderQuestion();
}

function quitQuiz() {
    showPage('home');
}

// ==================== 题目渲染 ====================

function renderQuestion() {
    const q = questions[currentQuestion];
    
    document.getElementById('current-num').textContent = currentQuestion + 1;
    document.getElementById('total-num').textContent = questions.length;
    
    const percent = Math.round(((currentQuestion + 1) / questions.length) * 100);
    document.getElementById('progress-percent').textContent = percent + '%';
    document.getElementById('progress-fill').style.width = percent + '%';
    
    document.getElementById('question-number').textContent = '第 ' + (currentQuestion + 1) + ' 题';
    document.getElementById('question-text').textContent = q.text;
    
    // 渲染选项
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const div = document.createElement('div');
        div.className = 'option-item';
        div.innerHTML = `
            <div class="option-letter">${letter}</div>
            <div class="option-text">${opt.text}</div>
        `;
        div.onclick = () => selectOption(idx);
        optionsList.appendChild(div);
    });
    
    // 更新上一题按钮
    document.getElementById('prev-btn').classList.toggle('hidden', currentQuestion === 0);
    
    // 重置下一题按钮
    document.getElementById('next-btn').classList.remove('active');
}

function selectOption(optionIndex) {
    // 如果之前已选择过该题，先扣除之前的权重
    if (answers[currentQuestion] !== undefined) {
        const prevOptionIndex = answers[currentQuestion];
        const prevWeights = questions[currentQuestion].options[prevOptionIndex].weights;
        for (const [feature, weight] of Object.entries(prevWeights)) {
            featureScores[feature] = (featureScores[feature] || 0) - weight;
        }
    }
    
    // 记录答案
    answers[currentQuestion] = optionIndex;
    
    // 更新选项样式
    document.querySelectorAll('.option-item').forEach((el, idx) => {
        el.classList.toggle('selected', idx === optionIndex);
    });
    
    // 启用下一题按钮
    document.getElementById('next-btn').classList.add('active');
    
    // 累加新的特征权重
    const q = questions[currentQuestion];
    const weights = q.options[optionIndex].weights;
    
    for (const [feature, weight] of Object.entries(weights)) {
        featureScores[feature] = (featureScores[feature] || 0) + weight;
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        
        // 恢复之前的选择
        if (answers[currentQuestion] !== undefined) {
            document.querySelectorAll('.option-item')[answers[currentQuestion]].classList.add('selected');
            document.getElementById('next-btn').classList.add('active');
        }
    }
}

function nextQuestion() {
    if (answers[currentQuestion] === undefined) return;
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResult();
    }
}

// ==================== 结果计算 ====================

function calculateResult() {
    // 方法：检查满足最多条件的人格
    let bestMatch = null;
    let bestScore = -1;
    
    for (const rule of personalityRules) {
        let matchCount = 0;
        
        for (const [feature, threshold] of Object.entries(rule.features)) {
            const score = featureScores[feature] || 0;
            
            if (score >= threshold) {
                matchCount++;
            }
        }
        
        if (matchCount > bestScore) {
            bestScore = matchCount;
            bestMatch = rule.id;
        }
    }
    
    // 如果没有匹配，取最高特征值对应的人格
    if (!bestMatch || bestScore === 0) {
        const topFeature = Object.entries(featureScores)
            .sort((a, b) => b[1] - a[1])[0];
        
        if (topFeature) {
            bestMatch = featureToPersonality[topFeature[0]] || 'awake';
        } else {
            bestMatch = 'awake';
        }
    }
    
    return personalities.find(p => p.id === bestMatch) || personalities[0];
}

function showResult() {
    const result = calculateResult();
    
    document.getElementById('result-type').textContent = '你的人格';
    document.getElementById('result-name').textContent = result.name;
    document.getElementById('result-description').textContent = result.description;
    
    const tagsContainer = document.getElementById('result-tags');
    tagsContainer.innerHTML = result.tags.map(tag => 
        `<span class="result-tag">${tag}</span>`
    ).join('');
    
    showPage('results');
}

// ==================== 星空背景 ====================

function initStarBackground() {
    const canvas = document.getElementById('star-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const stars = [];
    const numStars = 200;
    
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // 绘制星星
        stars.forEach(star => {
            star.alpha += star.twinkleSpeed;
            if (star.alpha > 1 || star.alpha < 0.2) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }
            
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });
        
        // 绘制星座连线（偶尔）
        if (Math.random() < 0.01) {
            const idx1 = Math.floor(Math.random() * stars.length);
            const idx2 = (idx1 + 5) % stars.length;
            
            ctx.beginPath();
            ctx.moveTo(stars[idx1].x, stars[idx1].y);
            ctx.lineTo(stars[idx2].x, stars[idx2].y);
            ctx.strokeStyle = 'rgba(107, 76, 230, 0.2)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
    
    // 窗口大小调整
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
}

// ==================== 初始化 ====================

window.onload = function() {
    initStarBackground();
};
