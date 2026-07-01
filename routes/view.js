var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();



router.get('/', async function _test(req, res, next) {
  try {
    return res.render('index');
  } catch (error) {
    next(createHttpError(error));

  }
})


router.get('/login', async function _login(req, res, next) {
  try {
    return res.render('pages/authentication/login');
  } catch (error) {
    next(createHttpError(error));
  }
})


router.get('/signup', async function _signup(req, res, next) {
  try {
    return res.render('pages/authentication/signup')
  } catch (error) {
    next(createHttpError(error));
  }
})


router.get('/change-password', async function _changePassword(req, res, next) {
  try {
    return res.render('pages/authentication/change-password')
  } catch (error) {
    next(createHttpError(error));
  }
})


router.get('/forget-password', async function _forgetPassword(req, res, next) {
  try {
    return res.render('pages/authentication/forget-password')
  } catch (error) {
    next(createHttpError(error));
  }
})


router.get('/reset-password', async function _resetPassword(req, res, next) {
  try {
    if (!req.query.token) {
      throw new createHttpError(400, "password reset token is not there in query params");
    }
    return res.render('pages/authentication/reset-password', { token: req.query.token })
  } catch (error) {
    next(createHttpError(error));
  }
})


// router.get('/categories', async function listCategories(req, res, next) {
//   try {
//     const categories = await require('../controllers/category/listParentCategory.js')();
//     console.log('categories :>> ', categories);
//     return res.render('pages/categories', { categories });
//   } catch (error) {
//     next(createHttpError(error));
//   }
// })

router.get('/menu', async function menu(req, res, next) {
  try {
    const specialItems = await require('../controllers/foodItems/todaySpecial.js')();
    const categories = await require('../controllers/category/showAllCategoryWithSubCategory.js')();
    return res.render('pages/menu', { categories, specialItems });
  } catch (error) {
    next(createHttpError(error));
  }
})

router.get('/menu/:id', async function categoryMenu(req, res, next) {
  try {
    console.log(req.params);
    console.log("categoryId", req.params.id);
    const foodItems = await require('../controllers/foodItems/listFoodByCategory.js')(req.params);
    console.log("fooditems", foodItems);
    const categories = await require('../controllers/category/showAllCategoryWithSubCategory.js')();
    return res.render('pages/categoryMenu', { foodItems, categories });
  } catch (error) {
    next(createHttpError(error));
  }
})


module.exports = router;

