const express = require('express');
const userController = require('../controllers/userController');
const validationRequest = require('../middlewares/validationRequest');
const auth = require("../middlewares/auth");
const { uploadImage } = require('../middlewares/uploadImage');
const router = express.Router();

/**
* @swagger
* tags:
*   name: User
*   description: Работа с данными пользователя
* /user/update:
*   post:
*     summary: Обновление данных пользователя
*     tags: [User]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/changePasswordRequest'
*     responses:
*       200:
*         description: Ответ при удачной смене данных.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Пароль изменён
*               example:
*                 message: "Пароль изменён"
*       401:
*         description: Токен не действительный.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/verifyTokenFailed'
*       403:
*         description: Токен обязателен.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/verifyTokenExist'
*       500:
*         description: Что-то пошло не так.. гы гы
*
*/
router.post("/user/update", auth, validationRequest.update, userController.update);

/**
* @swagger
* /user/avatar:
*   post:
*     summary: Установка пользователем аватара.
*     tags: [User]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*     responses:
*       200:
*         description: Ответ при удачной смене аватара.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Файл сохранен
*               example:
*                 message: "Файл сохранен"
*       400:
*         description: Файл пуст.
*       401:
*         description: Токен не действительный.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/verifyTokenFailed'
*       403:
*         description: Токен обязателен.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/verifyTokenExist'
*       500:
*         description: Что-то пошло не так...
*/
router.post("/user/avatar", auth, uploadImage.single("avatar"), userController.avatar);

/**
* @swagger
* /user/delete:
*   delete:
*     summary: Удаление аватара пользователя
*     tags: [User]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*     responses:
*       200:
*         description: Ответ при удачном удалении аватара.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Файл успешно удалён
*               example:
*                 message: "Файл успешно удалён"
*       401:
*         description: Токен не действительный.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/verifyTokenFailed'
*       403:
*         description: Токен обязателен.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/verifyTokenExist'
*       409:
*         description: Файл не существует.
*       500:
*         description: Что-то пошло не так...
*
*/
router.delete("/user/avatar", auth, userController.deleteAvatar);

/**
* @swagger
* /user/profile:
*   get:
*     summary: Получение данных пользователя.
*     tags: [User]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               fileName:
*                 type: array
*                 items:
*                   type: string
*                   format: binary
*     responses:
*       200:
*         description: Ответ при удачном получении данных.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errors:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       firstName:
*                         type: string
*                         description: Имя пользователя
*                       lastName:
*                         type: string
*                         description: Фамилия пользователя
*                       email:
*                         type: string
*                         description: Почта пользователя
*                       avatar:
*                         type: string
*                         description: Аватар пользователя
*                       phone:
*                         type: string
*                         description: Телефон пользователя
*                       description:
*                         type: string
*                         description: Описание пользователя
*                       latitude:
*                         type: string
*                         description: Широта местоположения пользователя
*                       longitude:
*                         type: string
*                         description: Долгота местоположения пользователя
*                       commercial:
*                         type: string
*                         description: Коммерческий статус пользователя
*               example:
*                 firstName: "Андрей"
*                 lastName: "Павлов"
*                 email: "example@gmail.com"
*                 avatar: ""
*                 phone: "+380965528451"
*                 description: "Всем хорошего дня!"
*                 latitude: "43.12543"
*                 longitude: "153.63234"
*                 commercial: "true"
*       401:
*         description: Токен не действительный.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/verifyTokenFailed'
*       403:
*         description: Токен обязателен.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/verifyTokenExist'
*       500:
*         description: Что-то пошло не так...
*
*/
router.get("/user/profile", auth, userController.profile);


module.exports = router
 