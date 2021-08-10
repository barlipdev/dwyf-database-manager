window.onload = getRecipeChart(window.sessionStorage.getItem('status'));
var dataChart;

if (window.sessionStorage.getItem('status') == null){
  swal("Sesja wygasła!","Musisz zalogować się jeszcze raz :)", "error").then(() => {
    window.location.href = "login.html";
  });;
}

$("#recipeTable").on('click', '#removeRecipe', function () {
  deleteRecipe($(this).closest("tr")[0].id);
  $(this).closest('tr').remove();
});

async function deleteRecipe(id){
  var auth = "Bearer " + window.sessionStorage.getItem('status');
  const config = {
    headers: {
        "content-type": "application/json",
        "Authorization": auth
    }
  };
  let res = await axios.delete('https://mycorsproxy-social.herokuapp.com/https://dwyf-api.herokuapp.com/recipe/'+id,config);
  swal("Udało się!","Usunąłeś przepis :)", "success");
}

function searchBar() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("recipeTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

async function getRecipeChart(jwt) {
  var auth = "Bearer " + jwt;
  const config = {
    headers: {
        "content-type": "application/json",
        "Authorization": auth
    }
  };  

  let res = await axios.get('https://mycorsproxy-social.herokuapp.com/https://dwyf-api.herokuapp.com/recipe/chart',config);

  let data = res.data;
  dataChart = res.data;
  new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Śniadanie", "Obiad", "Deser", "Kolacja", "Inne"],
      datasets: [{
        label: "Rodzaje przepisów w bazie danych",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: dataChart
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Rodzaje przepisów w bazie danych'
      }
    }
  });

  await axios.get('https://mycorsproxy-social.herokuapp.com/https://dwyf-api.herokuapp.com/recipe/all',config)
  .then(function (response) {
    let json = response.data;

    let tableText = "";
    json.forEach((recipe) => {
        tableText += "<tr id='"+recipe.id+"'>";
        tableText += "<td>"+recipe.name+"</td>";
        tableText += "<td>"+recipe.foodType+"</td>";
        tableText += "<td>"+"<button id='removeRecipe' type='submit' class='btn btn-danger'>Usuń</button>"+"</td>";
        tableText += "</tr>";
    });

    document.getElementById('tableBody').innerHTML = tableText;
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
});

}



// Change the selector if needed
var $table = $('#recipeTable'),
    $bodyCells = $table.find('tbody tr:first').children(),
    colWidth;

// Get the tbody columns width array
colWidth = $bodyCells.map(function() {
    return $(this).width();
}).get();

// Set the width of thead columns
$table.find('thead tr').children().each(function(i, v) {
    $(v).width(colWidth[i]);
});    

