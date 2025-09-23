export default function Deadline(Deadline){
    console.log("Deadline "+ Deadline.Deadline);
    const date = new Date(Deadline.Deadline);
    return <>{date.toDateString() + ","+ date.toLocaleTimeString()}</>
}