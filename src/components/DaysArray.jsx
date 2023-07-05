const DaysArray = ({ weatherInfo, element }) => {
    return (
        <>
            <p>
                {weatherInfo.days.list[element].dt_txt.substring(8, 10)}/
                {weatherInfo.days.list[element].dt_txt.substring(5, 7)}/
                {weatherInfo.days.list[element].dt_txt.substring(0, 4)}
            </p>
            <span className="temp-info">
                {weatherInfo.days.list[element].dt_txt.substring(11, 13)}:
                {weatherInfo.days.list[element].dt_txt.substring(14, 16)}h
            </span>
            <div className="temp-img">
                <img src={`http://openweathermap.org/img/w/${weatherInfo.days.list[element].weather[0].icon}.png`} alt="icon" />
            </div>
            <div className="temp">
                {(weatherInfo.days.list[element].main?.temp - 273.15).toFixed()}ºC
            </div>
            <h4>{weatherInfo.days.list[element].weather[0]?.description}</h4>
        </>
    )
}
export default DaysArray