const fs = require('fs').promises

function testDirectoryAccess(){
    return "test successful!!!"
}

async function findFolderInDirectory(initialDirectory,dirPattern,layers){
    
    /*

        Concerns:
                your criteria for a directory is whether a "." exist. However, it is possible for a file to be without a ".".
                    How to get around this problem?
                        This is a way to check if something is a directory or a file: 
                            fs.stat().

                What if it is layer 1 and it is a directory, but not the one you are looking for?
                    The directory would be tested to see if it match. And when it did not, it would have been the end of that loop. So, the next item 
                    would be next. 

                What happens if the number of directory layer specified is more than the actual number of directory layers?
                    It does not matter. If you reach the deepest layer and there is no more directory, the loop will just keep 
                    loop until the end and return a false. 

                Why do you need the layers in the first place?
                    The goal is to gain more precision over the process. The need for precision stems from the worry within the context of having my core project folder
                    be encapsulated within the data and the documentation management project where I am afraid that finding the documentation within a project would cause
                    the documentation tool to also retrieve the custom testing framework documentation as well. When I view a documentation, I want to narrow the scope of 
                    information to be only the project itself and nothing else. 
        
        Steps:
                1. Go through the current directory to see all the contents.
                2. Loop through each content and run fs.stat() on it to check if it is a file or directory
                    1. If file,         -> Move to the next item
                    2. If directory     -> Check if the current layer is 1
                            1. If yes,  -> Check if the current directory matches with the dirPattern
                                    1. if yes,  -> return initialDirectory + `/${directory name}`
                                    2. if no,   -> continue the current loop
                            2. If no,   -> 
                                    1. run the function on itself
                                            - initialDirectory: initialDirectory + `/${directory name}`
                                            - dirPattern: dirPattern
                                            - layers: layers - 1
                                        1. If false
                                            Continue the current loop
                                        2. if it is a link
                                            return the link. 
                                            
                3. End of the loop (This means nothing)
                    return false
    */
    
    const directories = await fs.readdir(initialDirectory,'utf8');
    const length = directories.length;
    for(let i = 0;i<length;i++){
        const current = directories[i];
        const stat = await fs.stat(initialDirectory+`/${current}`);
        if(stat.isDirectory()){
            if(layers !== 1){
                const recursive = await findFolderInDirectory(initialDirectory + `/${current}`,dirPattern,layers-1);
                if(recursive){
                    return recursive;
                }
            }
            if(layers === 1){
                const regex = new RegExp(dirPattern);
                const outcome = regex.test(current)
                if(outcome){
                    return initialDirectory + `/${current}`;
                }
            }
        }
    }
    return false;
}

module.exports = {findFolderInDirectory,testDirectoryAccess}