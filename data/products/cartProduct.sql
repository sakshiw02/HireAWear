-- SELECT 
--          [productId] 
--         ,[productTitle]
--         ,[productDescription]
--         ,[imagepath]
--         ,[category]
--         ,[size]
--         ,[price]
--         ,[bookedOn] 
-- FROM [dbo].[products]
-- WHERE [cartByUserID]=@cartByUserID


SELECT products.productTitle,products.productDescription,products.imagepath,products.category,products.size,products.price
FROM products INNER JOIN status ON products.productId = status.productId WHERE status.cartByUserID = @cartByUserID