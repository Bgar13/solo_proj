const ThoughtController = require('../controllers/thought.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app) {
    app.get('/api/thoughts', authenticate, ThoughtController.getAll);
    app.post('/api/thoughts', authenticate, ThoughtController.create);
    app.get('/api/thoughts/:id', authenticate, ThoughtController.getOne);
    app.put('/api/thoughts/:id',ThoughtController.update);
    app.delete('/api/thoughts/:id',authenticate, ThoughtController.delete);
}