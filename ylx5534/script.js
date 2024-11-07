// 替换之前的鼠标移动效果代码
document.addEventListener('mousemove', function(e) {
    const background = document.querySelector('.background');
    const cursorBall = document.querySelector('.cursor-ball');
    
    // 背景视差效果
    const xOffset = (e.clientX - window.innerWidth / 2) / 30;
    const yOffset = (e.clientY - window.innerHeight / 2) / 30;
    background.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    
    // 小球跟随效果
    cursorBall.style.left = e.clientX - 10 + 'px';  // 10是小球半径
    cursorBall.style.top = e.clientY - 10 + 'px';
});

// 添加鼠标进入/离开页面时的小球显示控制
document.addEventListener('mouseenter', function() {
    document.querySelector('.cursor-ball').style.display = 'block';
});

document.addEventListener('mouseleave', function() {
    document.querySelector('.cursor-ball').style.display = 'none';
});

// 添加平滑过渡
document.querySelector('.stars').style.transition = 'transform 0.2s ease-out';
document.querySelector('.twinkling').style.transition = 'transform 0.2s ease-out';

// 修改轮播图片数组
const swiperImages = [
    {
        src: 'imgs/微信图片_20241105101134.jpg',
        alt: '健身照片1'
    },
    {
        src: 'imgs/微信图片_20241105101117.jpg',
        alt: '健身照片2'
    },
    {
        src: 'imgs/微信图片_20241105101128.jpg',
        alt: '健身照片3'
    }
];

// 修改 Swiper 初始化部分
document.addEventListener('DOMContentLoaded', function() {
    // 动态添加轮播图片
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperImages.forEach(image => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        swiperWrapper.appendChild(slide);
    });

    // 初始化Swiper轮播
    const swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        },
    });
});

// AI对话模态框控制
const modal = document.getElementById('ai-modal');
const closeBtn = document.querySelector('.close');

function openAIChat() {
    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// 返回顶部按钮
const backToTopButton = document.getElementById('back-to-top');

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};

backToTopButton.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// AI对话功能
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.onclick = function() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        // 这里添加AI响应逻辑
        setTimeout(() => {
            addMessage('这是一个AI助手的示例回复');
        }, 1000);
    }
};

userInput.onkeypress = function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendButton.click();
    }
};

// 在文件末尾添加 QQ 图标相关功能
function toggleQRCode(event) {
    const popup = document.querySelector('.qr-popup');
    popup.classList.toggle('show');
    
    // 创建点击波纹效果
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const icon = event.currentTarget;
    const rect = icon.getBoundingClientRect();
    
    // 设置波纹位置
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    icon.appendChild(ripple);
    
    // 移除波纹元素
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 点击其他地方关闭二维码
document.addEventListener('click', function(event) {
    const qqContainer = document.querySelector('.qq-container');
    const popup = document.querySelector('.qr-popup');
    
    if (!qqContainer.contains(event.target) && popup.classList.contains('show')) {
        popup.classList.remove('show');
    }
}); 