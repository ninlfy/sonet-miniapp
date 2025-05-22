const tg = window.Telegram.WebApp;
tg.expand();  // Растягиваем Mini App на весь экран

// Элементы страницы
const authScreen = document.getElementById('auth-screen');
const mainMenu = document.getElementById('main-menu');
const authCodeInput = document.getElementById('auth-code');
const submitCodeBtn = document.getElementById('submit-code');
const userNameSpan = document.getElementById('user-name');

// Проверяем, авторизован ли пользователь
const savedUser = localStorage.getItem('tg_user');
if (savedUser) {
    const user = JSON.parse(savedUser);
    showMainMenu(user);
}

// Обработчик кнопки "Продолжить"
submitCodeBtn.addEventListener('click', async () => {
    const code = authCodeInput.value.trim();
    if (!code) {
        tg.showAlert('Введите код!');
        return;
    }

    tg.showAlert('Проверяем код...');  // Уведомление в Telegram

    try {
        // Отправляем запрос к вашему API (подмените URL на свой!)
        const response = await fetch(`http://snit.i-cream.ru/wp-json/telegram-bot/v1/verify-code/${code}`);
        const data = await response.json();

        if (data.status === 'success') {
            tg.showAlert('✅ Успешно!');
            localStorage.setItem('tg_user', JSON.stringify(data.user));
            showMainMenu(data.user);
        } else {
            tg.showAlert('❌ Неверный код!');
        }
    } catch (error) {
        tg.showAlert('⚠️ Ошибка сети. Попробуйте позже.');
        console.error(error);
    }
});

// Показываем главное меню
function showMainMenu(user) {
    authScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
    userNameSpan.textContent = user.name;
}

// Обработчики кнопок меню
document.getElementById('btn-profile').addEventListener('click', () => {
    tg.showAlert('Профиль: ' + JSON.parse(localStorage.getItem('tg_user')).name);
});