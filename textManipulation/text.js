function extractMultiLineSection(text,pattern){
        const splitted = text.split('\n');
        const regex = new RegExp(pattern);
        const sections = [];
        let length = -1;
        splitted.forEach((line,index)=>{
            if(regex.test(line)){
                sections.push({header: line, content: ""})
                length += 1
            }else if(length !== -1){
                sections[length].content += line  + '\n';
            }
        })
        return sections;
}


/*
        TO DELETE: 
            Why are you creating this function in the first place?
                The normal JSON.stringify does not cut it as the way I retrieve data is through new line character.
                    Reason for needing new line character: For manual viewing (Just in case).

*/ 
/* DOCUMENTATION: Notes
    Subject name: The indentation for "{"
        There is no indentation for any "{" as each additional indentation (Parameter) causes the distance between "{" and the key to increase
        dramatically.   
            e.g.
                {
                    "one": "1",
                    "two":     {                                // PROBLEM 1
                        "1": "1",
                        "2":         {                          // PROBLEM 2
                            "something": "nothing",
                        },
                    },
                    "three": "3",
                }
*/
function objectToReadableString(object,indent=0){
        let string = "{\n"
            for(const key in object){
                const current = object[key];
                let str = `    `.repeat(indent);
                if(typeof current === "object"){
                    
                    str+= `    "${key}": ` + objectToString(current,indent+1) + ",\n"
                }
                else if(typeof current === "string" || typeof current === "number"){
                    str += `    "${key}": "${object[key]}",\n`;
                }else{
                    throw new Error("objectToString function only accepts objects or strings as its value.");
                }
                
                string+=str;
            }
        string += indent === 0 ? "}" : "    ".repeat(indent)+"}";
        return string;
}

module.exports = {extractMultiLineSection,objectToReadableString}