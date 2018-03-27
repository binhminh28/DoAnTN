

var app = angular.module("myShoppingList", []);
app.controller("myCtrl", function ($scope) {
    $scope.products = []
    if ($.session.get('giohang') != undefined) {
        $("#select").html(JSON.parse($.session.get('giohang')).length);
        $scope.products = JSON.parse($.session.get('giohang'));
    }
    $scope.addItem = function (item) {
        var idproduct = item.target.attributes.data.value;
        var giohang = [];
        var item = {
            _id: idproduct,
            sl: 1,
            price: item.target.attributes.money.value,
            name:item.target.attributes.name.value,
            image:item.target.attributes.image.value
        }

        if ($.session.get('giohang') === undefined) {
            
            giohang.push(item);
            $scope.products.push(item);
            $.session.set('giohang', JSON.stringify(giohang));
            $("#select").html(JSON.parse($.session.get('giohang')).length);
            console.log("Them moi session")
        }
        else {
            giohang = JSON.parse($.session.get('giohang'));
            for (var i = 0; i < giohang.length; i++) {
                console.log("Dang có: " + giohang.length)
                if (giohang[i]._id === idproduct) {
                    if(giohang[i].sl >=5){
                        alert("Shit! You buy too much. Quantity must be less than 5")
                        return;
                    }else{
                        giohang[i].sl++;
                        $scope.products[i].sl++;
                        $.session.set('giohang', JSON.stringify(giohang));
                        return;
                    }
                }
            }
            giohang.push(item);
            $scope.products.push(item);
            $.session.set('giohang', JSON.stringify(giohang));
            $("#select").html(JSON.parse($.session.get('giohang')).length);
        }
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.products.splice(x, 1);
        $.session.set('giohang', JSON.stringify($scope.products));
        $("#select").html(JSON.parse($.session.get('giohang')).length);
    }
    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.products.length; i++) {
            var product = $scope.products[i];
            total += (Number.parseFloat(product.price * product.sl));
        }
        return total;
    }
});