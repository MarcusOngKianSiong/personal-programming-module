const findFolderInDirectory = require('../directory.js');
describe('Directory related functions',()=>{
        it('functional correctness: (findFolderInDirectory) -> CAN the function find the lala directory?',async ()=>{
                const outcome = await findFolderInDirectory(__dirname + "/testData", "lala", 2);
                expect(outcome).toBe(__dirname + "/testData" + "/goodbye" + "/lala");
        })
})