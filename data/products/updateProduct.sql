UPDATE [dbo].[products]
SET [productTitle]=@productTitle
    ,[productDescription]=@productDescription
    ,[imagepath] = @imagepath
    ,[category] = @category
    ,[size] = @size
    ,[price] = @price
    ,[uploadedBy] = @uploadedBy
    ,[gender] = @gender
    ,[availability] = @availability
    ,[bookingStatus] = @bookingStatus
    ,[bookedByUserID] = @bookedByUserID
    ,[bookedOn] = @bookedOn
WHERE [productId]=@productId

SELECT [productId]
      ,[productTitle]
      ,[productDescription]
      ,[imagepath]
      ,[category]
      ,[size]
      ,[price]
      ,[uploadedBy]
      ,[gender]
      ,[availability]
      ,[bookingStatus]
      ,[bookedByUserID]
      ,[bookedOn]
  FROM [dbo].[products]
  WHERE [productId]=@productId