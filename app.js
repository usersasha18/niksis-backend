const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors())
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports 587
        auth: {
            user: 'testtest214@mail.ru', // Ваш электронный адрес
            pass: '8xVnntAjifA6fxk6uNjh' // Ваш пароль
        },
  });

// Обрабатываем POST-запрос с данными из формы
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
     // Вы можете выполнить здесь какую-либо обработку данных
    // Например, сохранить их в базу данных или отправить уведомление
    console.log(name, email, message)

    const mailOptions = {
        from: 'testtest214@mail.ru', // Отправитель
        to: 'x6rrl@yandex.ru', // Получатель
        subject: 'Просто письмо',
        text: `Сообщение от ${name} (${email}): ${message}`
      };
  
      // Отправляем письмо
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Ошибка при отправке письма:', error);
        } else {
          console.log('Письмо отправлено: ' + info.response);
        }
      });
    // Отправляем ответ на клиент с сообщением об успешной обработке
    res.status(200).json({ name, email, message });
  });
  
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });