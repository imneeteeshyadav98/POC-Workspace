exports.handler = async (event, context,callback) => {
    try {
        dispatch(event, (response)=>{
            callback(null,response)
        })
    } catch (e) {
        callback(e)
    }
};

function elicitSlot(sessionAttributes,slots,slotToElicit,intentName,message){
    return{
        sessionAttributes,
        dialogAction:{
            type: "ElicitSlot",
            slots: slots,
            slotToElicit,
            intentName,
            message
        }
    };
}
/*
var elicitSlot={
    sessionAttributes:{},
    dialogAction: {
        type: "ElicitSlot",
        intentName: null,
        slots: null,
        slotToElicit: null
    }
}
*/
var delegate = {
    sessionAttributes: {},
    dialogAction: {
        "type": "Delegate",
        "slots": null
    }
}

var doctors=['John','Mike']

function dispatch(lexInput,callback)
{
    var slots=lexInput.currentIntent.slots;
    var intentName=lexInput.currentIntent.name;
    var slotToElicit="date_of_appointment";
    var message={'contentType': 'PlainText', 'content': "For which date you want the appointment to be booked"}
    if(slots['doctor_name']&&doctors.indexOf(slots['doctor_name'])<0)
    {
        message.content="This doctor is not in the list,Please enter John or Mike"
        return callback(elicitSlot({},slots,'doctor_name',intentName,message))
    }
    //callback(elicitSlot({},slots,slotToElicit,intentName,message));
    callback(delegate)
}

