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
    var sessionAttributes=lexInput.sessionAttributes;
    var slots=lexInput.currentIntent.slots;
    if(slots["name"]){
        sessionAttributes['userName']=slots['name'];
    }
    return callback(deleGate({},slots))
}


