# market-place-backend-mongoDB
```jsx
npm i
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

## POST review to product method requiremnts
```jsx
{
    "rate" : product review, max:5, min:1,
    "comment": "comment",
    "productId": "_id of the product that you want to add comment to"
}
```
