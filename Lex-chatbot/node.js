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
    console.log('Event Object From Lex: ',JSON.stringify(lexInput))
    var slots=lexInput.currentIntent.slots;
    var intentName=lexInput.currentIntent.name;
    var slotToElicit="date_of_appointment";
    delegate.dialogAction.slots=slots;
    var message={'contentType': 'PlainText', 'content': "For which date you want the appointment to be booked"}
    /*
    if(slots['doctor_name']&&doctors.indexOf(slots['doctor_name'])<0)
    {
        message.content="This doctor is not in the list,Please enter John or Mike"
        return callback(elicitSlot({},slots,'doctor_name',intentName,message))
    }
    //callback(elicitSlot({},slots,slotToElicit,intentName,message));
    */
   if(slots['location']==null){
        var location_responsCard= {
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.locations
            }]}
        message.content="Sure. What is Your preferred location",
        callback(elicitSlot({},slots,'location',intentName,message,location_responsCard))
   }
   else if(slots['location']&&slots['doctor_name']==null)
   {

   }
   else if(slots['location']&&slots['doctor_name']&&slots['doctor_of_appointment']==null){
   }
    callback(deleGate({},slots))
}

