
export const dateFormating = (oldDate)=>{
    const date = new Date(oldDate);
    var result = `${date.getFullYear()}-`;
    if(date.getMonth() < 10) result = `${result}0${date.getMonth()+1}-`
    else result = `${result}${date.getMonth()+1}-`
    
    if(date.getDate() < 10) result = `${result}0${date.getDate()} `
    else result = `${result}${date.getDate()} `

    if(date.getHours() < 10) result = `${result}0${date.getHours()}:`
    else result = `${result}${date.getHours()}:`

    if(date.getMinutes() < 10) result = `${result}0${date.getMinutes()}`
    else result = `${result}${date.getMinutes('mm')}`
    
    return result;
}

export const dateCal = (oldDate) =>{
    if(year(oldDate) >= 1) return `${parseInt(year(oldDate))}년 전`;
    if(month(oldDate) >= 1) return `${parseInt(month(oldDate))}달 전`;
    if(day(oldDate) >= 1) return `${parseInt(day(oldDate))}일 전`;
    if(hour(oldDate) >= 1) return `${parseInt(hour(oldDate))}시간 전`;
    if(minute(oldDate) >= 1) return `${parseInt(minute(oldDate))}분 전`;
    return `${second(oldDate)}초 전`;

}

const milliSecond = (oldDate) => {
    const date = new Date(oldDate);
    const now = new Date()
    return now.getTime() - date.getTime();
}
const second = (oldDate) => {
    return milliSecond(oldDate) / 1000;
}
const minute = (oldDate) => {
    return second(oldDate) / 60
}
const hour = (oldDate) => {
    return minute(oldDate) / 60
}
const day = (oldDate) => {
    return hour(oldDate) / 24
}
const month = (oldDate) => {
    return day(oldDate) / 30
}
const year = (oldDate) => {
    return month(oldDate) / 365
}