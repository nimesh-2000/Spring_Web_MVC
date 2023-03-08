loadAllCars();
carsCount();
$("#btnAddC2").click(function () {
    addCar();
});

function addCar() {
    var Vdata = new FormData();

    let frontViewFile = $("#uploadFVI")[0].files[0];
    let backViewFile = $("#uploadBV")[0].files[0];
    let sideViewFile = $("#uploadUSV")[0].files[0];
    let interiorViewFile = $("#uploadUIV")[0].files[0];

    let frontFileName = $("#uploadFVI")[0].files[0].name;
    let backFileName = $("#uploadBV")[0].files[0].name;
    let sideFileName = $("#uploadUSV")[0].files[0].name;
    let interiorFileName = $("#uploadUIV")[0].files[0].name;

    let registrationId = $("#txtRNber").val();
    let transmission = $("#txtTrnsm").val();
    let type = $("#txtType").val();
    let noOfPassengers = $("#txtNoOPass").val();
    let fuelType = $("#txtFuel").val();
    let monthlyRate = $("#txtMRt").val();
    let dailyRate = $("#txtMnthlyR").val();
    let prizeForExtrakm = $("#txtPfExk").val();
    let freeMileage = $("#txtFmlg").val();
    let lastServiceMileage = $("#txtLSrm").val();
    let brand = $("#txtCbrnd").val();
    let colour = $("#txtClr").val();
    let model = $("#txtMdl").val();
    let availability = $("#selectAvailable").val();
    let image_1 = frontFileName;
    let image_2 = backFileName;
    let image_3 = sideFileName;
    let image_4 = interiorFileName;


    var car = {
        registrationId: registrationId,
        brand: brand,
        type: type,
        model: model,
        fuelType: fuelType,
        transmissionType: transmission,
        colour: colour,
        noOfPassengers: noOfPassengers,
        lastServiceMileage: lastServiceMileage,
        freeMileage: freeMileage,
        dailyRate: dailyRate,
        monthlyRate: monthlyRate,
        priceForExtraKm: prizeForExtrakm,
        availability: availability,
        image_1: "uploads/" + image_1,
        image_2: "uploads/" + image_2,
        image_3: "uploads/" + image_3,
        image_4: "uploads/" + image_4,
    }
    Vdata.append("vImageFile", frontViewFile)
    Vdata.append("vImageFile", backViewFile)
    Vdata.append("vImageFile", sideViewFile)
    Vdata.append("vImageFile", interiorViewFile)
    Vdata.append("vehicle", new Blob([JSON.stringify(car)], {type: "application/json"}))
    $.ajax({
        url: baseURL + "car",
        method: "POST",
        async: true,
        contentType: false,
        processData: false,
        data: Vdata,
        success: function (resp) {

            uploadCarImages(registrationId);
            loadAllCars();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "car Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            clearCarTextFields();
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "car Added Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

var image_u1;

function uploadCarImages(registrationId) {

    let frontViewFile = $("#uploadFVI")[0].files[0];
    let backViewFile = $("#uploadBV")[0].files[0];
    let sideViewFile = $("#uploadUSV")[0].files[0];
    let interiorViewFile = $("#uploadUIV")[0].files[0];

    let frontFileName = registrationId + "-image_1-" + $("#uploadFVI")[0].files[0].name;
    let backFileName = registrationId + "-image_2-" + $("#uploadBV")[0].files[0].name;
    let sideFileName = registrationId + "-image_3-" + $("#uploadUSV")[0].files[0].name;
    let interiorFileName = registrationId + "-image_4-" + $("#uploadUIV")[0].files[0].name;


    var data = new FormData();
    data.append("image_1", frontViewFile, frontFileName);
    data.append("image_2", backViewFile, backFileName);
    data.append("image_3", sideViewFile, sideFileName);
    data.append("image_4", interiorViewFile, interiorFileName);


    $.ajax({
        url: baseURL + "car/uploadImg/" + registrationId,
        method: "Post",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {

            console.log("Uploaded");
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Images Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Images Not Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

function clearCarTextFields() {
    $('#txtRNber').val("");
    $('#txtTrnsm').val("");
    $('#txtType').val("");
    $('#txtNoOPass').val("");
    $('#txtFuel').val("");
    $('#txtMRt').val("");
    $('#txtMnthlyR').val("");
    $('#txtPfExk').val("");
    $('#txtFmlg').val("");
    $('#txtLSrm').val("");
    $('#txtCbrnd').val("");
    $('#txtClr').val("");
    $('#txtMdl').val("");
    $('#selectAvailable').val("");
    $('#uploadFVI').val("");
    $('#uploadBV').val("");
    $('#uploadUSV').val("");
    $('#uploadUIV').val("");
}


//Load all cars
var i;

function loadAllCars() {
    $("#carViewTable").empty();
    $.ajax({
        url: baseURL + "car",
        dataType: "json",
        success: function (resp) {


            model = resp.data.model;
            colour = resp.data.colour;
            lastServiceMileage = resp.data.lastServiceMileage;
            availability = resp.data.availability;
            image1 = resp.data.image_1;
            image2 = resp.data.image_2;
            image3 = resp.data.image_3;
            image4 = resp.data.image_4;


            for (let car of resp.data) {
                var row = '<tr><td>' + car.registrationId + '</td><td>' + car.brand + '</td><td>' + car.type + '</td><td>' + car.fuelType + '</td><td>' + car.transmissionType + '</td><td>' + car.noOfPassengers + '</td><td>' + car.freeMileage + '</td><td>' + car.priceForExtraKm + '</td><td>' + car.dailyRate + '</td><td>' + car.monthlyRate + '</td></tr>';
                $("#carViewTable").append(row);
            }
            bindCarRowClickEvents();
            setCarTextFieldValues("", "", "", "", "", "", "", "", "", "");
            // $("#txtCustomerID").focus();
        }
    });

}


//Event binding for table rows
function bindCarRowClickEvents() {
    $("#carViewTable>tr").click(function () {
        let registrationId = $(this).children(":eq(0)").text();
        let brand = $(this).children(":eq(1)").text();
        let type = $(this).children(":eq(2)").text();
        let fuelType = $(this).children(":eq(3)").text();
        let transmissionType = $(this).children(":eq(4)").text();
        let noOfPassengers = $(this).children(":eq(5)").text();
        let freeMileage = $(this).children(":eq(6)").text();
        let priceForExtraKm = $(this).children(":eq(7)").text();
        let dailyRate = $(this).children(":eq(8)").text();
        let monthlyRate = $(this).children(":eq(9)").text();
        // console.log(registrationId, brand, type, fuelType);

        //setting table details values to text fields
        $("#txtCNu").val(registrationId);
        $("#txtVCbrnd").val(brand);
        $("#txtCT").val(type);
        $("#txtFT").val(fuelType);
        $("#txtVCTrans").val(transmissionType);
        $("#txtNOP").val(noOfPassengers);
        $("#txtFM").val(freeMileage);
        $("#txtVCcperex").val(priceForExtraKm);
        $("#txtDai").val(dailyRate);
        $("#txtMn").val(monthlyRate);
    });
}

function setCarTextFieldValues(registrationId, brand, type, fuelType, transmissionType, noOfPassengers, freeMileage, priceForExtraKm, dailyRate, monthlyRate) {
    $("#txtVCbrnd").val(brand);
    $("#txtVCTrans").val(transmissionType);
    $("#txtVCcperex").val(priceForExtraKm);
    $("#txtCNu").val(registrationId);
    $("#txtNOP").val(noOfPassengers);
    $("#txtDai").val(dailyRate);
    $("#txtCT").val(type);
    $("#txtFM").val(freeMileage);
    $("#txtMn").val(monthlyRate);
    $("#txtFT").val(fuelType);
}


// ==================================
// ============================================
// =================================================================================================//

var model;
var colour;
var lastServiceMileage;
var availability;
var image1;
var image2;
var image3;
var image4;
// Update car details
$("#btnUpdate").click(function () {


    let registrationId = $("#txtCNu").val();
    let brand = $("#txtVCbrnd").val();
    let type = $("#txtCT").val();
    let fuelType = $("#txtFT").val();
    let transmissionType = $("#txtVCTrans").val();
    let noOfPassengers = $("#txtNOP").val();
    let freeMileage = $("#txtFM").val();
    let priceForExtraKm = $("#txtVCcperex").val();
    let dailyRate = $("#txtDai").val();
    let monthlyRate = $("#txtMn").val();
    // let frontView = $("#uploadUImFV").val();
    // let backView = $("#uploadUImBV").val();
    // let sideView =  $("#uploadUImSV").val();
    // let interiorView = $("#uploadUIImV").val();


    var carU = {
        registrationId: registrationId,
        brand: brand,
        type: type,
        fuelType: fuelType,
        transmissionType: transmissionType,
        noOfPassengers: noOfPassengers,
        freeMileage: freeMileage,
        priceForExtraKm: priceForExtraKm,
        dailyRate: dailyRate,
        monthlyRate: monthlyRate,

        model: model,
        colour: colour,
        lastServiceMileage: lastServiceMileage,
        availability: availability,
        image_1: image1,
        image_2: image2,
        image_3: image3,
        image_4: image4,


        // cusName:name,
        // drivingLicenceNumber: licenceNum,
        // date:date,
        // imageLocation:image
    }

    $.ajax({
        url: baseURL + 'car',
        method: 'put',
        contentType: "application/json",
        data: JSON.stringify(carU),
        dataType: "json",
        success: function (res) {


            alert(res.message);
            loadAllCars();
        },
        error: function (error) {
            let cause = JSON.parse(error.responseText).message;
            alert(cause);
        }

    });
});

$("#btnDelete").click(function () {
    let registrationId = $("#txtCNu").val();
    $.ajax({
        url: baseURL + "car?registrationId=" + registrationId + "",
        method: "delete",
        dataType: "json",
        success: function (resp) {
            alert(resp.message);
            // resp.data.image_1;
            loadAllCars();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function carsCount(){
    $.ajax({
        url: baseURL+"car/carCount",
        dataType: "json",
        success: function (res) {
            $("#availableV").text(res.data);
        }
    })
}


const carBrandRegEx = /^[A-z ]{3,10}$/;
const carTrans = /^[A-z ]{4,7}$/;
const carType = /^[A-z ]{5,10}$/;
const carNoP = /^[0-9]{1,2}$/;
const carFuel = /^[A-z ]{5,8}$/;
const carMonthlyRate = /^[0-9]{1,}$/;
const carDailyRate = /^[0-9]{1,}$/;
const priceExtraKm = /^[0-9]{1,}$/;
const freeMile = /^[0-9]{1,}$/;
const lastMile = /^[0-9]{1,}$/;
const registrationNo = /^[A-z]{2}-[0-9]{4}$/;
const carColour = /^[A-z ]{3,10}$/;
const carModel = /^[A-z0-9 ,/]{2,20}$/;

let carValidations = [];
carValidations.push({reg: carBrandRegEx, field: $('#txtCbrnd'), error: 'Car Brand Pattern is Wrong'});
carValidations.push({reg: carTrans, field: $('#txtTrnsm'), error: 'Car Transmission Pattern is Wrong'});
carValidations.push({reg: carType, field: $('#txtType'), error: 'Car Type Pattern is Wrong'});
carValidations.push({reg: carNoP, field: $('#txtNoOPass'), error: 'Car Number Of Passengers Pattern is Wrong'});
carValidations.push({reg: carFuel, field: $('#txtFuel'), error: 'Car Fuel Pattern is Wrong'});
carValidations.push({reg: carMonthlyRate, field: $('#txtMRt'), error: 'Car Monthly Rate Pattern is Wrong'});
carValidations.push({reg: carDailyRate, field: $('#txtMnthlyR'), error: 'Car Daily Rate Pattern is Wrong'});
carValidations.push({reg: priceExtraKm, field: $('#txtPfExk'), error: 'Car  Price Extra Km Pattern is Wrong'});
carValidations.push({reg: freeMile, field: $('#txtFmlg'), error: 'Car Free Mile  Pattern is Wrong'});
carValidations.push({reg: lastMile, field: $('#txtLSrm'), error: 'Car Last Mile  Pattern is Wrong'});
carValidations.push({reg: registrationNo, field: $('#txtRNber'), error: 'Car Registration Number Pattern is Wrong'});
carValidations.push({reg: carColour, field: $('#txtClr'), error: 'Car Colour Pattern is Wrong'});
carValidations.push({reg: carModel, field: $('#txtMdl'), error: 'Car Model Pattern is Wrong'});


//disable tab key of all four text fields using grouping selector in CSS
$("#txtCbrnd,#txtTrnsm,#txtType,#txtNoOPass,#txtFuel,#txtMRt,#txtMnthlyR,#txtPfExk,#txtFmlg,#txtLSrm,#txtRNber,#txtClr,#txtMdl").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtCbrnd,#txtTrnsm,#txtType,#txtNoOPass,#txtFuel,#txtMRt,#txtMnthlyR,#txtPfExk,#txtFmlg,#txtLSrm,#txtRNber,#txtClr,#txtMdl").on('keyup', function (event) {
    checkCValidity();
});

$("#txtCbrnd,#txtTrnsm,#txtType,#txtNoOPass,#txtFuel,#txtMRt,#txtMnthlyR,#txtPfExk,#txtFmlg,#txtLSrm,#txtRNber,#txtClr,#txtMdl").on('blur', function (event) {
    checkCValidity();
});


$("#txtCbrnd").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(carBrandRegEx, $("#txtCbrnd"))) {
        $("#txtTrnsm").focus();
    } else {
        focusTextC($("#txtCbrnd"));
    }
});


$("#txtTrnsm").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(carTrans, $("#txtTrnsm"))) {
        focusTextC($("#txtType"));
    }
});


$("#txtType").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(carType, $("#txtType"))) {
        focusTextC($("#txtNoOPass"));
    }
});

$("#txtNoOPass").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(carNoP, $("#txtNoOPass"))) {
        focusTextC($("#txtFuel"));
    }
});


