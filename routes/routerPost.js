const express = require('express');
const validationRequest = require('../middlewares/validationRequest');
const auth = require("../middlewares/auth");
const { uploadImage } = require('../middlewares/uploadImage');
const postController = require('../controllers/postController');

const router = express.Router();

/**
* @swagger
* tags:
*   name: Post
*   description: Работа с созданием поста пользователя
* /post/create:
*   post:
*     summary: Создание поста пользователем
*     tags: [Post]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/postRequest'
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
*         description: Ответ при удачной загрузке поста.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Пост успешно создан
*               example:
*                 message: "Пост успешно создан"
*       400:
*         description: Файлы отсутствуют.
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
router.post("/post/create", auth, uploadImage.array("gallery", 10), validationRequest.post, postController.postCreate);

/**
* @swagger
* /post/:postId:
*   delete:
*     summary: Создание поста пользователем
*     tags: [Post]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/postRequest'
*     responses:
*       200:
*         description: Ответ при удачном удалении поста.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Пост успешно удален
*               example:
*                 message: "Пост успешно удален"
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
*       404:
*         description: Такого поста не существует.
*       500:
*         description: Что-то пошло не так...
*
*/
router.delete("/post/:postId", auth, postController.postDelete);

/**
* @swagger
* /post/info/:postId:
*   get:
*     summary: Получение данных о посте пользователя.
*     tags: [Post]
*     security:
*       - apiKeyAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/postRequest'
*     responses:
*       200:
*         description: Ответ при удачном получении данных о посте.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Данные поста успешно получены
*               example:
*                 message: "Данные поста успешно получены"
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
*       404:
*         description: Такого поста не существует.
*       500:
*         description: Что-то пошло не так...
*
*/
router.get("/post/info/:postId", auth, postController.postInfo);


module.exports = router