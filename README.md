# market-place-backend-mongoDB
```jsx
npm i
```
## API for products
```jsx
https://m6-benchmark.herokuapp.com/product
```

## POST product method requiremnts
```jsx
{
    "name": "product name", 
    "description": "description",
    "brand": "brand name", 
    "imageUrl": "image url",
    "price": product price, 
    "category": "category"
}
```



## API for upload product image to cloudinary*
```jsx
https://m6-benchmark.herokuapp.com/product/{productId}/cover
```
* Image should be single
* If you uploading with Postman form-data name should be "cover" 

## API for product reviews
```jsx
https://m6-benchmark.herokuapp.com/product/{productId}/review
```
## POST review to product method requiremnts
```jsx
{
    "rate" : product review, max:5, min:1,
    "comment": "comment",
    "productId": "_id of the product that you want to add comment to"
}
```
