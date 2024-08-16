let distancia = 0
let izquierda = false
// Si no hay obstáculo, seguir la línea
function seguir_linea () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 175)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 175)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 175)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
}
function evitar_obstaculo () {
    distancia = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (distancia < 20 && distancia != 0) {
        // Detecta un obstáculo a menos de 20 cm
        izquierda = Math.randomBoolean()
        // Decide aleatoriamente si girar a la izquierda o derecha
        if (izquierda) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
            // Gira a la izquierda
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            basic.pause(500)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            // Gira a la derecha
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            basic.pause(500)
        }
    } else {
        seguir_linea()
    }
}
// Luego sigue la línea
basic.forever(function () {
    evitar_obstaculo()
    // Primero intenta evitar obstáculos
    seguir_linea()
})
