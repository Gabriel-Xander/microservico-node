import Product from "../models/productModel.js";

export const showProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne(req.params);

    res.hateoas_item(product);
  } catch (err) {
    next(err);
  }
}

export const listProducts = async (req, res, next) => {
  try {
    const { _page, _size, _order, ...filter } = req.query;
    const page = parseInt(_page) || 1;
    const size = parseInt(_size) || 10;

    const offset = (page - 1) * size;

    const products = await Product
      .find(filter)
      .skip(offset)
      .limit(size)
      .sort(_order);

    const totalData = await Product.countDocuments();
    const totalPages = Math.ceil(totalData / size);

    res.hateoas_list(products, totalPages);
  } catch (err) {
    next(err);
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;

    await new Product({
      name,
      description,
      price,
      stock,
      category,
    }).save();

    res.created();
  } catch (err) {
    next(err);
  }
}

export const editProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findOneAndUpdate(req.params, {
      name,
      description,
      price,
      stock,
      category,
    }, {
      new: true,
    });

    res.hateoas_item(product);
  } catch (err) {
    next(err);
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params._id);

    res.no_content();
  } catch (err) {
    next(err);
  }
} 