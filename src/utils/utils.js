export const objectToArray = (object) => {
    return !!object ? Object.keys(object).map(key => ({ id: key, ...object[key] })) : []
}

export const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}