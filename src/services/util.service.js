export function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

//capitalize all words of a string. 
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseWeatherDescToCondition(str = null) {
    if (!str) return
    const phrase = str.toLowerCase()
    if (phrase.includes('sun')) return 'sunny'
    else if (phrase.includes('clear')) return 'moon'
    else if (phrase.includes('fog')) return 'foggy'
    else if (phrase.includes('haze')) return 'haze'
    else if (phrase.includes('rain') || phrase.includes('showers')) return 'rainy'
    else if (phrase.includes('snow')) return 'snowy'
    else if (phrase.includes('storm')) return 'stormy'
    else return 'cloudy'
}

export function getDayByDate(d) {
    const date = new Date(d)
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if (new Date().getDate() === date.getDate()) return 'Today';
    return weekDays[date.getDay()]
}

export function temperatureStr(temperature, unit = 'f') {
    return `${temperature[unit].minVal}-${temperature[unit].maxVal} °${unit.toUpperCase()}`
}

export function convertFToC(fVal) {
    return Math.round((fVal - 32) / 1.8);
}

export function convertCToF(cVal) {
    return Math.round(cVal * 1.8 + 32);
}
