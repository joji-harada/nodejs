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
    if (foundIndex > -1){ //if the foundIndex does not exist
    computers.splice(foundIndex, 1);
        return {deleted: true, count: computers.length};
    } else { //otherwise delete the item
        return {deleted: false, count: computers.length};
    };
}

const addItem = (newItem) => {
    if (getItem(newItem.title)){
        return {added: false, count: computers.length};
    } else {
        computers.push(newItem);
        return {added: true, count: computers.length};
    };
}


const itemCount = () => {
    return computers.length;
}

module.exports = {getAll, getItem, deleteItem, addItem, itemCount};

//let result = addItem({title: "chrome", type: "notebook", price: "340"});
//let result2 = addItem({title:'intel', type:'desktop' , price:'810'})
//console.log(result);
//console.log(result2);