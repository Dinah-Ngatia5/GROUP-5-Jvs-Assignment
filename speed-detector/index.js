const speed = document.getElementById('speed-input')
const btn = document.getElementById('submit-speed')
const speedAnalysis = document.getElementById('speed-analysis')

function analyzeSpeed(carSpeed) {
    if (carSpeed <= 70) {
        speedAnalysis.textContent = 'OK.'
    } else {
        let demeritPoints = Math.floor((carSpeed - 70) / 5)
        demeritPoints > 12
            ? (speedAnalysis.textContent = 'Licence suspended.')
            : (speedAnalysis.textContent = `Demerit Points: ${demeritPoints}`)
    }
}

btn.addEventListener('click', () => {
    analyzeSpeed(speed.value)
})
