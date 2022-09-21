const cityName = document.getElementById('cityName')
const submitBtn = document.getElementById('submitBtn');
const city_name  = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer');

const getInfo = async(event)=>{
    event.preventDefault();

    let input = cityName.value;
    if(input == ""){
        city_name.innerHTML = `Please write the city name before searching`;
        dataHide.classList.add('data_hide');
       
    }
    else{
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=27b7d9528039663214eef8225b57730f`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data]
            temp.innerHTML = arrData[0].main.temp;
            city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;

            const tempMood = arrData[0].weather[0].main;
            if(tempMood == "Clear"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            else if(tempMood == "Clouds"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#f1f2f6;'></i>";
            }
            else if(tempMood == "Rain"){
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";
            }
            else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#f1f2f6;'></i>";
            }
            dataHide.classList.remove('data_hide');

        }catch{
            city_name.innerHTML = `Please enter the city name properly`;
            dataHide.classList.add('data_hide');
        }
        
    }
}

submitBtn.addEventListener('click', getInfo)