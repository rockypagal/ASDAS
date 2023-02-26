import {allData} from './library.js';


//variables

let submit = document.querySelector('#submit');
let submitOtp = document.querySelector('#submitOtp');
let heading = document.querySelector('.heading');
let degree;
let sem;
let enroll;
let stdName;
let stdOtp;
let otp;
let student;
let attendance;
let error=0; 
let nameCode ;
let enrolCode ;




// Submit click event && Enrollment Verification 

submit.addEventListener('click',(e)=>{
    e.preventDefault();
     
    
    enroll = document.querySelector('#enrolnum').value;
    sem = document.querySelector('#sem').value;
    degree = document.querySelector('#degree').value;
    degree = String(degree).toUpperCase();


 if(degree == 'MCA' && sem == 2){
  student = allData[0].mca2Std;
  attendance =allData[0].mca2Attend ;
  nameCode= allData[0].nameFormCode;
  enrolCode = allData[0].enrolFormCode ;

}
 else if(degree == 'MSCIT' && sem == 2){
  student = allData[1].mscit2Std;
  attendance = allData[1].mscit2Attend;
   nameCode= allData[1].nameFormCode;
  enrolCode = allData[1].enrolFormCode ;
}

else if(degree == 'MCA' && sem == 4){
  student = allData[2].mca4Std;
  attendance = allData[2].mca4Attend;
   nameCode= allData[2].nameFormCode;
  enrolCode = allData[2].enrolFormCode ;
}

else if(degree == 'BCA' && sem == 2){
  student = allData[3].bca2Std;
  attendance = allData[3].bca2Attend;
   nameCode= allData[3].nameFormCode;
  enrolCode = allData[3].enrolFormCode ;
}

else{
  
  alert('wrong information');
  // --window.location.reload();

}
   



    fetch(student)
    .then(response=> response.json())
    .then(data=>{

        for(let i=0; i < data.length; i++){
        let check = data[i].enroll;
        
       if(enroll == check){
         $('#enrollForm').hide();
         $('#matchEnrol').show(); 
        error=1;
        heading.innerHTML="Student information !";
        document.querySelector('#stdName').value=data[i].name;
        stdName= data[i].name;
        console.log(stdName);
        document.querySelector('#stdEnrol').value=data[i].enroll;
    }
    
    }
    if(!error)
    {
      alert('wrong enrollment number');
     }
    })
    
});


//OTP verification function && Present Ajax function 

submitOtp.addEventListener('click', function(e){
  e.preventDefault();
  
  stdOtp = document.querySelector('#OTP').value;
  fetch('https://opensheet.elk.sh/1rCgup_JYwynDpkwuhQE0E9V0QYwpUVvOUI9oBDZoSBo/otp')
  .then(response=> response.json())
  .then(data=>{
    otp = data[0].code;

    if(otp == stdOtp){


       $.ajax({
    url: attendance,
    data:{[nameCode]: enroll,[enrolCode]:stdName,},
    type: "POST",
    dataType: "xml",
    error: function () {
    alert('data sent successfully');
      --window.location.reload();
    },
  });



    }
    else{
      alert('wrong code');
    }
  })
});





// https://docs.google.com/forms/u/0/d/e/1FAIpQLSexu87iArcDCKdRkyJCpf2azXq0tA0cVImLC7zc5U0UvvhQ2A/formResponse
// entry.1476947470    
    