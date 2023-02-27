carAppend();

function carAppend(){
    $("#rentA").empty();

    $.ajax({
        url: baseURL+"car",
        dataType: "json",
        success: function (resp) {

            $("#rentA").empty();
            for (let car of resp.data) {


                var d = `<div class="mmclass">
                    <div id="k10"> 
                    </div>
                    <div id="details">
                        <h1 id="bName">${car.brand+"  "+car.model}</h1>
                        <h3 id="daily1">Daily</h3>
                        <h3 id="monthly1">Monthly</h3>
                        <h3 id="onH1">On Hold</h3>
                        <h3 id="dalyV">${car.dailyRate}</h3>
                        <h3 id="monthlyV">${car.monthlyRate}</h3>
                        <h3 id="onV">${car.dailyRate}</h3>
                        <div id="liC"></div>
                        <h3 id="b">Brand</h3>
                        <h3 id="t">Type</h3>
                        <h3 id="tr">Transmission</h3>
                        <h3 id="f">Fuel</h3>
                        <h3 id="nOP">No Of Passengers</h3>
                        <h3 id="bId">${car.brand}</h3>
                        <h3 id="tId">${car.type}</h3>
                        <h3 id="trId">${car.transmissionType}</h3>
                        <h3 id="fId">${car.fuelType}</h3>
                        <h3 id="nId">${car.noOfPassengers}</h3>
                        <div style="position: relative;z-index: 3">
                        <button type="button" id="${car.registrationId}" class="addTo" style="background-color: #0984E3;
                        
                     
    font-weight: bold;
    color: black;
    position: absolute;
    width: 200px;
    left: 78px;
    top: 179px;">Add To Cart</button></div>
                    </div>
                </div>`;

                    $("#rentA").append(d);


            }

        }
    });
}


function loadCheckCars(id){
    let from=$("#txtFD").val();
    let to=$("#txtTD").val();
    let selectDri=$("#selectDrive").val();
    // let lossPaySlip=$("#lossDP2").val();


    $.ajax({
        url: baseURL+"car?registrationId="+id,
        method :"get",
        dataType:"json",
        success: function (resp) {
            console.log(resp);
            console.log(resp.data);

            let lossDamagePrice="";

            if(resp.data.type=="General"){
                lossDamagePrice=10000;
            }else if (resp.data.type=="Premium"){
                lossDamagePrice=15000;
            }else{
                lossDamagePrice=20000;
            }

            $("#CheckReTable").append("<tr><td>"+resp.data.registrationId+"</td><td>"+resp.data.brand+" "+resp.data.model+"</td><td>"+resp.data.dailyRate+"</td><td>"+resp.data.monthlyRate+"</td><td>"+lossDamagePrice+"</td><td>"+from+"</td><td>"+to+"</td><td>"+selectDri+"</td></tr>")

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
        }
    });
}

$('body').on('click', '.addTo', function() {
    alert("Add to cart "+this.id);
    loadCheckCars(this.id);
});






// $("#CheckReTable").append("<tr><td>"+resp.data.brand+"</td><td>"+resp.data.dailyRate+"</td><td>"+resp.data.monthlyRate+
//     "</td><td>"+lossDamagePrice+"</td><td>"+from+"</td><td>"+to+"</td><td>"+selectDri+"</td></tr>")













