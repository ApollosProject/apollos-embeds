import { useState, useEffect } from 'react';
import {
  isWithinInterval,
  isBefore,
  differenceInMilliseconds,
  addSeconds,
  parseISO,
  isValid,
} from 'date-fns';

const useLivestreamStatus = (livestream) => {
  const id = livestream?.id;
  const start = livestream?.start;
  const durationInSeconds = livestream?.durationInSeconds;
  const [isLive, setIsLive] = useState(false);
  const [comingUp, setComingUp] = useState(false);

  useEffect(() => {
    if (!start || !durationInSeconds) {
      return () => null;
    }

    let liveStreamStart = parseISO(start);

    if (!isValid(liveStreamStart)) {
      console.warn(`Invalid start of livestream (${start}) with id (${id})`);
      return;
    }

    const liveStreamEnd = addSeconds(liveStreamStart, durationInSeconds);
    const now = new Date();
    let timeouts = [];

    // The Live Stream is currently LIVE
    if (
      isWithinInterval(now, {
        start: liveStreamStart,
        end: liveStreamEnd,
      })
    ) {
      setIsLive(true);
    }

    // The current time is before the Live Stream STARTS, so we need to trigger the state to enable the label when it's live
    if (isBefore(now, liveStreamStart)) {
      setComingUp(true);
      timeouts.push(
        setTimeout(() => {
          setComingUp(false);
          setIsLive(true);
        }, differenceInMilliseconds(liveStreamStart, now))
      );
    }

    // The current time is before the Live Stream ENDS, so we need to trigger the state to disable the label when it's no longer live
    if (isBefore(now, liveStreamEnd)) {
      timeouts.push(
        setTimeout(() => {
          setIsLive(false);
        }, differenceInMilliseconds(liveStreamEnd, now))
      );
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [start, durationInSeconds, id]);

  return { status: isLive ? 'isLive' : comingUp ? 'comingUp' : null };
};

export default useLivestreamStatus;
