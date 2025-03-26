import React, { useState, useEffect } from 'react';
import {useAuth} from './AuthContext'

const SessionWarning = ({ expirationTime }) => {
    const {logout} = useAuth()
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTimeLeft = localStorage.getItem('timeLeft');
    return storedTimeLeft ? Math.floor(storedTimeLeft / 1000) : null;
  });
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (expirationTime === null) return;

    const currentTime = Date.now() / 1000;
    const timeToExpire = (expirationTime - currentTime) * 1000;

    if (timeToExpire <= 0) {
        logout()
        return
    };

    if (timeToExpire <= 120000) {
      setShowWarning(true);
      setTimeLeft(Math.floor(timeToExpire / 1000));
    } else {
      const timeBeforeWarning = timeToExpire - 120000; // 2 minutos antes de expirar

      const warningTimeout = setTimeout(() => {
        setShowWarning(true);
        setTimeLeft(120); // 120 segundos (2 minutos)

        const countdownInterval = setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            const updatedTimeLeft = prevTimeLeft - 1;
            localStorage.setItem('timeLeft', updatedTimeLeft * 1000); // Actualizar localStorage
            if (updatedTimeLeft <= 0) {
              logout()
              clearInterval(countdownInterval);
            }
            return updatedTimeLeft;
          });
        }, 1000);
      }, timeBeforeWarning);

      return () => clearTimeout(warningTimeout);
    }
  }, [expirationTime]);

  useEffect(() => {
    if (timeLeft === null) return;

    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const updatedTimeLeft = prevTimeLeft - 1;
        localStorage.setItem('timeLeft', updatedTimeLeft * 1000); // Actualizar localStorage

        if (updatedTimeLeft <= 0) {
            clearInterval(countdownInterval);
        }
        return updatedTimeLeft;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timeLeft]);

  if (!showWarning || timeLeft === null) return null;

  return (
    <div className="alert alert-warning position-fixed start-50 translate-middle-x p-3" role="alert" style={{ backgroundColor: '#fef3c7',zIndex:'1500'}}>
      <p className="fw-bold">Advertencia!!</p>
      <p>Su sesión expirará en <strong>{timeLeft}</strong> segundos.</p>
      <p> Guarde todos sus trabajos para no perder datos.</p>
    </div>
  );
};

export default SessionWarning;
