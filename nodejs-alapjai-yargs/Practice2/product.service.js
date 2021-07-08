const ProductService = (productApi) => {
  const products = (async () => await productApi.get())()

  const sum = async () => {
    return (await products)
      .map(({ price, count }) => price * count)
      .reduce((a, b) => (a + b), 0)
  }

  const avg = async () => {
    const totalValue = await sum()
    const totalCount = (await products)
      .map(({ count }) => count)
      .reduce((a, b) => (a + b), 0)
    return (totalValue / totalCount).toFixed(2)
  }

  const lessThan = async (count) => {
    return (await products).filter(p => p.count < count)
  }

  return {
    sum,
    avg,
    lessThan
  }
}
module.exports = ProductService
