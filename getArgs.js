module.exports.get = function parse (inputArray) {
    var args = { 
        'args': [],
        'params': [],
        'flags': [],
    };
    inputArray.forEach(element => {
        if (element[0] == '-' && element[1] == '-') {
           args['params'].push(element.slice(2));
        } 
         else if (element[0] == '-') {
            for(i = 1, len = element.length; i < len; i++) {
                args['flags'].push(element[i]);
            }
        }
        else {
            args['args'].push(element);
        }
    });
    return args;
};   