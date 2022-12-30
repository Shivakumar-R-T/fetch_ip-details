let IP=localStorage.getItem('userIP');
let lat= document.querySelector('.lat');
let long= document.querySelector('.long');
let city= document.querySelector('.city');
let org= document.querySelector('.org');
let region=document.querySelector('.region');
let host=document.querySelector('.host');

document.querySelector('#fetched-ip').innerHTML=IP;


let map=document.querySelector('.map');

function geoMap()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(successFunction);
    }
    else 
    {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
    }   
}    


function successFunction(position) 
{
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    map.innerHTML=` <iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" width="100%"
       height="400" frameborder="0" style="border:0"></iframe>`;


    
       
    
}
geoMap();


fetch("https://ipinfo.io/157.50.67.71?token=e9f72f90da2968")
.then((res)=>{
  return res.json();
})
.then((data)=>{
    console.log(data);
    let area=data.loc;
    let arr=area.split(",")
    console.log(arr[0]);

 
   lat.innerHTML=arr[0];
   long.innerHTML=arr[1];

   city.innerHTML=data.city;
   org.innerHTML=data.org;
   region.innerHTML=data.region;

   let time_Zone=document.querySelector('.zone').innerHTML=data.timezone;

   let pin=document.querySelector('.pin').innerHTML=data.postal;
  
   


   fetch(`https://api.postalpincode.in/pincode/${data.postal}`)
   .then((result)=>{
    return result.json();

   }).then((val)=>{
   
   
    let datetime_str = new Date().toLocaleString("en-US", { timeZone: time_Zone });

    let date=document.querySelector('.date').innerHTML=datetime_str;

    let msg=document.querySelector('.msg').innerHTML=val["0"].Message;

    let office=val["0"].PostOffice;


    
    let postdata="";

    office.map((data)=>{
        postdata+=`<div class="btm-data">
        <div>Name :  <span>${data.Name} </span></div>
        <div>Branch Type :  <span>${data.BranchType} </span></div>
        <div>Delivery Status :  <span>${data.DeliveryStatus} </span> </div>
        <div>District :  <span>${data.District}  </span></div>
        <div>Division :  <span>${data.Division}  </span></div>
    </div>`
   


     })
     document.querySelector('.btm').innerHTML=postdata;
    
    
   })

})










 