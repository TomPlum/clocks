import styles from './Clock.module.scss'
import {useEffect, useState} from "react";

export const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, []);

  const hours = time.getHours() % 12
  const minutes = time.getMinutes()

  const hourDegrees = (hours + minutes / 60) * 30
  const minuteDegrees = minutes * 6;

  return (
    <div className={styles.Clock}>
      <div
        className={styles.Clock__HourHand}
        style={{ transform: `rotate(${hourDegrees}deg)` }}
      />

      <div
        className={styles.Clock__MinuteHand}
        style={{ transform: `rotate(${minuteDegrees}deg)` }}
      />

      <div className={styles.Clock__CenterDot} />
    </div>
  );
}