SELECT products.productId,products.productTitle, userHistory.bookfrom, userHistory.bookto,userHistory.cstatus
FROM products
RIGHT JOIN userHistory
ON products.productId = userHistory.productId WHERE userHistory.userID = @userID