function extractMultiLineSection(text,pattern){
        const splitted = text.split('\n');
        const regex = new RegExp(pattern);
        const sections = []
        let length = -1;
        splitted.forEach(line=>{
            if(regex.test){
                sections.push({header: line, content: ""})
                length += 1
            }else{
                sections[length].content += line + '\n';
            }
        })

        return sections;

}


module.exports = {extractMultiLineSection}