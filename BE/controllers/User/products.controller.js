const { Op } = require("sequelize");

const { Product, Categories, Production, sequelize } = require("../../models")

const getAllProduct = async (req, res) => {



  const perPage = parseInt(req.query.perPage, 10);
  const { name } = req.query;

  console.log(name)
  const { asc } = req.query;
  const { desc } = req.query;

  const page = parseInt(req.query.page, 10) || 1;

  const index_categories = parseInt(req.query.index_categories, 10)

  const { sortbysale } = req.query
  const { dateupdate } = req.query
  console.log(name)
  const skip = ((page - 1) * perPage);

  try {
    if (!index_categories && !name && !sortbysale && !dateupdate && !asc && !desc) {

      const { count } = await Product.findAndCountAll({ offset: skip, limit: perPage })
      let totalPage = Math.ceil(count / perPage)
      const productList = await Product.findAll({ offset: skip, limit: perPage })
      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    else if (name && perPage && !index_categories && !sortbysale && !dateupdate && !asc && !desc) {

      const { count } = await Product.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        }, offset: skip, limit: perPage
      })
      let totalPage = Math.ceil(count / perPage)
      const productList = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        offset: skip, limit: perPage
      })
      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (index_categories && perPage && !name && !sortbysale && !dateupdate && !asc && !desc) {
      const { count } = await Product.findAndCountAll({
        where: {
          index_categories: {
            [Op.like]: `%${index_categories}%`
          }
        }, offset: skip, limit: perPage
      })
      let totalPage = Math.ceil(count / perPage)
      const productList = await Product.findAll({
        where: {
          index_categories: {
            [Op.like]: `%${index_categories}%`
          }
        },
        offset: skip, limit: perPage
      })
      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (index_categories && sortbysale && perPage && !dateupdate && !asc && !desc) {
      const { count } = await Product.findAndCountAll({
        where: {
          index_categories: {
            [Op.like]: `%${index_categories}%`
          },
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const productList = await Product.findAll({
        where: {
          index_categories: {
            [Op.like]: `%${index_categories}%`
          },
          discount: {
            [Op.not]: 'NO'
          }
        },
        offset: skip, limit: perPage
      })
      console.log(productList)
      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (index_categories && sortbysale && perPage && dateupdate && !asc && !desc) {
      const { count } = await Product.findAndCountAll({
        where: {
          index_categories: {
            [Op.like]: `%${index_categories}%`
          },
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where discount!='No'&& index_categories=${index_categories}
      ORDER BY updatedAt DESC
      limit ${perPage} offset ${skip}`)


      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (index_categories && sortbysale && perPage && dateupdate && asc && !desc) {
      const { count } = await Product.findAndCountAll({
        where: {
          index_categories: {
            [Op.like]: `%${index_categories}%`
          },
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where discount!='No'&& index_categories=${index_categories}
   
      ORDER BY updatedAt DESC ,price ASC
      limit ${perPage} offset ${skip}`)


      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (index_categories && sortbysale && perPage && dateupdate && !asc && desc) {
      const { count } = await Product.findAndCountAll({
        where: {
          index_categories: {
            [Op.like]: `%${index_categories}%`
          },
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where discount!='No'&& index_categories=${index_categories}
   
      ORDER BY updatedAt,price DESC
      limit ${perPage} offset ${skip}`)


      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (index_categories && dateupdate && perPage && !asc && !desc && !sortbysale) {

      const { count } = await Product.findAndCountAll({
        index_categories: {
          [Op.like]: `%${index_categories}%`
        },
        order: [
          ['updatedAt', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where index_categories=${index_categories}
      ORDER BY updatedAt DESC  
      limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (dateupdate && perPage && asc && !desc && !sortbysale && index_categories) {

      const { count } = await Product.findAndCountAll({
        index_categories: {
          [Op.like]: `%${index_categories}%`
        },
        order: [
          ['updatedAt', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
    SELECT *
    FROM products
    where index_categories=${index_categories}
    ORDER BY updatedAt DESC,price ASC
    limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (dateupdate && perPage && !asc && desc && !sortbysale && index_categories) {

      const { count } = await Product.findAndCountAll({
        index_categories: {
          [Op.like]: `%${index_categories}%`
        },
        order: [
          ['updatedAt', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
  SELECT *
  FROM products
  where index_categories=${index_categories}
  ORDER BY updatedAt,price DESC
  limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (asc && perPage && !dateupdate && !desc && !sortbysale && index_categories) {

      const { count } = await Product.findAndCountAll({
        index_categories: {
          [Op.like]: `%${index_categories}%`
        },
        order: [
          ['price', 'ASC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
  SELECT *
  FROM products
  where index_categories=${index_categories}
  ORDER BY price ASC
  limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (desc && perPage && !asc && !dateupdate && !sortbysale && index_categories) {

      const { count } = await Product.findAndCountAll({
        index_categories: {
          [Op.like]: `%${index_categories}%`
        },
        order: [
          ['price', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
  SELECT *
  FROM products
  where index_categories=${index_categories}
  ORDER BY price DESC
  limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (sortbysale && perPage && !dateupdate && !asc && !desc && !index_categories) {
      const { count } = await Product.findAndCountAll({
        where: {
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const productList = await Product.findAll({
        where: {
          discount: {
            [Op.not]: 'NO'
          }
        },
        offset: skip, limit: perPage
      })
      console.log(productList)
      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (sortbysale && perPage && dateupdate && !asc && !desc && !index_categories) {
      const { count } = await Product.findAndCountAll({
        where: {
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where discount!='No'
      ORDER BY updatedAt DESC
      limit ${perPage} offset ${skip}`)


      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (sortbysale && perPage && !dateupdate && asc && !desc && !index_categories) {
      const { count } = await Product.findAndCountAll({
        where: {
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where discount!='No'
      ORDER BY price ASC
      limit ${perPage} offset ${skip}`)


      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (sortbysale && perPage && !dateupdate && !asc && desc && !index_categories) {
      const { count } = await Product.findAndCountAll({
        where: {
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where discount!='No'
      ORDER BY price DESC
      limit ${perPage} offset ${skip}`)


      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (sortbysale && perPage && dateupdate && !asc && desc && !index_categories) {
      const { count } = await Product.findAndCountAll({
        where: {
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where discount!='No'
   
      ORDER BY updatedAt,price DESC
      limit ${perPage} offset ${skip}`)


      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (sortbysale && perPage && dateupdate && asc && !desc && !index_categories) {
      const { count } = await Product.findAndCountAll({
        where: {
          discount: {
            [Op.not]: 'NO'
          }
        }, offset: skip, limit: perPage
      })
      console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      where discount!='No'
   
      ORDER BY updatedAtDESC ,price ASC
      limit ${perPage} offset ${skip}`)


      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }

    if (dateupdate && perPage && !asc && !desc && !sortbysale && !index_categories) {

      const { count } = await Product.findAndCountAll({
        order: [
          ['updatedAt', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
      SELECT *
      FROM products
      ORDER BY updatedAt DESC
      limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (dateupdate && perPage && asc && !desc && !sortbysale && !index_categories) {

      const { count } = await Product.findAndCountAll({
        order: [
          ['updatedAt', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
    SELECT *
    FROM products
    ORDER BY updatedAt DESC,price ASC
    limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (dateupdate && perPage && !asc && desc && !sortbysale && !index_categories) {

      const { count } = await Product.findAndCountAll({
        order: [
          ['updatedAt', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
  SELECT *
  FROM products
  ORDER BY updatedAt,price DESC
  limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (dateupdate && perPage && !asc && !desc && !sortbysale && !index_categories) {

      const { count } = await Product.findAndCountAll({
        order: [
          ['updatedAt', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
  SELECT *
  FROM products
  ORDER BY updatedAt,price  DESC
  limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (asc && perPage && !dateupdate && !desc && !sortbysale && !index_categories) {

      const { count } = await Product.findAndCountAll({
        order: [
          ['price', 'ASC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
    SELECT *
    FROM products
    ORDER BY price ASC
    limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }
    if (desc && perPage && !asc && !dateupdate && !sortbysale && !index_categories) {

      const { count } = await Product.findAndCountAll({
        order: [
          ['price', 'DESC'],

        ], offset: skip, limit: perPage
      })
      // res.send(count)
      //   console.log(count)
      let totalPage = Math.ceil(count / perPage)
      const [productList] = await sequelize.query(`
  SELECT *
  FROM products
  ORDER BY price DESC
  limit ${perPage} offset ${skip}`)

      if (page <= totalPage) {
        if (page === 1) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` }
          }
        } else if (page === totalPage) {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {

              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        } else {
          productList.pagination = {
            current: page,
            perPage: perPage,

            total: count,
            totalPage: totalPage,
            link: {
              link: { next: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page <= totalPage - 1 ? page + 1 : undefined}` },
              previous: `http://localhost:3000/api/v1/product?perPage=${perPage}&page=${page > 0 ? page - 1 : undefined}`
            }
          }
        }
      } else productList.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + totalPage
      }



      res.status(200).send({ data: productList, pagination: productList.pagination })
    }

  } catch (error) {
    res.status(500).send(error.message)

  }


}
const getProductPromo = async (req, res) => {
  // const { name } = req.query
  try {
    // if (name=feature) {
    const productList = await Product.findAll({
      where: {
        discount: {
          [Op.not]: "NO"
        }
      }
    })
    // if(productList){
    res.status(200).send({ status: 200, success: true, data: productList })
    //   }
    //   else{
    //     res.status(200).send("Hiện tại chưa có khuyến mãi")
    //   }

    // }
  } catch (error) {
    res.status(500).send(error.message)

  }
}
const getHotProduct = async (req, res) => {
  // const { name } = req.query
  try {
    // if (name=sale) {
    const productList = await Product.findAll({
      where: {
        feature: {
          [Op.not]: "NO"
        }
      }
    })
    if (productList) {
      res.status(200).send(productList)
    }
    else {
      res.status(400).send("Hiện tại chưa bán chạy")
    }


  } catch (error) {
    res.status(500).send(error.message)

  }
}
const getDetailProduct = async (req, res) => {
  const { id } = req.params
  try {
    const detailProduct = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Categories,
          as: "category"
        },
        {
          model: Production,
          as: "production"
        },
      ]

    })
    res.status(200).send(detailProduct)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {

  getAllProduct,
  getDetailProduct,
  getProductPromo,
  getHotProduct
}
