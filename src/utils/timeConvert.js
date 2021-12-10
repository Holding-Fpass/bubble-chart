import { intervalToDuration } from 'date-fns'

const formatTimeNumber = number =>
    number.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

const timeConvert = seconds =>{
    const milliseconds = seconds * 1000

    const { months = 0, days = 0, hours = 0, minutes = 0 } = intervalToDuration({ start: 0, end: milliseconds })
    const monthsToDays = months * 30

    const totalDays = monthsToDays + days
    const daysToHours = totalDays * 24

    const totalHours = hours + daysToHours

    const hoursText = formatTimeNumber(totalHours)
    const minutesText = formatTimeNumber(minutes)

    return { hoursText, minutesText }
}

export { timeConvert }