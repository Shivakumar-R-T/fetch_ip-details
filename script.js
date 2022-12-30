

fetch('https://api.ipify.org/?format=json')
.then((res)=>{
    return res.json();
})
  .then((data)=>{
    document.querySelector('#ip').innerHTML=data.ip;
    localStorage.setItem('userIP',data.ip);
  })


    function getData()
    {
        location.href='./After.html';
    }




   