let db=require('./db.json')
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
function isvalidLocation(location){
    if(location=='Dallas'||location=='Austin Texas')
    {
        return true;
    }
    return false;
}
function isvalidBookingType(booking_type){
    if(booking_type=='Self'||booking_type=='Someone else')
    {
        return true;
    }
    return false;
}
function isvalidAppointmentType(eva_message){
    if(eva_message=='Book an appointment'||eva_message=='Register paitent')
    {
        return true;
    }
    return false;
}

var doctors=['John','Mike']

function dispatch(lexInput,callback)
{
    console.log('Event Object From Lex: ',JSON.stringify(lexInput))
    var slots=lexInput.currentIntent.slots;
    var intentName=lexInput.currentIntent.name;
    var slotToElicit="date_of_appointment";
    var message={'contentType': 'PlainText', 'content': "For which date you want the appointment to be booked"}
    if(slots['eva_message']==null){
            message.content="Hello, I'm Eva. I am a chatbot and I can help with DR. appointment . What can I do for you?.",
            callback(elicitSlot({},slots,'eva_message',intentName,message,appointment_responsCard))
    }
    
    else if(slots["location"]==null){
        message.content="Hello, I'm Eva. I am a chatbot and I can help with DR. appointment . What can I do for you?.",
        callback(elicitSlot({},slots,'eva_message',intentName,message,appointment_responsCard))
    }
    else{
            message.content="Error message.",
            callback(elicitSlot({},slots,'eva_message',intentName,message,appointment_responsCard))

    }
    callback(deleGate({},slots))
}


