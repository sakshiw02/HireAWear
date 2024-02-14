  INSERT INTO [dbo].[userHistory]
           ([productId], [userID], [bookfrom], [bookto], [cstatus], [orderdate], price, deposite)
     VALUES
           (@productId, @userID, @bookfrom, @bookto, @cstatus, @orderdate, CAST((select TOP 1 price FROM products WHERE productId = @productId)AS FLOAT),@deposite);