# music-app-api

https://api-musics.herokuapp.com

***

### Mục lục

1.[Auth api](#Auth-api)

2.[Song api](#Song-api)

3.[Album api](#Album-api)

4.[Favorite api](#Favorite-api)

5.[Singer api](#Singer-api)

6.[Category api](#Category-api)

7.[Search api](#Search-api)

8.[User api](#User-api)

***

## Auth api 

1. Đăng nhập

>POST /api/auth/login

    account: String
    
    password: String


2. Đăng kí

>POST /api/auth/register

    fullname: String
    
    username: String
    
    email: String
    
    password: String

3. Lấy thông tin tài khoản đã đăng nhập

>GET /api/auth/getMe

Set 1 field header: "authorization": "Bearer (gắn access token vô)"


## Song api

1. Tất cả bài hát

>GET /api/songs

2. Tạo bài hát mới

>POST /api/songs

    name: String
    
    singerId: { type: Schema.Types.ObjectId, ref: "singers" }
    
    categoryId: { type: Schema.Types.ObjectId, ref: "categories" }
    
    lyrics: String,
    
    time: Number
    
    imageUrl: String
    
    releaseDate: Date
    
    songUrl: String

3. Lấy bài hát theo id

>GET /api/songs/(songId)

4. Xóa bài hát

>DELETE /api/songs/(songId)



## Album api
1. Tất cả album

>GET /api/albums

2. Tạo album mới

>POST /api/albums

    name: String,
    
    imageUrl: String,
    
    releaseDate: Date,
    
    songId: [{ type: Schema.Types.ObjectId, ref: "songs" }],
    
    mainSongId: { type: Schema.Types.ObjectId, ref: "songs" },

3. Lấy Album theo id

>GET /api/albums/(albumId)

4. Cập nhật thông tin album

>PUT /api/albums/(albumId)

5. Thêm 1 bài hát mới vào album

>PATCH /api/albums/(albumId)

## Favorite api(Cần đăng nhập-token)


Set 1 field header: "authorization": "Bearer (gắn access token vô)"

1. Lấy danh sách yêu thích

>GET /api/favorites/me

2. Thêm bài hát vào danh sách yêu thích

>POST /api/favorites/me/(songId)

3. Xoá bài hát khỏi danh sách yêu thích

>DELETE /api/favorites/me/(songId)

## Singer api

1. Tất cả ca sĩ

>GET /api/singers

2. Tạo ca sĩ mới

>POST /api/singers
    
    name: String
    
    imageUrl: String
    
    songId: [{ type: Schema.Types.ObjectId, ref: "songs" }]

3. Lấy ca sĩ theo id

>GET /api/singers/(songId)

4. Xóa bài hát

>DELETE /api/songs/(songId)

## Category api

1. Tất cả thể loại

>GET /api/categories

2. Tạo thể loại mới

>POST /api/categories

    name: { type: String, unique: true }
    
    imageUrl: String
    
    songId: [{ type: Schema.Types.ObjectId, ref: "songs" }]
    

3. Lấy thể loại theo id

>GET /api/categories/(categoryId)


## Search api

>GET /api/search?q=(search term)

Bao gồm cả search songs, singers, albums, categories

## User api (Cần token)

1. Cập nhật thông tin user

>PUT /api/user/:userId

>Request body:

    fullname: String
    
    email: String

2. Đổi mật khẩu

>PUT /api/user/:userId/change-password

>Request body:

    currentPassword: String
    
    newPassword: String
        
3. Đổi avatar

>PUT /api/user/:userId/change-avatar

>Request body: 
    
    profilePictureUrl: String
