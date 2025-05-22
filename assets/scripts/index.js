const tg = window.Telegram.WebApp;
tg.expand();  // Растягиваем Mini App на весь экран

// Элементы
const authScreen = document.getElementById('auth-screen');
const authCodeInput = document.getElementById('auth-code');
const submitCodeBtn = document.getElementById('submit-code');

// Обработчик кнопки "Продолжить"
submitCodeBtn.addEventListener('click', async () => {
    const code = authCodeInput.value.trim();
    
    if (!code) {
        alert('Введите код!'); // Временная замена tg.showAlert()
        return;
    }

    console.log('Отправляем код:', code); // Логируем для отладки

    try {
        // Временный прокси для обхода CORS (удалите после настройки сервера)
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = `http://snit.i-cream.ru/wp-json/telegram-bot/v1/verify-code/${code}`;
        
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        console.log('Ответ API:', data); // Смотрим ответ сервера

        if (data.status === 'success') {
            alert('✅ Успешная авторизация!'); // Временное уведомление
            localStorage.setItem('tg_user', JSON.stringify(data.user));
            window.location.reload(); // Перезагружаем страницу
        } else {
            alert('❌ Неверный код!');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('⚠️ Ошибка сети. Проверьте консоль (F12).');
    }
});