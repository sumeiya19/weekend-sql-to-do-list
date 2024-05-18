console.log('JS is sourced!');

function submitTask(event){
    event.preventDefault();
    console.log('Task button clicked!');

    let task = {}

    task.text = document.getElementById("taskIn").value
}