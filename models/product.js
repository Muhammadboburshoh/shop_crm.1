const { row, rows } = require('../utils/db');

module.exports = class Product {
  constructor(
    prodId,
    prodItemId,
    name,
    barcode,
    count,
    original_price,
    sale_price,
    description,
    userId
  ) {
    this.prodId = prodId;
    this.prodItemId = prodItemId;
    this.name = name;
    this.barcode = barcode;
    this.count = count;
    this.original_price = original_price;
    this.sale_price = sale_price;
    this.description = description;
    this.userId = userId;
  }

  save() {
    if (this.prodId) {
      const productEditSql = `
        select update_product($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      return row(
        productEditSql,
        this.prodId,
        this.prodItemId,
        this.name,
        this.barcode,
        this.count,
        this.original_price,
        this.sale_price,
        this.description,
        this.userId
      );
    } else {
      const productAddSql = `
        select add_product($1, $2, $3, $4, $5, $6, $7)
      `;
      return row(
        productAddSql,
        this.name,
        this.barcode,
        this.count,
        this.original_price,
        this.sale_price,
        this.description,
        this.userId
      );
    }
  }

  // static fetchAllShopping(search, page, limit) {
  //   if (!search) {
  //     const allProductsSql = `
  //       select * from products_for_sale($1, $2)
  //     `;
  //     return rows(allProductsSql, page, limit);
  //   } else {
  //     const allProductsSql = `
  //       select * from searching_products_for_sale($1, $2, $3)
  //     `;
  //     return rows(allProductsSql, search, page, limit);
  //   }
  // }

  static fetchAll(search, page, limit) {
    if (!search) {
      const allProductsSql = `
        select * from all_products($1, $2)
      `;
      return rows(allProductsSql, page, limit);
    } else {
      const allProductsSql = `
        select * from searching_products($1, $2, $3)
      `;
      return rows(allProductsSql, search, page, limit);
    }
  }

  static count(search) {
    const productsCountSql = `
      select products_count($1)
    `;
    return row(productsCountSql, search);
  }

  static findById(prodId, prodItemId) {
    if (prodItemId) {
      const findProductSql = `
        select * from find_product_details($1, $2)
      `;
      return row(findProductSql, prodId, prodItemId);
    } else {
      const findProductSql = `
        select * from find_product($1)
      `;
      return row(findProductSql, prodId);
    }
  }

  static deleteById(prodId, prodItemId) {
    const deleteProductSql = `
      select delete_product($1, $2)
    `;
    return row(deleteProductSql, prodId, prodItemId);
  }
};
