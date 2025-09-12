const express = require('express');
const BaseController = require('./BaseController');

class SessionController extends BaseController {
    constructor() {
        super();
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/init', this.initSession.bind(this));
        this.router.get('/check', this.checkSession.bind(this));
    }

    getRouter() {
        return this.router;
    }

    /**
     * Инициализация сессии пользователя
     * GET /api/session/init
     * При первом обращении автоматически создаст новую сессию
     */
    async initSession(req, res) {
        try {
            // Если у сессии еще нет userId, создаем его
            if (!req.session.userId) {
                req.session.userId = `user_${Math.random().toString(36).substr(2, 9)}`;
                console.log('New session created:', {
                    sessionId: req.sessionID,
                    userId: req.session.userId
                });
            }

            return this.success(res, {
                sessionId: req.sessionID,
                userId: req.session.userId,
                isNew: !req.session.initialized
            });
        } catch (error) {
            console.error('Session initialization error:', error);
            return this.handleError(res, error);
        } finally {
            // Помечаем сессию как инициализированную
            if (req.session) {
                req.session.initialized = true;
            }
        }
    }

    /**
     * Проверка активной сессии
     * GET /api/session/check
     */
    async checkSession(req, res) {
        try {
            if (!req.session.userId) {
                return this.error(res, 'No active session', 401);
            }

            return this.success(res, {
                sessionId: req.sessionID, userId: req.session.userId, isAuthenticated: true
            });
        } catch (error) {
            console.error('Session check error:', error);
            return this.handleError(res, error);
        }
    }
}

module.exports = SessionController;