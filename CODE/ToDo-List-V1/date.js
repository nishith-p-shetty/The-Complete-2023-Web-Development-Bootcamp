function getDateCSTM(){
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    
    var today = new Date();
    var daystr = today.toLocaleDateString('en-US', options);
    return daystr;
}

module.exports = getDateCSTM;