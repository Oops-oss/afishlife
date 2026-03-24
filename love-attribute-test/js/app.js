/**
 * 恋爱属性测试 - 应用逻辑
 * 状态管理、页面切换、题目渲染、评分算法
 */

// ==================== 状态管理 ====================

var AppState = {
    currentPage: 'home',
    currentQuestionIndex: 0,
    answers: [],
    dimensionScores: {
        passion: 0,
        dependence: 0,
        rationality: 0,
        romance: 0,
        independence: 0
    },
    result: null
};

// ==================== 页面切换 ====================

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(function(p) {
        p.classList.remove('active');
    });
    document.getElementById(pageName + '-page').classList.add('active');
    AppState.currentPage = pageName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startTest() {
    resetState();
    showPage('quiz');
    renderQuestion(0);
}

function quitQuiz() {
    resetState();
    showPage('home');
}

function resetState() {
    AppState.currentQuestionIndex = 0;
    AppState.answers = [];
    AppState.dimensionScores = {
        passion: 0,
        dependence: 0,
        rationality: 0,
        romance: 0,
        independence: 0
    };
    AppState.result = null;
}

// ==================== 题目渲染 ====================

function renderQuestion(index) {
    var questions = window.LOVE_TEST_DATA.questions;
    var q = questions[index];
    if (!q) return;

    var total = questions.length;

    // 更新进度
    document.getElementById('current-num').textContent = index + 1;
    document.getElementById('total-num').textContent = total;

    var percent = Math.round(((index + 1) / total) * 100);
    document.getElementById('progress-percent').textContent = percent + '%';
    document.getElementById('progress-fill').style.width = percent + '%';

    // 更新题目
    document.getElementById('question-number').textContent = '第 ' + (index + 1) + ' 题';
    document.getElementById('question-text').textContent = q.text;

    // 渲染选项
    var optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';

    q.options.forEach(function(opt, idx) {
        var letter = String.fromCharCode(65 + idx);
        var div = document.createElement('div');
        div.className = 'option-item';
        div.innerHTML = '<div class="option-letter">' + letter + '</div>' +
            '<div class="option-text">' + opt.text + '</div>';
        div.onclick = function() { selectOption(idx); };
        optionsList.appendChild(div);
    });

    // 更新上一题按钮
    document.getElementById('prev-btn').classList.toggle('hidden', index === 0);

    // 重置下一题按钮
    document.getElementById('next-btn').classList.remove('active');

    // 恢复之前的选择（prevQuestion 后当前题答案已被清除，不应再触发 selectOption）
    if (AppState.answers[index] !== undefined) {
        var selectedIdx = AppState.answers[index];
        // selectOption 会重新加分，这里只更新 UI 样式
        var optItems = document.querySelectorAll('.option-item');
        if (optItems[selectedIdx]) {
            optItems[selectedIdx].classList.add('selected');
            document.getElementById('next-btn').classList.add('active');
        }
    }
}

// ==================== 选项交互 ====================

function selectOption(optionIndex) {
    var questions = window.LOVE_TEST_DATA.questions;
    var q = questions[AppState.currentQuestionIndex];
    if (!q) return;

    // 如果之前已选择过该题，先扣除之前的权重
    if (AppState.answers[AppState.currentQuestionIndex] !== undefined) {
        var prevOptionIndex = AppState.answers[AppState.currentQuestionIndex];
        var prevWeights = q.options[prevOptionIndex].weights;
        for (var dim in prevWeights) {
            if (prevWeights.hasOwnProperty(dim)) {
                AppState.dimensionScores[dim] = (AppState.dimensionScores[dim] || 0) - prevWeights[dim];
            }
        }
    }

    // 记录答案
    AppState.answers[AppState.currentQuestionIndex] = optionIndex;

    // 更新选项样式
    document.querySelectorAll('.option-item').forEach(function(el, idx) {
        el.classList.toggle('selected', idx === optionIndex);
    });

    // 启用下一题按钮
    document.getElementById('next-btn').classList.add('active');

    // 累加新的维度分数
    var weights = q.options[optionIndex].weights;
    for (var dim in weights) {
        if (weights.hasOwnProperty(dim)) {
            AppState.dimensionScores[dim] = (AppState.dimensionScores[dim] || 0) + weights[dim];
        }
    }


}

function prevQuestion() {
    if (AppState.currentQuestionIndex > 0) {
        // 扣除当前题的分数
        var questions = window.LOVE_TEST_DATA.questions;
        var currentAnswer = AppState.answers[AppState.currentQuestionIndex];
        if (currentAnswer !== undefined) {
            var q = questions[AppState.currentQuestionIndex];
            var weights = q.options[currentAnswer].weights;
            for (var dim in weights) {
                if (weights.hasOwnProperty(dim)) {
                    AppState.dimensionScores[dim] = (AppState.dimensionScores[dim] || 0) - weights[dim];
                }
            }
            // 清除当前题答案
            AppState.answers[AppState.currentQuestionIndex] = undefined;
        }

        AppState.currentQuestionIndex--;
        renderQuestion(AppState.currentQuestionIndex);
    }
}

