-- SQL Script to Update Product Image URLs with local asset paths
UPDATE Products 
SET Image = 'src/assets/products/latte-art.jpg' 
WHERE ProductName LIKE N'%Latte Nghệ Thuật%';

UPDATE Products 
SET Image = 'src/assets/products/espresso.jpg' 
WHERE ProductName LIKE N'%Espresso Alchemist%';

UPDATE Products 
SET Image = 'src/assets/products/cold-brew.jpg' 
WHERE ProductName LIKE N'%Cold Brew Signature%';

UPDATE Products 
SET Image = 'src/assets/products/croissant.jpg' 
WHERE ProductName LIKE N'%Croissant Trứng Muối%';

UPDATE Products 
SET Image = 'src/assets/products/cookies.jpg' 
WHERE ProductName LIKE N'%Bánh Quy Bơ Alchemist%';

UPDATE Products 
SET Image = 'src/assets/products/peach-tea.jpg' 
WHERE ProductName LIKE N'%Trà Đào Đá Xay%';

UPDATE Products 
SET Image = 'src/assets/products/midnight-nitro.jpg' 
WHERE ProductName LIKE N'%Midnight Nitro%';

-- Verify updates
SELECT ProductId, ProductName, Image FROM Products;
