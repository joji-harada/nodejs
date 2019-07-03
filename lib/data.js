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
    computers.splice(foundIndex, 1);
}

module.exports = {getAll, getItem, deleteItem}