function nextQuestion() {
    if (AppState.answers[AppState.currentQuestionIndex] === undefined) return;

    if (AppState.currentQuestionIndex < window.LOVE_TEST_DATA.questions.length - 1) {
        AppState.currentQuestionIndex++;
        renderQuestion(AppState.currentQuestionIndex);
    } else {
        calculateResult();
        showResult();
    }
}

// ==================== 结果计算 ====================

function calculateResult() {
    var scores = AppState.dimensionScores;
    var results = window.LOVE_TEST_DATA.results;
    var dims = window.LOVE_TEST_DATA.dimensions;
    var bestMatch = null;
    var bestSimilarity = -1;

    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        
        // 计算余弦相似度
        var dotProduct = 0;
        var normUser = 0;
        var normType = 0;

        for (var j = 0; j < dims.length; j++) {
            var dim = dims[j];
            var u = scores[dim] || 0;
            var t = result.rules[dim] || 0;
            dotProduct += u * t;
            normUser += u * u;
            normType += t * t;
        }

        var similarity = 0;
        if (normUser > 0 && normType > 0) {
            similarity = dotProduct / (Math.sqrt(normUser) * Math.sqrt(normType));
        }

        if (similarity > bestSimilarity) {
            bestSimilarity = similarity;
            bestMatch = result;
        }
    }

    AppState.result = bestMatch;
    return bestMatch;
}

function showResult() {
    var result = AppState.result;
    if (!result) return;

    document.getElementById('result-emoji').textContent = result.emoji;
    document.getElementById('result-name').textContent = result.name;
    document.getElementById('result-description').textContent = result.description;

    var tagsContainer = document.getElementById('result-tags');
    tagsContainer.innerHTML = result.tags.map(function(tag) {
        return '<span class="result-tag">' + tag + '</span>';
    }).join('');

    document.getElementById('result-advice').textContent = result.advice;

    showPage('results');
}

// ==================== 键盘支持 ====================

document.addEventListener('keydown', function(e) {
    if (AppState.currentPage !== 'quiz') return;

    if (e.key === '1') {
        selectOption(0);
    } else if (e.key === '2') {
        selectOption(1);
    } else if (e.key === '3') {
        selectOption(2);
    } else if (e.key === '4') {
        selectOption(3);
    }
});

// ==================== Canvas 爱心粒子背景 ====================

function initHeartBackground() {
    var canvas = document.getElementById('heart-bg');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // 移动端检测：粒子数量适配
    var isMobile = window.innerWidth < 768;
    var numHearts = isMobile ? 50 : 100;

    // 粉色系颜色
    var colors = [
        [255, 182, 193], // 浅粉
        [255, 105, 180], // 热粉
        [255, 192, 203], // 粉红
        [255, 160, 180]  // 玫瑰
    ];

    // 创建爱心粒子
    var hearts = [];
    for (var i = 0; i < numHearts; i++) {
        var color = colors[Math.floor(Math.random() * colors.length)];
        hearts.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 12 + 8,        // 8-20px
            alpha: Math.random() * 0.5 + 0.3,    // 0.3-0.8
            speed: Math.random() * 0.6 + 0.2,    // 0.2-0.8
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            swayOffset: Math.random() * Math.PI * 2,
            swaySpeed: Math.random() * 0.02 + 0.01,
            color: color
        });
    }

    // 绘制爱心形状（bezierCurveTo）
    function drawHeart(ctx, x, y, size, alpha, rotation, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.moveTo(0, size * 0.3);
        ctx.bezierCurveTo(-size * 0.5, -size * 0.3, -size, size * 0.3, 0, size);
        ctx.bezierCurveTo(size, size * 0.3, size * 0.5, -size * 0.3, 0, size * 0.3);
        ctx.fillStyle = 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + alpha + ')';
        ctx.fill();
        ctx.restore();
    }

    var time = 0;

    function draw() {
        ctx.clearRect(0, 0, width, height);
        time += 0.016;

        for (var i = 0; i < hearts.length; i++) {
            var heart = hearts[i];

            // 缓慢向上浮动
            heart.y -= heart.speed;

            // 左右轻微摇摆（Math.sin）
            var sway = Math.sin(time * heart.swaySpeed * 60 + heart.swayOffset) * 0.5;

            // 旋转
            heart.rotation += heart.rotationSpeed;

            // 超出屏幕顶部后从底部重新出现
            if (heart.y < -heart.size * 2) {
                heart.y = height + heart.size;
                heart.x = Math.random() * width;
            }

            // 绘制爱心
            drawHeart(ctx, heart.x + sway, heart.y, heart.size, heart.alpha, heart.rotation, heart.color);
        }

        requestAnimationFrame(draw);
    }

    draw();

    // 窗口 resize 时更新 canvas 尺寸
    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
}

// 页面加载完成后初始化爱心背景
window.addEventListener('load', function() {
    initHeartBackground();
});
