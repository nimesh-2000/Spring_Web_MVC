$("#btnAddDriver").click(function () {

    let driverId =  $("#txtDId").val();
    let driverName = $("#txtDNa").val();
    let driverNic =$("#txtDNIC").val();
    let driverLicense= $("#txtDLN").val();
    let driverDOB= $("#txtDOB").val();
    let driverAvailability= $("#selectDriver").val();

    var Driver={
        driver_id:driverId,
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
    if (event.key == "Enter" && checkA(driverIdRegEx, $("#txtDId"))) {
        $("#txtDNa").focus();
    } else {
        focusTextA($("#txtDId"));
    }
});


$("#txtDNa").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(driverNameRegEx, $("#txtDNa"))) {
        focusTextA($("#txtDLN"));
    }
});


$("#txtDLN").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(driverLicenseRegEx, $("#txtDLN"))) {
        focusTextA($("#txtDNIC"));
    }
});
$("#txtDNIC").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(driverNicRegEx, $("#txtDNIC"))) {
        let res = confirm("Do you want to create.?");
        if (res) {
            clearAllTextsA();
        }
    }
});



function checkAValidity() {
    let errorCount=0;
    for (let validation of AdminValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccessA(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextErrorA(validation.field,validation.error);
        }
    }
    setButtonStateA(errorCount);
}

function checkA(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorA(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextA(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessA(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextA(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextA(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextA(txtField) {
    txtField.focus();
}

function setButtonStateA(value){
    if (value>0){
        $("#btnAddAdmin").attr('disabled',true);
    }else{
        $("#btnAddAdmin").attr('disabled',false);
    }
}

function clearAllTextsA() {
    $("#txtAId").focus();
    $("#txtAId,#txtE,#txtU,#txtUP").val("");
    checkAValidity();
}