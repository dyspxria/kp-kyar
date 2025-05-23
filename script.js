document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
  
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Получаем данные формы
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString()
      };
      
      // Создаем XML
      const xmlString = createXML(formData);
      
      // Сохраняем XML (в реальном проекте здесь был бы AJAX запрос на сервер)
      saveXML(xmlString, 'contact_form_' + new Date().getTime() + '.xml');
      
      // Показываем сообщение об успехе
      successMessage.style.display = 'block';
      contactForm.reset();
      
      // Скрываем сообщение через 5 секунд
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    });
    
    function createXML(data) {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <contact>
    <name>${escapeXML(data.name)}</name>
    <email>${escapeXML(data.email)}</email>
    <message>${escapeXML(data.message)}</message>
    <date>${data.date}</date>
  </contact>`;
      return xml;
    }
    
    function escapeXML(str) {
      return str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
    }
    
    function saveXML(xmlString, filename) {
      // В реальном проекте здесь должен быть AJAX запрос на сервер
      // Для демонстрации просто создаем ссылку для скачивания
      
      const blob = new Blob([xmlString], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Создаем временную ссылку для скачивания (для демонстрации)
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Убираем ссылку после скачивания
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log('XML сохранен:', xmlString);
    }
  });