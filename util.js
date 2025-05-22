export function formatDate(dateInput){
    const date = new Date(dateInput);
    if(isNaN(date)){
        return "Invalid date";
    }

    const year = date.getFullYear();
    const month =  (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}- ${month}-${day}`;
}