 const paginationProduct=()=>{
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

 }
 module.exports={
    paginationProduct
 }