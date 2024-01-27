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


module.exports = {extractMultiLineSection}