
var products = [];
var button = document.getElementById('addRecipeButton');
var button2 = document.getElementById('addProductButton');
//table operations
$("#productTable").on('click', '#removebtn', function () {
    $(this).closest('tr').remove();
    for (var i=0;i<products.length;i++){
        if (products[i].name == $(this).closest('tr')[0].childNodes[0].childNodes[0].innerHTML){
            products.splice(i,1);
        }
    }
});
button.addEventListener('click',function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else{
            addRecipe();
          }
          form.classList.add('was-validated')
        }, false)
  })
  button2.addEventListener('click',function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation2')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else{
            addRow('productTable');
            swal("Super!","Dodałeś "+ $( "#productForm" ).serializeArray()[0].value +"!", "success");
          }
          form.classList.add('was-validated')
        }, false)
  })

async function addRecipe() {
  var auth = "Bearer " + window.sessionStorage.getItem('status');
  const config = {
    headers: {
        "content-type": "application/json",
        "Authorization": auth
    }
  };  

    let payload = { 
        name: $( "#recipeForm" ).serializeArray()[0].value,
        foodType: $( "#recipeForm" ).serializeArray()[1].value,
        description: $( "#recipeForm" ).serializeArray()[2].value,
        productList: products 
    };

    let res = await axios.post('https://mycorsproxy-social.herokuapp.com/https://dwyf-api.herokuapp.com/recipe', payload,config);

    let data = res.data;
    console.log(data);
    swal("Super!","Świetnie dodałeś przepis o nazwie "+ $( "#recipeForm" ).serializeArray()[0].value +"!", "success").then(() => {
      window.location.reload(true);
    });;
}


function addRow(tableID) {

    var product = {};

    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var element1 = document.createElement("td");
    element1.innerHTML = $( "#productForm" ).serializeArray()[0].value;
    element1.className = "lead";
    cell1.appendChild(element1);
    product['name'] = $( "#productForm" ).serializeArray()[0].value;

    var cell2 = row.insertCell(1);
    var element2 = document.createElement("td");
    element2.innerHTML = $( "#productForm" ).serializeArray()[1].value;
    element2.className = "lead";
    cell2.appendChild(element2);
    product['productTag'] = $( "#productForm" ).serializeArray()[1].value;

    var cell3 = row.insertCell(2);
    var element3 = document.createElement("td");
    element3.innerHTML = $( "#productForm" ).serializeArray()[2].value;
    element3.className = "lead";
    cell3.appendChild(element3);
    product['count'] = $( "#productForm" ).serializeArray()[2].value;

    var cell4 = row.insertCell(3);
    var element4 = document.createElement("td");
    element4.className = "lead";
    element4.innerHTML = $( "#productForm" ).serializeArray()[3].value;
    cell4.appendChild(element4);
    product['productType'] = $( "#productForm" ).serializeArray()[3].value;

    products.push(product);
    var cell5 = row.insertCell(4);
    var element5 = document.createElement("button");
    element5.id = "removebtn";
    element5.type = "button";
    element5.className = "btn btn-danger";
    element5.innerHTML = "Usuń";
    cell5.appendChild(element5);

}

function deleteRow(tableID) {
    try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    for(var i=0; i<rowCount; i++) {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        if(null != chkbox && true == chkbox.checked) {
            table.deleteRow(i);
            rowCount--;
            i--;
        }


    }
    }catch(e) {
        alert(e);
    }
}