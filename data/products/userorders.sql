SELECT UH.*, P.imagepath, P.productTitle 
FROM [dbo].[userHistory] UH
INNER JOIN products P ON UH.productId = P.productId
WHERE userID = @userID