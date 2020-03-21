export default () => {

    let arr = [];
    let count = 12;

    for ( let i = 0; i < count; i++) {
        arr[i] = { message: 'Some text - ' + (i + 1) }
    }

    return arr;
}
