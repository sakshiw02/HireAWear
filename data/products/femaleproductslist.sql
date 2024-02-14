SELECT TOP (1000) [productId]
      ,[productTitle]
      ,[productDescription]
      ,[imagepath]
      ,[category]
      ,[size]
      ,[price]
      ,[uploadedBy]
      ,[gender]
  FROM [Wear].[dbo].[products]
  WHERE gender = 'Female'
  ORDER BY productId DESC