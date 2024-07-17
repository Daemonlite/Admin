import { Parser } from "@/../node_modules/@json2csv/plainjs/dist/mjs";

function useExportToCSV(data, filename, options={}){
    if(data.length > 0){

        try {
            const opts = options;
            const parser = new Parser(opts);
            const csv = parser.parse(data);
            const element = document.createElement("a");
        
            element.setAttribute("href", `data:text/csv;charset=utf-8, ${csv}`);
            element.setAttribute("download", filename);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          } catch (err) {
            console.error(err);
          }
    }else{
        alert("Select items to export!!!")
    }
}

export default useExportToCSV
