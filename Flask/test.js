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

function isvalidAppointmentType(appointment_type){
    if(appointment_type=='Book an appointment'||appointment_type=='Register paitent'||appointment_type=='Urgent Case')
    {
        return true;
    }
    return false;
}

function isvalidPaitentRelation(paitent_relation){
    if(paitent_relation=="Self" || paitent_relation=="Some on else"){
        return true;
    }
    return false;
}
function isvalidLocation(location){
    if(location=='Dallas'||location=='Austin Texas')
    {
        return true;
    }
    return false;
}
function isvalidHealthSpecialization(healthspecialization){
    if(healthspecialization=='Primary care'||healthspecialization=="Cardiologist"||healthspecialization=="Gynecologist")
    {
        return true;
    }
    return false;
}

function dispatch(lexInput,callback) 
{
    console.log('Event Object From Lex: ',JSON.stringify(lexInput))
    var slots=lexInput.currentIntent.slots;
    console.log("slots output: ", slots.appointment_type);
    // console.log(slots);
    var intentName=lexInput.currentIntent.name;
    var message={'contentType': 'PlainText', 'content': "For which date you want the appointment to be booked"}
    
    if(slots['appointment_type']==null){
        var appointmentType_responeCard={
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.appointment_type
            }]}
        message.content="Chose your appointment type..."
        return callback(elicitSlot({},slots,'appointment_type',intentName,message,appointmentType_responeCard))
   }else if(slots['appointment_type']&&slots['paitent_relation']==null){
       if(isvalidAppointmentType(slots['appointment_type'])){
        var paitentRelation_responeCard={
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.paitent_relation
            }]}
        message.content="Do you want book for self or some one else"
        return callback(elicitSlot({},slots,'paitent_relation',intentName,message,paitentRelation_responeCard)) 
       }
       else{
        var appointmentType_responeCard={
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.appointment_type
            }]}
            message.content="Chose correct appointment type..."
            return callback(elicitSlot({},slots,'appointment_type',intentName,message,appointmentType_responeCard))
       }
    }else if(slots['appointment_type']&&slots['paitent_relation']&&slots['location']==null){
        if(isvalidPaitentRelation(slots['paitent_relation']))
        {
            var location_responeCard={
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.locations
            }]}
            message.content="Sure.... What is Your preferred location"
            return callback(elicitSlot({},slots,'location',intentName,message,location_responeCard))
            
        }else{
             var appointmentType_responeCard={
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.appointment_type
            }]}
            message.content="Chose correct appointment type..."
            return callback(elicitSlot({},slots,'appointment_type',intentName,message,appointmentType_responeCard))
        }
    }
    else if(slots['appointment_type']&&slots['paitent_relation']&&slots['location']&&slots['healthspecialization']==null){
        if(isvalidPaitentRelation(slots['paitent_relation']))
        {
            var healthspecialization_responeCard={
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.healthspecialization
            }]}
            message.content="Which specialisation are you looking for? Please pick one. "
            return callback(elicitSlot({},slots,'healthspecialization',intentName,message,healthspecialization_responeCard))
            
        }else{
              var location_responeCard={
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.locations
            }]}
            message.content="Sure.... What is Your preferred location"
            return callback(elicitSlot({},slots,'location',intentName,message,location_responeCard))
        }
    }else if(slots['appointment_type']&&slots['paitent_relation']&&slots['location']&&slots['healthspecialization']&&slots['doctor_name']==null){
        if(isvalidHealthSpecialization(slots['healthspecialization']))
        {
            var doctorName_responeCard={
            'version': null,
            'contentType': 'application/vnd.amazonaws.card.generic',
            'genericAttachments': [{
                'buttons': db.doctor_list
            }]}
            message.content="Got, It. Whom do you want to meet"
            return callback(elicitSlot({},slots,'doctor_name',intentName,message,doctorName_responeCard))
            
        }else{
            var healthspecialization_responeCard={
                'version': null,
                'contentType': 'application/vnd.amazonaws.card.generic',
                'genericAttachments': [{
                    'buttons': db.healthspecialization
                }]}
                message.content="Which specialisation are you looking for? Please pick one. "
                return callback(elicitSlot({},slots,'healthspecialization',intentName,message,healthspecialization_responeCard))
        }
    }
    callback(deleGate({},slots))
}
