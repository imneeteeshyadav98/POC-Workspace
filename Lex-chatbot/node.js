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

var doctors=['John','Mike']
var registerdPhone=["1234567890"]

function dispatch(lexInput,callback)
{
    console.log('Event Object From Lex: ',JSON.stringify(lexInput))
    var slots=lexInput.currentIntent.slots;
    var intentName=lexInput.currentIntent.name;
    var sessionAttributes=lexInput.sessionAttributes;
    console.log(sessionAttributes);
    var slotToElicit="date_of_appointment";
    var message={'contentType': 'PlainText', 'content': "For which date you want the appointment to be booked"}
    var userName="";
    if(sessionAttributes['userName']){
        userName=sessionAttributes['userName'];
        console.log(userName);
    }

    if(slots['phone']==null){//1st turn
        message.content='Sure. '+ userName +' Can I get your phone number';
        return callback(elicitSlot(sessionAttributes,slots,'phone',intentName,message))
    }
   else if(slots['phone']&& slots['location']==null)
   {
       //2st turn
        if(registerdPhone.indexOf(slots['phone'])<0)
        {
            message.content="I see that you are not a registered user. Can you please provide your name for registaration";
            sessionAttributes.intentShift="BookApointment";
            return callback(elicitSlot(sessionAttributes,{"phone": slots['phone'], "name":null},'name','Registeration',message, null))
        }
        var location_responsCard= {
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.locations
            }]}
        message.content='Sure. '+ userName +' What is Your preferred location'
        return callback(elicitSlot(sessionAttributes,slots,'location',intentName,message,location_responsCard))
   }
   else if(slots['location']&&slots['doctor_name']==null)//3rd turn
   {
       if(isvalidLocation(slots['location'])){
           var doctor_responseCard={
               "version": null,
               'contentType': 'application/vnd.amazonaws.card.generic',
               'genericAttachments': [{
                'buttons': db.doctor_list
            }]}
            message.content="Got, It. Whom do you want to meet"
            return callback(elicitSlot(sessionAttributes,slots,'doctor_name',intentName,message,doctor_responseCard))
       }
       else{
           var location_responsCard= {
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.locations
            }]}
        message.content=slots['location']+ "is not a valid location Please pick the right location from the options below"
        return callback(elicitSlot(sessionAttributes,slots,'location',intentName,message,location_responsCard))
           
       }
   }
   else if(slots['location']&&slots['doctor_name']&&slots['doctor_of_appointment']==null){//4th turn 
   }
    callback(deleGate(sessionAttributes,slots))
}