$("#txtFuel").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(carFuel, $("#txtFuel"))) {
        focusTextC($("#txtMRt"));
    }
});

$("#txtMRt").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(carMonthlyRate, $("#txtMRt"))) {
        focusTextC($("#txtMnthlyR"));
    }
});

$("#txtMnthlyR").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(carDailyRate, $("#txtMnthlyR"))) {
        focusTextC($("#txtPfExk"));
    }
});
$("#txtPfExk").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(carDailyRate, $("#txtPfExk"))) {
        focusText($("#txtFmlg"));
    }
});
$("#txtFmlg").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(freeMile, $("#txtFmlg"))) {
        focusTextC($("#txtLSrm"));
    }
});
$("#txtLSrm").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(lastMile, $("#txtLSrm"))) {
        focusTextC($("#txtRNber"));
    }
});
$("#txtRNber").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(registrationNo, $("#txtRNber"))) {
        focusTextC($("#txtClr"));
    }
});
$("#txtClr").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(colour, $("#txtClr"))) {
        focusTextC($("#txtMdl"));
    }
});

$("#txtMdl").on('keydown', function (event) {
    if (event.key == "Enter" && checkC(model, $("#txtMdl"))) {
        let res = confirm("Do you want to create.?");
        if (res) {
            clearAllTextsC();
        }
    }
});

function checkCValidity() {
    let errorCount = 0;
    for (let validation of carValidations) {
        if (checkC(validation.reg, validation.field)) {
            textSuccessC(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setTextErrorC(validation.field, validation.error);
        }
    }
    setButtonStateC(errorCount);
}

function checkC(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorC(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultTextC(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessC(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultTextC(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextC(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextC(txtField) {
    txtField.focus();
}

function setButtonStateC(value) {
    if (value > 0) {
        $("#btnAddC2").attr('disabled', true);
    } else {
        $("#btnAddC2").attr('disabled', false);
    }
}

function clearAllTextsC() {
    $("#txtCbrnd").focus();
    $("#txtCbrnd,#txtTrnsm,#txtType,#txtNoOPass,#txtFuel,#txtMRt,#txtMnthlyR,#txtPfExk,#txtFmlg,#txtLSrm,#txtRNber,#txtClr,#txtMdl").val("");
    checkCValidity();
}
