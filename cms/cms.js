$(document).ready(function () {
    
    $("#inputfile").change(function () {
        
        var formData = new FormData();
        formData.append('file', $('#inputfile')[0].files[0]);
        formData.append('submit', true);

        
        $.ajax({
            url: 'uploadvideo.php', 
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                
                if (response === 'success') {
                    alert("File uploaded successfully!");
                } else if (response === 'error') {
                    alert("Error inserting details into the database");
                } else if (response === 'invalid') {
                    alert("Invalid file extension");
                } else if (response === 'no_file') {
                    alert("Please select a file");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});