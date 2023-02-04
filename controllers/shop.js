const Product = require('../models/product');
const Order = require('../models/order');

const ITEMS_PER_PAGE = 3;

exports.getProducts = async (req, res, next) => {
  const { id: userId, login: username } = req.cookies.__auth.user;
  const page = +req.query.page || 1;
  let search = req.query.search || null;
  search = search ? search.trim() : search;

  try {
    const { products_count } = await Product.count(search);
    const products = await Product.fetchAll(search, page, ITEMS_PER_PAGE);

    const orders = await Order.fetchAll(userId);

    res.render('shop/product-list', {
      pageTitle: 'Home',
      path: '/',
      username: username,
      products: products,
      orders: orders,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < products_count,
      hasPerviousPage: page > 1,
      nextPage: page + 1,
      perviousPage: page - 1,
      lastPage: Math.ceil(products_count / ITEMS_PER_PAGE),
      search: search
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postOrderProduct = async (req, res, next) => {
  const { id: userId } = req.cookies.__auth.user;
  const { prodId, prodItemId, count } = req.body;
  const { search, page } = req.query;
  const redirectUrl = search
    ? `/?page=${page}&search=${search}`
    : `/?page=${page}`;

  const order = new Order(prodId, prodItemId, count, userId);
  await order.save();
  res.redirect(redirectUrl);
};
