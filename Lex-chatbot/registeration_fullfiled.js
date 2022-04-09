exports.handler = async (event, context,callback) => {
    try {
        dispatch(event, (response)=>{
            callback(null,response)
        })
    } catch (e) {
        callback(e)
    }
};

function elicitSlot(sessionAttributes,slots,slotToElicit,intentName,message,responseCard){
    return{
        sessionAttributes,
        dialogAction:{
            type: "ElicitSlot",
            slots: slots,
            slotToElicit,
            intentName,
            message,
            responseCard
        }
    };
}

function deleGate(sessionAttributes,slots){
    return{
        sessionAttributes,
        dialogAction:{
            type: "Delegate",
            slots
        }
    };
}

function dispatch(lexInput,callback)
{
    var sessionAttributes=lexInput.sessionAttributes;
    var slots=lexInput.currentIntent.slots;
    var bookAppointmentSlots={
        "phone": slots['phone'],
        "location": null,
        "doctor_name": null,
        "date_of_appointment": null
    }
    var message={'contentType': 'PlainText', 'content': "Your registeration is completed. Lets continue with your appointment booking.Please provide your location."}
    if(sessionAttributes.intentShift){
        return callback(elicitSlot(sessionAttributes,bookAppointmentSlots,'location', 'BookAppointment',message))
    }
    return callback(deleGate(sessionAttributes,slots))
}


