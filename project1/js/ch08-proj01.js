
const tax_rate = prompt('Enter tax rate (0.10)');
const shipping_threshold = prompt('Enter shipping threshold (1000)');

/* add loop and other code here ... in this simple exercise we are not
   going to concern ourselves with minimizing globals, etc */
//subtotal
let subTotal = 0
let tax = 0
let threshold = 0

//call function to output table
outputTable()

//calculate the subTotal
function calculateSubTotal(){
   for(let i = 0;i< cart.length;i++){
      let price = parseFloat(cart[i].product.price)
      let quantity = cart[i].quantity
      let total = calculateTotal(quantity,price)
      subTotal = parseFloat(subTotal)+total
   }
   return subTotal
}

//output the subtotal
function outputOtherInfo(){
   let totalInfo = ''
   totalInfo+='<tr class="totals">'
   totalInfo+='<td colspan="4">Subtotal</td>'
   totalInfo+='<td>$'+(calculateSubTotal()).toFixed(2)+'</td>'
   totalInfo+='</tr>'
   totalInfo+='<tr class="totals">'
   totalInfo+='<td colspan="4">Tax</td>'
   totalInfo+='<td>$'+(calculateTax()).toFixed(2)+'</td>'
   totalInfo+='</tr>'
   totalInfo+='<tr class="totals">'
   totalInfo+='<td colspan="4">Shipping</td>'
   totalInfo+='<td>$'+(calculateThreshold()).toFixed(2)+'</td>'
   totalInfo+='</tr>'
   totalInfo+='<tr class="totals">'
   totalInfo+='<td colspan="4" class="focus">Grand Total</td>'
   totalInfo+='<<td class="focus">$'+(calculateGrandTotal()).toFixed(2)+'</td>'
   totalInfo+='</tr>'
   document.write(totalInfo)
}
//output the table
function outputTable(){
   for(let i = 0;i< cart.length;i++){
      let price = parseFloat(cart[i].product.price)
      let quantity = cart[i].quantity
      let total = calculateTotal(quantity,price)
      outputCartRow(cart[i],total)
   }
   outputOtherInfo()
}
//calculate the tax
function calculateTax(){ 
   tax = parseFloat(subTotal) * tax_rate
   return  tax
}

//calculate the threshold
function calculateThreshold(){
   if(subTotal>shipping_threshold){
      threshold = 0
   }else{
      threshold = 40
   }
   return threshold
}

//calculate the grand total
function calculateGrandTotal(){
    return subTotal+tax+threshold
}
