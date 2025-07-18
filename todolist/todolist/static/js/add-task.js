// function createTask() {
//             const formContainer = document.getElementById('task-container');
//             const newForm = document.createElement('form');
//             newForm.classList = ("mt-3 d-flex gap-3 mx-4 my-4");
//             const radioInput = document.createElement('input');
//             radioInput.type = 'radio';
//             radioInput.className = 'form-check-input';
//             const textInput = document.createElement('input');
//             textInput.type = 'text';
//             textInput.className = 'flex-grow-1';
//             textInput.placeholder = 'description';
//             newForm.appendChild(radioInput);
//             newForm.appendChild(textInput);
//             formContainer.appendChild(newForm);
//         }




// checking if taskcontainer is null before adding it to database
addButton = document.getElementById('add-button');
descriptionContainerEle = document.getElementById('description-container');

function isNull(){
    if(descriptionContainerEle.value != ''){
        addButton.disabled = false
    }
    else addButton.disabled = true
}
// checking complete


// sending csrf token as header in ajax request
$.ajaxSetup({
    headers: {
        'X-CSRFToken': $('meta[name = "csrf-token"]').attr('content')
    }
});

// Deleting a row start: sending ajax post request to server to delete a row in the database
$('.delete-btn').click(function(){
    const taskId = $(this).data('id');
    $.post(`/tasks/delete-task/${taskId}/`, 
            function(response){                 //here checking if server has deleted the row successfully or not based on that changes are made in frontend
        if(response.status === 'success'){
            $(`#task-${taskId}`).remove();
        }
        else{
            alert('Failed to delete task');
        }
    }).fail(() => alert('something went wrong'));
});
//deleting a row completes


//Adding a completed task start: posting id of task to server which should be completed, server just changes the is_active status to false
$('.complete-btn').click(function(){
    const taskId = $(this).data('id');
    $.post(`/tasks/complete-task/${taskId}`,
            function(response){             //here checking if server changed the status, if success moving that task to completed container with striked out desc
                if(response.status === 'success'){
                    const taskElem = $(`#task-${taskId}`);
                    taskElem.addClass('text-decoration-line-through text-muted');
                    taskElem.find('.complete-btn').remove();
                    $('#complete-container').append(taskElem);
                }
                else{
                    alert('Failed to complete the task')
                }
            }).fail(() => alert('something went wrong while completing the task'));
    
});
//moving to complete container complete