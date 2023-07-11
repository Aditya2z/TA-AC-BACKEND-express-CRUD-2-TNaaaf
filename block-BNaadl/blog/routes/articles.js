var express = require('express');
var router = express.Router();
var Article = require('../models/articles');

// Get new Article form
router.get('/new', function(req, res, next) {
    res.render("newArticleForm");
});

/* Create article. */
router.post('/', function(req, res, next) {
    Article.create(req.body).then(() => {
        res.redirect("/articles");
    }).catch((err) => {
        next(err);
    });
});

/* GET articles listing. */
router.get('/', function(req, res, next) {
    Article.find({}).then((articleList) => {
        res.render("articleList", {articles: articleList});
    }).catch((err) => {
        next(err);
    });
});

// Get Single Article Details
router.get('/:id', function(req, res, next) {
    Article.findById(req.params.id).then((article) => {
        res.render("articleDetails", {article: article});
    }).catch((err) => {
        next(err);
    });
});

// Update Article Details form
router.get('/:id/update', function(req, res, next) {
    Article.findById(req.params.id).then((article) => {
        res.render("updateArticleForm", {article: article});
    }).catch((err) => {
        next(err);
    });
});

//Update Article
router.post('/:id', function(req, res, next) {
    Article.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedArticle) => {
        res.render("articleDetails", {article: updatedArticle});
    }).catch((err) => {
        next(err);
    });
});

//Delete Article
router.get('/:id/delete', function(req, res, next) {
    Article.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/articles");
    }).catch((err) => {
        next(err);
    })
})

module.exports = router;