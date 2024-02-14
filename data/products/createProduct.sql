INSERT INTO [dbo].[products]
    (
       [productTitle]
        ,[productDescription]
        ,[imagepath]
        ,[category]
        ,[size]
        ,[price]
        ,[uploadedBy]
        ,[gender]
        -- ,[availability]
        -- ,[bookingStatus]
        -- ,[bookedByUserID]
        -- ,[bookedOn]
    )
VALUES 
    (
        @productTitle,
        @productDescription,
        @imagepath,
        @category,
        @size,
        @price,
        @uploadedBy,
        @gender
        -- @availability,
        -- @bookingStatus,
        -- @bookedByUserID,
        -- @bookedOn
    )

SELECT SCOPE_IDENTITY() AS productId