# FivX_Momo
## Giới thiệu
Phần mềm đươc dùng để gợi ý khách hàng tiếp tục sử dụng các sản phẩm, dịch vụ khác có hỗ trợ thanh toán Momo sau khi khách hàng lựa chọn thanh toán thông qua Momo.
## Luồng nghiệp vụ
Khi khởi động, phần mềm sẽ xác thực người dùng đã đăng nhập chưa. Nếu chưa đăng nhập sẽ điều hướng về màn hình Đăng nhập, hoặc nếu đã đăng nhập sẽ điều hướng về màn hình Home.

![login](https://user-images.githubusercontent.com/43350564/66131655-03e11200-e61e-11e9-8ba5-4112e5f004d5.gif)

### Màn hình đăng nhập
Khi người dùng nhập Tên đăng nhập và mật khẩu, hệ thống đã kiểm tra tên đăng nhập và mật khẩu có trùng khớp thông tin lưu trong hệ thống hay không. Nếu trùng khớp, hệ thống sẽ lưu thông tin người dùng vào AsyncStorage và điều hướng về màn hình Home. Nếu không sẽ hiện thông báo "Tên đăng nhập hoặc mật khẩu không đúng".

![login screen](https://user-images.githubusercontent.com/43350564/66131927-7225d480-e61e-11e9-9526-209494f92e0a.gif)
![login screen error](https://user-images.githubusercontent.com/43350564/66132344-1c9df780-e61f-11e9-9641-798eedce6290.gif)

### Màn hình Home
Khi vừa được điều hướng qua màn hình Home, người dùng sẽ thấy 2 tab Xu Hướng Chung và Dành Cho Bạn.

![All](https://user-images.githubusercontent.com/43350564/66132912-03e21180-e620-11e9-8b4d-1bb5d9fa963d.gif)
![Personal](https://user-images.githubusercontent.com/43350564/66132852-e7de7000-e61f-11e9-95df-505ebf8b526e.gif)

#### Tab Xu Hướng Chung 
Sẽ hiển thị danh sách các Danh mục Dịch vụ cho người dùng chọn. Khi chọn, người dùng sẽ được lựa chọn các gợi ý theo yêu cầu:
Giá thấp đến cao, Gần bạn và Hot.

![XuHuongChung](https://user-images.githubusercontent.com/43350564/66133585-1f99e780-e621-11e9-8053-e729dddc3be9.gif)

#### Tab Dành Cho Bạn
Sẽ hiển thị danh sách các cửa hàng đươc hệ thống gợi ý dựa trên thói quen mua sắm và phân tích lịch sử giao dịch của khác hàng.

![personalTab](https://user-images.githubusercontent.com/43350564/66133997-cc746480-e621-11e9-98fe-f7a1987289c5.gif)

### Màn hình Ưa Thích
Sẽ hiển thị danh sách các cửa hàng người dùng đã nhấn nút "Ưa thích" và được hệ thống ghi lại.

![like](https://user-images.githubusercontent.com/43350564/66134262-3ee54480-e622-11e9-8945-8dd8685a85d9.gif)

### Màn hình Cá nhân
Sẽ hiển thị thông tin người dùng và nút đăng xuất.

![account](https://user-images.githubusercontent.com/43350564/66134490-9be0fa80-e622-11e9-80e8-52b652b3ab0e.gif)
