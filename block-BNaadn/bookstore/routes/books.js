var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var Author = require("../models/author");

// Get new Book form
router.get("/new", function (req, res, next) {
  res.render("newBook");
});

/* Create book. */
router.post("/", function (req, res, next) {
  req.body.category = req.body.category.trim().split(" ");

  Author.create(req.body)
    .then((author) => {
      req.body.authorId = author._id;
      Book.create(req.body)
        .then((book) => {
        // Update the author's bookId array with the book's ID
          author.books.push(book._id);
          author.save().then(() => {
            res.redirect("/books");
          });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

/* GET books listing. */
router.get("/", function (req, res, next) {
  Book.find({})
    .then((bookList) => {
      res.render("bookList", { books: bookList });
    })
    .catch((err) => {
      next(err);
    });
});

/* Find books and list. */
router.get("/find", function (req, res, next) {
  res.render("find");
});

router.post("/find", function (req, res, next) {
  let queryKey = req.body.query_key;
  let queryValue = req.body.query_value;

  if (queryKey === "title") {
    Book.find({ title: queryValue })
      .then((bookList) => {
        res.render("filteredbookList", { books: bookList });
      })
      .catch((err) => {
        next(err);
      });
  } else if (queryKey === "category") {
    Book.find({ category: queryValue })
      .then((bookList) => {
        res.render("filteredbookList", { books: bookList });
      })
      .catch((err) => {
        next(err);
      });
  } else if (queryKey === "name") {
    Author.findOne({ author_name: queryValue })
      .populate("books")
      .then((author) => {
        console.log(author);
        res.render("filteredbookList", { books: author.books });
      })
      .catch((err) => {
        next(err);
      })
  }
});

// Get Single Book Details and Comments
router.get("/:id", function (req, res, next) {
  Book.findById(req.params.id)
    .populate("authorId")
    .then((book) => {
      res.render("bookDetails", { book: book });
    })
    .catch((err) => {
      next(err);
    });
});

//Delete Book
router.get("/:id/delete", function (req, res, next) {
  Book.findByIdAndDelete(req.params.id)
    .then((deletedBook) => {
      Author.findByIdAndDelete(deletedBook.authorId)
        .then(() => {
          res.redirect("/books");
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
