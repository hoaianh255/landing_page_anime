$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('.scrolltop').fadeIn();
        }
        else{
            $('.scrolltop').fadeOut();
        }
    });
    $(".link").on('click', function(event) {

        if (this.hash !== "") {
 
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            },500, function() {

                window.location.hash = hash;
            });
        } 
    });  
    $("#gallery img").on({
        mouseover: function() {
            $(this).css({
                'filter' : 'grayscale(0%)',
                'cursor' : 'pointer',
                'transform': 'scale(1.1)'
                
            });
        },
        mouseout: function(){
            $(this).css({
                'filter' : 'grayscale(100%)',
                'transform': 'scale(1)'
            });
        },
        click: function(){
            var urlImg = $(this).attr('src');
            $('#mainImg').fadeOut(300,function(){
                $(this).attr('src',urlImg);
            }).fadeIn(300);
        }
    });
    $('#demoForm').submit(function(e){
        e.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var sdt = $('#sdt').val();
        var diachi = $('#diachi').val();

        $(".error").remove();

        if(name == ""){
            $("#name").after('<span class="error">Ban chua nhap ten!</span>');
        }
        if(sdt == ""){
            $("#sdt").after('<span class="error">Ban chua nhap so dien thoai!</span>');
        }else{
            var bieuthuc = /[0-9]{10,11}/;
            var valid = bieuthuc.test(sdt);
            if(!valid){
                $("#sdt").after('<span class="error">so dien thoai khong hop le</span>');
            }
        }
        if(diachi == ""){
            $("#diachi").after('<span class="error">Ban chua nhap dia chi!</span>');
        }
    });
    $(".cartlist").hide();
            $("#iconcart").click(function(e) {
                e.preventDefault();
                $(".cartlist").show();

            });
            $(".close").click(function(e) {
                e.preventDefault();
                $(".cartlist").hide();

            });

    var products = [];
    $('.info').on('click','.addcart',function(e){
        alert("Đã thêm vào giỏ hàng!");
        e.preventDefault();
        var curr = $(this).parent();
        var tensp = curr.children("h3").eq(0).text();
        var giasp = curr.children("p").children("span").eq(0).text();
        var soluong = 1;

        for(var i =0; i< products.length;i++){
        
        if(products[i][0] == tensp){
            soluong = products[i][2] +1;
            products[i][2] = soluong;
                 
            showpro(); 
            total();         
            break;                  
            }

        }      
        if (soluong == 1) {
        var product = [tensp,giasp,soluong];
        products.push(product);
        var countpro = products.length;
        $("#countsp").text(countpro);
        showpro();
        total();
        }   
    });
    function total(){
        var total = 0;
        for (var i = 0; i < products.length; i++) {
            total += parseInt(products[i][1]) * parseInt(products[i][2]);
        }
        $("#total").text("Tổng tiền: "+total);
    }

    function showpro(){
        var str = "";
        for (var i = 0; i < products.length; i++) {
            str+= "<tr><td>"+products[i][0]+"</td>"
            +"<td>Giá:"+products[i][1]+"đ</td>"
            +"<td>"+products[i][2]+"</td>"
            +"<td id='remove'  style='color:red;cursor: pointer;'><i class='fas fa-trash-alt'></i></td></tr>";
        }
        $("#mycart").html(str);
    }
    $("#mycart").on("click","#remove",function(e){
        e.preventDefault();
        var curr = $(this).parent();
        var tensp = curr.children("td").eq(0).text();
        for(var i =0; i < products.length;i++){          
            if(products[i][0] == tensp){
                products.splice(i,1);
                break;
            }
        }
        console.log(tensp);
        $(this).parent().remove();
        var countpro = products.length;
        $("#countsp").text(countpro);
        showpro();
        total();
    });
   

});