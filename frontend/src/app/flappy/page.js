"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [yPosition, setYPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [obstacleX, setObstacleX] = useState(0);
  const [obstacleIndex, setObstacleIndex] = useState(0);
  const [obstaclesPassed, setObstaclesPassed] = useState(0);
<<<<<<< HEAD
  const gravity = 0.5;
  const obstacleWidth = 65;
  const [speed, setSpeed] = useState(7);
  const [gameOver, setGameOver] = useState(false);

  const obstacleConfigurations = [
    { topHeight: 310, bottomHeight: 310, color: '#0f9d58', gap: 170 },
    { topHeight: 480, bottomHeight: 120, color: '#ff9800', gap: 170 },
    { topHeight: 190, bottomHeight: 430, color: '#e91e63', gap: 170 },
    { topHeight: 360, bottomHeight: 260, color: '#9e9e9e', gap: 170 },
    { topHeight: 390, bottomHeight: 230, color: '#3f51b5', gap: 170 },
    { topHeight: 100, bottomHeight: 520, color: '#f44336', gap: 170 },
    { topHeight: 130, bottomHeight: 490, color: '#9c27b0', gap: 170 },
    { topHeight: 190, bottomHeight: 430, color: '#2196f3', gap: 170 },
    { topHeight: 530, bottomHeight: 90, color: '#ff9800', gap: 170 },
    { topHeight: 450, bottomHeight: 170, color: '#8bc34a', gap: 170 },
    { topHeight: 380, bottomHeight: 220, color: '#4caf50', gap: 170 },
    { topHeight: 450, bottomHeight: 170, color: '#ffeb3b', gap: 170 },
    { topHeight: 410, bottomHeight: 210, color: '#673ab7', gap: 170 },
    { topHeight: 480, bottomHeight: 120, color: '#ff9800', gap: 170 },
    { topHeight: 520, bottomHeight: 100, color: '#ffeb3b', gap: 170 },
    { topHeight: 530, bottomHeight: 90, color: '#ff9800', gap: 170 },
  ];

  const jump = () => {
    setVelocity(-10);
=======
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(7);
  const [gravity, setGravity] = useState(0.5);
  const [gameStarted, setGameStarted] = useState(false); // Estado para controlar el inicio del juego
  const [countdown, setCountdown] = useState(3); // Estado para el contador de 3 segundos
  const [points, setPoints] = useState(0); // Puntajes del juego
  const obstacleWidth = 60;

  // Estado para saber si un obstáculo ha sido pasado
  const [passedObstacles, setPassedObstacles] = useState(new Set()); 

  const obstacleConfigurations = [
    { topHeight: 310, bottomHeight: 310, color: '#0f9d58', gap: 164 },
    { topHeight: 480, bottomHeight: 120, color: '#ff9800', gap: 164 },
    { topHeight: 190, bottomHeight: 430, color: '#e91e63', gap: 164 },
    { topHeight: 360, bottomHeight: 260, color: '#9e9e9e', gap: 164 },
    { topHeight: 390, bottomHeight: 230, color: '#3f51b5', gap: 164 },
    { topHeight: 100, bottomHeight: 520, color: '#f44336', gap: 164 },
    { topHeight: 130, bottomHeight: 490, color: '#9c27b0', gap: 164 },
    { topHeight: 190, bottomHeight: 430, color: '#2196f3', gap: 164 },
    { topHeight: 530, bottomHeight: 90, color: '#ff9800', gap: 164 },
    { topHeight: 450, bottomHeight: 170, color: '#8bc34a', gap: 164 },
    { topHeight: 380, bottomHeight: 220, color: '#4caf50', gap: 164 },
    { topHeight: 450, bottomHeight: 170, color: '#ffeb3b', gap: 164 },
    { topHeight: 410, bottomHeight: 210, color: '#673ab7', gap: 164 },
    { topHeight: 480, bottomHeight: 120, color: '#ff9800', gap: 164 },
    { topHeight: 520, bottomHeight: 100, color: '#ffeb3b', gap: 164 },
    { topHeight: 530, bottomHeight: 90, color: '#ff9800', gap: 164 },
  ];

  const jump = () => {
    if (gameOver || !gameStarted) return; // No incrementes los puntos si el juego ha terminado o no ha comenzado
    setVelocity(-9); // El círculo sube cuando se hace clic
    setPoints((prevPoints) => prevPoints + 1); // Incrementa los puntos al saltar
>>>>>>> 09498aa8d8fcb62b2f75d93200b2ff9068ecff8b
  };

  useEffect(() => {
    setYPosition(window.innerHeight / 2 - 25);
  }, []);

  useEffect(() => {
    const handleClick = () => jump();
    window.addEventListener('click', handleClick);

    // Contador de 3 segundos antes de comenzar el juego
    if (!gameStarted) {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000); // Disminuir cada segundo
        return () => clearInterval(timer); // Limpiar el temporizador cuando el componente se desmonte
      } else {
        setGameStarted(true); // Comienza el juego cuando el contador llega a 0
        setCountdown(0); // Para asegurarnos de que el contador no vuelva a mostrarse
        jump(); // Realiza un salto automático cuando el juego comienza
      }
    }

    const gameLoop = () => {
      if (gameOver) return;

      setVelocity((prev) => prev + gravity);
      setYPosition((prev) => {
        const newY = prev + velocity;
        if (newY > window.innerHeight - 50) return window.innerHeight - 50;
        if (newY <= 0) {
          setGameOver(true);
        }
        return newY < 0 ? 0 : newY;
      });

      setObstacleX((prev) => {
        const newX = prev - speed;
        if (newX < -obstacleWidth) {
          const randomIndex = Math.floor(Math.random() * obstacleConfigurations.length);
          setObstacleIndex(randomIndex);
          setObstaclesPassed((prev) => prev + 1);
          return window.innerWidth;
        }
        return newX;
      });

      if (isColliding()) {
        setGameOver(true);
      }
    };

    const interval = setInterval(gameLoop, 16);

    return () => {
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
    };
  }, [velocity, gravity, speed, gameOver, gameStarted, countdown]);

  useEffect(() => {
    if (obstaclesPassed > 0 && obstaclesPassed % 3 === 0) {
      setSpeed((prevSpeed) => prevSpeed + 0.5);
    }
  }, [obstaclesPassed]);

  // Lógica para sumar 15 puntos cuando se pasa un obstáculo (cuando obstacleX es menor que la posición de "Flappy")
  useEffect(() => {
    const birdLeft = window.innerWidth * 0.60 - 25; // Posición horizontal de Flappy
    const birdRight = birdLeft + 50; // Ancho de Flappy

    // Verificar si el obstáculo ya ha sido pasado usando un Set
    if (obstacleX + obstacleWidth < birdRight && obstacleX + obstacleWidth > birdLeft) {
      if (!passedObstacles.has(obstacleIndex)) {
        setPoints((prevPoints) => prevPoints + 15); // Sumar 15 puntos al pasar un obstáculo
        setObstaclesPassed((prev) => prev + 1); // Incrementar el contador de obstáculos pasados
        setPassedObstacles((prev) => new Set(prev).add(obstacleIndex)); // Marcar el obstáculo como pasado
      }
    }
  }, [obstacleX, obstacleIndex, passedObstacles]); // Ejecutar cuando cambian obstacleX y obstacleIndex

  const isColliding = () => {
<<<<<<< HEAD
    const birdBottom = yPosition + 50;
    const birdTop = yPosition;
    const birdLeft = window.innerWidth / 2 - 25;
    const birdRight = window.innerWidth / 2 + 25;
=======
    const birdBottom = yPosition + 50; // Parte inferior del círculo
    const birdTop = yPosition; // Parte superior del círculo
    const birdLeft = window.innerWidth * 0.60 - 25; // Calculamos la posición horizontal en base al 60% de la pantalla
    const birdRight = birdLeft + 50; // Ancho del círculo
>>>>>>> 09498aa8d8fcb62b2f75d93200b2ff9068ecff8b

    const { topHeight, bottomHeight, gap } = obstacleConfigurations[obstacleIndex];

    const bottomObstacleTop = window.innerHeight - bottomHeight;
    const topObstacleBottom = bottomObstacleTop - gap;

    const hitBottomObstacle =
      obstacleX < birdRight &&
      obstacleX + obstacleWidth > birdLeft &&
      birdBottom > bottomObstacleTop;

    const hitTopObstacle =
      obstacleX < birdRight &&
      obstacleX + obstacleWidth > birdLeft &&
      birdTop < topObstacleBottom;

    return hitBottomObstacle || hitTopObstacle;
  };

