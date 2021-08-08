window.onload = getRecipeChart(window.sessionStorage.getItem('status'));
var dataChart;

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
// window.sessionStorage.getItem('uid'),

// async getUserFriends(uid, jwt) {
//   var auth = "Bearer " + jwt;
//   try {
//       const config = {
//           headers: {
//               "content-type": "application/json",
//               "Authorization": auth
//           }
//       };
//       let res = await axios.get(endpoint + "/users/friends/" + uid, config);
//       return res.data;
//   } catch (err) {
//       console.log(err);
//   }
// }



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
}

axios.get('https://mycorsproxy-social.herokuapp.com/https://dwyf-api.herokuapp.com/recipe')
              .then(function (response) {
                let json = response.data;

                let tableText = "";
                json.forEach((recipe) => {
                    tableText += "<tr>";
                    tableText += "<td>"+recipe.name+"</td>";
                    tableText += "<td>"+recipe.foodType+"</td>";
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

