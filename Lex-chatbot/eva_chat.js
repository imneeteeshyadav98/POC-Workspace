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

function dispatch(lexInput,callback)
{
    console.log('Event Object From Lex: ',JSON.stringify(lexInput))
    var slots=lexInput.currentIntent.slots;
    var intentName=lexInput.currentIntent.name;
    var slotToElicit="appointment";
    var message={'contentType': 'PlainText', 'content': "For which date you want the appointment to be booked"}
    if(slots['eva_message']==null){
        var appointment_responsCard= {
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.locations
            }]}
        message.content="Hello, I'm Eva. I am a chatbot and I can help with DR. appointment . What can I do for you?.",
        callback(elicitSlot({},slots,'location',intentName,message,location_responsCard))
   }
    callback(deleGate({},slots))
}


