window.onload = getRecipeChart();
var dataChart;


async function getRecipeChart() {

  let res = await axios.get('https://mycorsproxy-social.herokuapp.com/https://dwyf-api.herokuapp.com/recipeChart');

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

