document.addEventListener('DOMContentLoaded', function () {
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
                    handleUploadResponse(response);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    });

    fetchData(); // Move fetchData inside the DOMContentLoaded event

   
});

function fetchData() {
    console.log("tite");
    // Use fetch API to make an asynchronous request to the server
    fetch('resultsBody.php')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            // Update the table with the fetched data
            updateTable(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateTable(data) {
    console.log('Updating table with data:', data);
    const resultsBody = document.getElementById('resultsBody');

    // Clear existing table rows
    resultsBody.innerHTML = '';

    // Loop through the fetched data and append rows to the table
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.name}</td><td>${row.startTime}</td><td>${row.contentID}</td>`;
        resultsBody.appendChild(tr);
    });
}
