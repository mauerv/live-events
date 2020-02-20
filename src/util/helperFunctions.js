export const objToArr = obj => {
    let list = [];
    for (const key in obj) list.push(obj[key]);
    return list;
}