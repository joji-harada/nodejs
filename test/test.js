const expect = require("chai").expect;
const computers = require("../lib/data.js")

//getItem tests (pass/fail)
describe("Get function", () => {
    it("returns requested computer", () => {
        const result = computers.getItem("intel");
        expect(result).to.deep.equal({title:'intel', type:'desktop' , price:'810'});
    });
    
    it("fails for invalid request", () => {
        const result = computers.getItem("fake");
        expect(result).to.be.undefined;
    });
});

//addItem tests (pass/fail)
describe("Add function", () => {
    it("adds new computer", () => {
        const result = computers.addItem({title:'chrome', type:'notebook', price:'340'});
        expect(result.added).to.be.true;
    });
    
    it("fails if computer exists", () => {
        const result = computers.addItem({title:'intel', type:'desktop' , price:'810'});
        expect(result.added).to.be.false;
    });
});

//deleteItem tests (pass/fail)
describe("Delete function", () => {
    it("deletes an item", () => {
        const result = computers.deleteItem("intel");
        expect(result.deleted).to.be.true;
    });
    
    it("fails if item does not exist", () => {
        const result = computers.deleteItem("fake");
        expect(result.deleted).to.be.false;
    });
});