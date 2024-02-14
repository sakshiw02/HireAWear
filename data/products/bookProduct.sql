UPDATE [dbo].[status]
SET  [availability] = @availability
    ,[bookingStatus] = @bookingStatus
    ,[bookedByUserID] = @bookedByUserID
    ,[bookedOn] = @bookedOn
    ,[bookedto] = @bookedto
WHERE [productId]=@productId

SELECT [availability]
      ,[bookingStatus]
      ,[bookedByUserID]
      ,[bookedOn]
      ,[bookedto]
  FROM [dbo].[status]
  WHERE [productId]=@productId