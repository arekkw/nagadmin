var SetUtils = {
    map: function(set, callback) {
        var result = [];
        for (var item of set) {
            result.push(callback(item));
        }
        return result;
    }
};

export default SetUtils;