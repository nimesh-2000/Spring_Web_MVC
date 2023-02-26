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
                        <button type="button" id="addtoc" className="btn btn-primary btn-lg">Add To Cart</button>
                    </div>
                </div>`;

                    $("#rentA").append(d);


            }
            // setCarFieldValues("","","","","", "", "", "","");
        }
    });
}



















