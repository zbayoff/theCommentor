const commentWrapper = document.querySelector('.comments-wrapper');

commentWrapper.addEventListener('click', deleteComment);

function deleteComment (e) {
    console.log(e);
    if ((e.target).classList.contains('delete')) {
        let commentContainer = $(e.target.parentNode.parentNode.parentNode);
        let commentId = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this comment?')) {
            fetch(`/comments/${commentId}`, {
                method: 'DELETE'
            }).then(function(){
                commentContainer.hide('slow', function () {
                    commentContainer.remove();
                });
            });
        }
    }
    e.stopPropagation();
}