$("#btnAddC2").click(function (){
    addCar();
});

function addCar() {

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
    }

    $.ajax({
        url: baseURL + "car",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(car),
        success: function (resp) {
            uploadCarImages(registrationId);
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
                title: "car Not Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

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
    method: "PUT",
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