SELECT UH.*, P.imagepath, P.productTitle, U.username, U.mobile
FROM [dbo].[userHistory] UH
INNER JOIN products P ON UH.productId = P.productId
INNER JOIN Users U ON UH.userid = u.id