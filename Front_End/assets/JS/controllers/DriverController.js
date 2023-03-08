loadDriverSchedule();
driverCount();
$("#btnAddDriver").click(function () {

    let driverId =  $("#txtDId").val();
    let driverName = $("#txtDNa").val();
    let driverNic =$("#txtDNIC").val();
    let driverLicense= $("#txtDLN").val();
    let driverDOB= $("#txtDOB").val();
    let driverAvailability= $("#selectDriver").val();

    var Driver={
        driverId:driverId,
        name:driverName,
        nic:driverNic,
        drivingLicenceNum:driverLicense,
        dob:driverDOB,
        availability:driverAvailability
    }

    //send ajax request to the customer servlet
    $.ajax({
        url: baseURL+"driver",
        method: "post",
        data : JSON.stringify(Driver),
        contentType:"application/json",
        success: function (resp) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Successfully Added",
                showConfirmButton: false,
                timer: 1500
            });

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});


function driverCount(){
    $.ajax({
        url: baseURL+"driver/driverCount",
        dataType: "json",
        success: function (res) {
            $("#occupiedV").text(res.data);
        }
    })
}
function loadDriverSchedule() {
    $('#driScheduTable').empty();
    let status = "Accepted";
    let driverId = $("#dId").text();
    $.ajax({
        url:baseURL+"rental/getCarRents/" + status + "/" + driverId,
        dataType: "json",
        success:function (res) {
            for (let carRent of res.data) {
                var row = '<tr><td>' + carRent.driverId + '</td><td>' + carRent.rentalId + '</td><td>' + carRent.registrationId + '</td><td>' + carRent.cusNic + '</td><td>' + carRent.pickUpDate + '</td><td>' + carRent.returnDate + '</td><td>' + carRent.pickupLocation + '</td><td>' + carRent.returnLocation + '</td></tr>';
                $("#driScheduTable").append(row);
                console.log(carRent);
            }
        }
    })
}

const driverIdRegEx = /^(D00-)[0-9]{1,3}$/;
const driverNameRegEx = /^[A-z ]{5,20}$/;
const driverNicRegEx = /^[0-9/A-z. ,]{7,}$/;
const driverLicenseRegEx = /^[0-9]{1,}$/;

let DriverValidations = [];
DriverValidations.push({reg: driverIdRegEx, field: $('#txtDId'),error:'Driver ID Pattern is Wrong' });
DriverValidations.push({reg: driverNameRegEx, field: $('#txtDNa'),error:'Driver Name Pattern is Wrong'});
DriverValidations.push({reg: driverLicenseRegEx, field: $('#txtDLN'),error:'Driver License Number Pattern is Wrong'});
DriverValidations.push({reg: driverNicRegEx, field: $('#txtDNIC'),error:'Driver NIC  Pattern is Wrong'});


$("#txtDId,#txtDNa,#txtDLN,#txtDNIC").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtDId,#txtDNa,#txtDLN,#txtDNIC").on('keyup', function (event) {
    checkDValidity();
});

$("#txtDId,#txtDNa,#txtDLN,#txtDNIC").on('blur', function (event) {
    checkDValidity();
});


$("#txtDId").on('keydown', function (event) {
    if (event.key == "Enter" && checkD(driverIdRegEx, $("#txtDId"))) {
        $("#txtDNa").focus();
    } else {
        focusTextD($("#txtDId"));
    }
});


$("#txtDNa").on('keydown', function (event) {
    if (event.key == "Enter" && checkD(driverNameRegEx, $("#txtDNa"))) {
        focusTextD($("#txtDLN"));
    }
});


$("#txtDLN").on('keydown', function (event) {
    if (event.key == "Enter" && checkD(driverLicenseRegEx, $("#txtDLN"))) {
        focusTextD($("#txtDNIC"));
    }
});
$("#txtDNIC").on('keydown', function (event) {
    if (event.key == "Enter" && checkD(driverNicRegEx, $("#txtDNIC"))) {
        let res = confirm("Do you want to create.?");
        if (res) {
            clearAllTextsD();
        }
    }
});



function checkDValidity() {
    let errorCount=0;
    for (let validation of DriverValidations) {
        if (checkD(validation.reg,validation.field)) {
            textSuccessD(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextErrorD(validation.field,validation.error);
        }
    }
    setButtonStateD(errorCount);
}

function checkD(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorD(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextD(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessD(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextD(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextD(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextD(txtField) {
    txtField.focus();
}

function setButtonStateD(value){
    if (value>0){
        $("#btnAddDriver").attr('disabled',true);
    }else{
        $("#btnAddDriver").attr('disabled',false);
    }
}

function clearAllTextsD() {
    $("#txtDId").focus();
    $("#txtDId,#txtDNa,#txtDLN,#txtDNIC").val("");
    checkDValidity();
}