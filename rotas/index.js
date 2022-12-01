const express = require('express');
const { listBooks, createBook, deleteBook, editBook } = require('../services');
const rotas = express.Router();

rotas.post('/insert', (req, res) => {
    const { title, pages } = req.body;

    const book = {
        title,
        pages
    }

    createBook(book);

    res.redirect('/');
});

rotas.get('/', async (req, res) => {
    const books = await listBooks();

    res.render('home', { books, title: 'Controle de Livros' });
});

rotas.get('/delete/:idbooks', function (req, res) {
    const { idbooks } = req.params;
    deleteBook(idbooks);

    res.redirect('/');
});

rotas.get('/edit/:idbooks?', async (req, res) => {
    const { idbooks } = req.params;
    const books = await listBooks();

    const book = books.filter(b => b.idbooks == idbooks);

    res.render('edit', { book: book, title: 'Editar Livro' });
});

rotas.post('/edit', (req, res) => {
    const { idbooks, title, pages } = req.body;

    const book = {
        idbooks,
        title,
        pages
    }

    editBook(book);

    res.redirect('/');
});


module.exports = rotas;