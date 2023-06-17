var services=[];
let servicesdiv=document.querySelector(".header .reservation-box .services");
let servicesBox=document.querySelector(".header .reservation-box .services-box");
var selectBox = document.getElementById("selectServices");
var deleteService=document.querySelector(".header .reservation-box .services")
var errorMessages=document.querySelectorAll(".error-message");
var customerName=document.getElementById("customerName");
var customerPhone=document.getElementById("customerPhone");
var customerEmail=document.getElementById("customerEmail");
console.log(errorMessages)
var reservationForm=document.getElementById("reservationForm");



//check the validity of customer name
checkCustomerName=()=>{
    if(customerName.value==""){

        errorMessages[0].textContent="هذا الحقل مطلوب";
        return false;
    }
    else if(!customerName.value.match(/^[\u0600-\u06ff\s]+$/)){
        errorMessages[0].textContent="ادخل اسم صحيج";
        return false;
    }
    else{
        errorMessages[0].textContent="";
        return true;
    }
}
//check the validity of email
checkCustomerPhone=()=>{
    if(customerPhone.value==""){

        errorMessages[1].textContent="هذا الحقل مطلوب";
        return false;
    }
    else if(!customerPhone.value.match(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
        errorMessages[1].textContent="رقم الهاتف غير صحيح";
        return false;
    }
    else{
        errorMessages[1].textContent="";

        return true;

    }
}

//check the validity of email
checkCustomerEmail=()=>{
    if(customerEmail.value==""){

        errorMessages[2].textContent="هذا الحقل مطلوب";
        return false;
    }
    else if(!customerEmail.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)){
        errorMessages[2].textContent="البريد الإلكتروني غير صحيح";
        return false;
    }
    else{
        errorMessages[2].textContent="";

        return true;

    }
}

//check if user select at least one service
checkServices=()=>{
    if(services.length<=0){
        errorMessages[3].textContent="يجب اختيار خدمة واحدة علي الاقل";
        return false;
    }
    else{
        errorMessages[3].textContent="";
        return true;
    }
}

//when select from select box
selectBox.addEventListener("change", (e) => {
    // log(`e.target`, e.target);
    const select = e.target;
    const service = select.selectedOptions[0].text;
    
    if(services.length==0){
        services.push(service);
        errorMessages[3].textContent="";

    }else{
        let checkExist=services.filter((value)=>value==service);
        console.log(checkExist);
        if(checkExist.length>0){
            console.log("true")
        }else{
            services.push(service);
            errorMessages[3].textContent="";

        }
    }
    //DON'T DISPLAY THE SELECTED SERVICES DIV IF USER DON'T SELECT ANY SERVICE YET
    if(services.length>0){
        servicesBox.style.display="block";
    }
    else{
        servicesBox.style.display="none";


    }
    servicesdiv.innerHTML="";

    services.forEach((service,index)=>{
        servicesdiv.innerHTML+=
        `
        <span class="service">`+service+`
            <span class="delete-service" id="`+index+`"><i class="fa-solid fa-circle-xmark"></i></span>
        </span>
        
        `
    })
  });


  //delete selected service
  document.onclick=function(e){

    if(e.target.parentElement.classList.contains('delete-service')){
       var id=e.target.parentElement.id;
       services.splice(id,1);
       if(services.length>0){
        servicesBox.style.display="block";
    }
    else{
        servicesBox.style.display="none";


    }
       servicesdiv.innerHTML="";
       services.forEach((service,index)=>{
        servicesdiv.innerHTML+=
        `
        <span class="service">`+service+`
            <span class="delete-service" id="`+index+`"><i class="fa-solid fa-circle-xmark"></i></span>
        </span>
        
        `
    })
    }
  }


  
//submit form 
reservationForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(checkCustomerName()&&checkCustomerPhone()&&checkCustomerEmail()&&checkServices()){
        const data = {name:customerName.value,phone:customerPhone.value, email:customerEmail.value, services:services};
        console.log(data);
    

    //code to save data in Api


    // fetch('https://goldblv.com/api/hiring/tasks/register',  {
    //   method: 'POST',
    
    //   headers: {
    //   'Content-Type':'application/json',
    //   'Access-Control-Allow-Origin':'*',
    //  },
    //  mode: 'no-cors',
    //   body: JSON.stringify(data),
    // })
    // .then(res=>res.json())
    // .then((data) => {
    //    
    //     console.log('Success:', data);
        
    //  })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
    }
    else{
       
    
        checkCustomerName();
        checkCustomerPhone();
        checkCustomerEmail();
        checkServices();
    }
    })
    