<<<<<<< HEAD
  if (gameOver || isColliding()) {
    return <div style={{ ...styles.container, backgroundColor: 'red' }}>¡Game Over!</div>;
=======
  const restartGame = () => {
    // Reiniciar el juego
    setYPosition(window.innerHeight / 2 - 25);
    setVelocity(0);
    setObstacleX(window.innerWidth);
    setObstaclesPassed(0);
    setGameOver(false);
    setSpeed(7);
    setPoints(0);
    setGameStarted(false);
    setCountdown(3);
    setPassedObstacles(new Set());
  };

  if (gameOver) {
    return (
      <div style={styles.gameOverContainer}>
        <div style={styles.gameOverText}>¡Juego Terminado!</div>
        <div style={styles.finalScore}>Juador 1: {points}</div>
        <button style={styles.restartButton} onClick={restartGame}>
          Reiniciar Juego
        </button>
      </div>
    );
  }

  // Mostrar el contador antes de comenzar el juego
  if (!gameStarted && countdown > 0) {
    return (
      <div style={styles.container}>
        <div style={{
          ...styles.countdown,
          top: `${yPosition - 60}px`, // Ubicamos el contador arriba del "flappy"
        }}>
          {countdown}
        </div>
      </div>
    );
>>>>>>> 09498aa8d8fcb62b2f75d93200b2ff9068ecff8b
  }

  const { topHeight, bottomHeight, color, gap } = obstacleConfigurations[obstacleIndex];

  return (
    <div style={styles.container}>
      <div style={{
        ...styles.circle,
<<<<<<< HEAD
        top: `${yPosition}px`,
        backgroundColor: 'red',
=======
        top: `${yPosition}px`, // Controla la posición vertical del círculo
        backgroundColor: 'red',
        left: '60%', // Mueve el círculo un poco más a la derecha
>>>>>>> 09498aa8d8fcb62b2f75d93200b2ff9068ecff8b
      }} />
      <div style={{
        position: 'absolute',
        left: `${obstacleX}px`,
        bottom: '0',
        width: `${obstacleWidth}px`,
        height: `${bottomHeight}px`,
        backgroundColor: color,
        border: '3px solid black',
        boxSizing: 'border-box',
      }} />
      <div style={{
        position: 'absolute',
        left: `${obstacleX}px`,
        top: '0',
        width: `${obstacleWidth}px`,
        height: `${topHeight}px`,
        backgroundColor: color,
        border: '3px solid black',
        boxSizing: 'border-box',
        bottom: `calc(100vh - ${bottomHeight + gap}px)`,
      }} />
      {/* Mostrar puntaje */}
      <div style={styles.score}>
        Jugador 1: {points}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#87CEEB',
  },
  circle: {
    position: 'absolute',
    left: '50%',
    top: '0',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    transform: 'translateX(-50%)',
  },
  countdown: {
    position: 'absolute',
    fontSize: '100px',
    color: 'white',
    fontWeight: 'bold',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  score: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    fontSize: '30px',
    color: 'white',
    fontWeight: 'bold',
  },
  gameOverContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '40px',
    borderRadius: '10px',
    color: 'white',
  },
  gameOverText: {
    fontSize: '50px',
    fontWeight: 'bold',
  },
  finalScore: {
    fontSize: '30px',
    marginTop: '20px',
  },
  restartButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '20px',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
