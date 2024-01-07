const speed = document.getElementById('speed-input')
const btn = document.getElementById('submit-speed')
const speedAnalysis = document.getElementById('speed-analysis')

function analyzeSpeed(carSpeed) {
    if (carSpeed <= 70) {
        speedAnalysis.textContent = 'OK.'
    } else {
        // let overTheLimit = carSpeed - 70
        let demeritPoints = Math.floor((carSpeed - 70) / 5)
        speedAnalysis.textContent = `Demerit Points: ${demeritPoints}`
    }
}

btn.addEventListener('click', () => {
    analyzeSpeed(speed.value)
})
