/* define your functions here */

// multiply the two parameter values and return the result
function calculateTotal(quantity,price){
    return quantity*price;
}

//output the single cart row
function outputCartRow(item ,total){
    let html  =''
     html+='<tr>'
     html+='<td><img src="./images/'+item.product.filename+'"></td>'
     html+='<td>'+item.product.title+'</td>'
     html+='<td>'+item.quantity+'</td>'
     html+='<td>$'+item.product.price.toFixed(2)+'</td>'
     html+='<td>$'+total.toFixed(2)+'</td>'
     html+="</tr>"
     document.write(html)
}







        
