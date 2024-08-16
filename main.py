izquierda = False

def evitar_obstaculo():
    global izquierda
    distancia = maqueen.ultrasonic(PingUnit.CENTIMETERS)
    
    if distancia < 20 and distancia != 0:  # Detecta un obstáculo a menos de 20 cm
        izquierda = Math.random_boolean()  # Decide aleatoriamente si girar a la izquierda o derecha
        if izquierda:
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 255)  # Gira a la izquierda
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            basic.pause(500)
        else:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)  # Gira a la derecha
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            basic.pause(500)
    else:
        seguir_linea()  # Si no hay obstáculo, seguir la línea

def seguir_linea():
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 175)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 175)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 175)
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    else:
        maqueen.motor_stop(maqueen.Motors.ALL)

def on_forever():
    evitar_obstaculo()  # Primero intenta evitar obstáculos
    seguir_linea()  # Luego sigue la línea

basic.forever(on_forever)
