SELECT 
         [productId] 
        ,[productTitle]
        ,[productDescription]
        ,[imagepath]
        ,[category]
        ,[size]
        ,[price]
        ,[uploadedBy]
        ,[gender]
FROM [dbo].[products]
WHERE [productId]=@productId