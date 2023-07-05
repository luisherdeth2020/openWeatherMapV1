export async function fetchData(location = 'palma') {
    const key = import.meta.env.VITE_API_KEY

    const API_LOCATION = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&lang=es`

    // Primera consulta para obtener información location y coordenadas
    const responseWeather = await fetch(API_LOCATION)
    const weatherJson = await responseWeather.json()

    // Extraer latitud y longitud
    const { lat, lon } = weatherJson.coord;
    const API_DAYS = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&lang=es`

    // Realizar segunda consulta usando las coordenadas obtenidas
    const responseDays = await fetch(API_DAYS)
    const daysJson = await responseDays.json()

    return { weather: weatherJson, days: daysJson }
}