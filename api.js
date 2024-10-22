function getData() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let user = $("#user");
            user.empty();  // Clear previous data
            $.each(data, function (index, value) {
                user.append(
                    `<div class="mb-3">
                        <div> id : ${value.id}</div>
                        <div> userId : ${value.userId}</div>
                        <div> title : ${value.title}</div>
                        <div> body : ${value.body}</div>
                    </div>
                    <hr />`
                );
            });
        },
        error: function (error) {
            console.error("Error fetching user data:", error);
        }
    });
}


function getUserDataForSpecificUser(userID) {
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/${userID}`,
        method: "GET",
        dataType: "json",
        success: function (value) {
            let user = $("#user");
            user.empty();


            user.append(
                `<div class="mb-3">
                    <div> id : ${value.id}</div>
                    <div> userId : ${value.userId}</div>
                    <div> title : ${value.title}</div>
                    <div> body : ${value.body}</div>
                </div>
                <hr />`
            );
        },
        error: function (error) {
            console.error("Error fetching specific user data:", error);
        }
    });
}


function postData() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            userId: '501',
            title: 'You and Me',
            body: 'you & me belongs together like cold ice tea and warm weather.' 
        }),
        success: function (value) {
            let user = $("#user");
            user.empty();


            user.append(
                `<div class="mb-3">
                    <div> id : ${value.id}</div>
                    <div> userId : ${value.userId}</div>
                    <div> title : ${value.title}</div>
                    <div> body : ${value.body}</div>
                </div>
                <hr />`
            );
        },
        error: function (error) {
            console.error("Error posting user data:", error);
        }
    });
}





function putData() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users/1",
        method: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            userId: '500',
            title: 'Peaky Blinders',
            body: 'By order of peaky blinders'
        }),
        success: function (value) {
            let user = $("#user");
            user.empty();


            user.append(
                `<div class="mb-3">
                    <div> id : ${value.id}</div>
                    <div> userId : ${value.userId}</div>
                    <div> title : ${value.title}</div>
                    <div> body : ${value.body}</div>
                </div>
                <hr />`
            );
        },
        error: function (error) {
            console.error("Error posting user data:", error);
        }
    });
}



function patchData() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users/3",
        method: "PATCH",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            userId: '101',
            title: 'Money Heist',
            body: 'La Casa de Papel'
        }),
        success: function (value) {
            let user = $("#user");
            user.empty();


            user.append(
                `<div class="mb-3">
                    <div> id : ${value.id}</div>
                    <div> userId : ${value.userId}</div>
                    <div> title : ${value.title}</div>
                    <div> body : ${value.body}</div>
                </div>
                <hr />`
            );
        },
        error: function (error) {
            console.error("Error posting user data:", error);
        }
    });
}



function deleteData() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users/3",
        method: "DELETE",
        success: function () {
            let user = $("#user");
            user.empty();


            user.append(`<div>User with ID 3 has been deleted successfully.</div>`);
        },
        error: function (error) {
            console.error("Error deleting user data:", error);
        }
    });
}


$(function () {
    $('#button1').on('click', getData);
    $('#button2').on('click', function () {
        getUserDataForSpecificUser(5);
    });
    $('#button3').on('click', postData);
    $('#button4').on('click', putData);
    $('#button5').on('click', patchData);
    $('#button6').on('click', deleteData);
});