let computers = [
    {title:'macbook', type:'laptop', price:'2,100'},
    {title:'lenovo', type:'laptop', price:'750'},
    {title:'intel', type:'desktop' , price:'810'}
]

const getAll = () => {
    return computers;
}

const getItem = (title) => {
    return computers.find((computer) => {
        return computer.title == title;
    })
}


const deleteItem = (title) => {
    let foundIndex = computers.findIndex((computer) => {
        return computer.title === title;
    });
    if (foundIndex > -1){
    computers.splice(foundIndex, 1);
        return {deleted: true, count: computers.length}
    } else {
        return {deleted: false, count: computers.length}        
    }
}

const itemCount = () => {
    return computers.length;
}

module.exports = {getAll, getItem, deleteItem, itemCount}