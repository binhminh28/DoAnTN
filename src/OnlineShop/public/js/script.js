

var app = angular.module("myShoppingList", []);
app.controller("myCtrl", function ($scope) {
    debugger;
    $scope.products = []
    if (localStorage.getItem('giohang') != null) {
        $scope.Quantity = JSON.parse(localStorage.getItem('giohang')).length

        $scope.products = JSON.parse(localStorage.getItem('giohang'));
    }
    $scope.addItem = function (item) {
        var idproduct = item.target.attributes.data.value;
        var giohang = [];
        var item = {
            _id: idproduct,
            sl: 1,
            size:item.target.attributes.size.value,
            price: item.target.attributes.money.value,
            name:item.target.attributes.name.value,
            image:item.target.attributes.image.value
        }

        if (localStorage.getItem('giohang') === null) {
            giohang.push(item);
            $scope.products.push(item);
            localStorage.setItem('giohang', JSON.stringify(giohang));
            $scope.Quantity = JSON.parse(localStorage.getItem('giohang')).length
            console.log("Them moi session")
        }
        else {
            giohang = JSON.parse(localStorage.getItem('giohang'));
            for (var i = 0; i < giohang.length; i++) {
                //console.log("Dang có: " + giohang.length)
                if (giohang[i]._id === idproduct) {
                    if(giohang[i].sl >=5){
                        alert("Shit! You buy too much. Quantity must be less than 5")
                        return;
                    }else{
                        giohang[i].sl++;
                        $scope.products[i].sl++;
                        localStorage.setItem('giohang', JSON.stringify(giohang));
                        return;
                    }
                }
            }
            giohang.push(item);
            $scope.products.push(item);
            localStorage.setItem('giohang', JSON.stringify(giohang));
            $scope.Quantity = JSON.parse(localStorage.getItem('giohang')).length
        }
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.products.splice(x, 1);
        localStorage.setItem('giohang', JSON.stringify($scope.products));
        $scope.Quantity = JSON.parse(localStorage.getItem('giohang')).length
    }
    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.products.length; i++) {
            var product = $scope.products[i];
            total += (Number.parseFloat(product.price * product.sl));
        }
        return total;
    }
    $scope.size = "S";
});