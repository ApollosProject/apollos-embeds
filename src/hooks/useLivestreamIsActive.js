/**
 * useLivestreamIsActive.js
 *
 * Hook that will manage the timers and report on the status of a Livestream.
 *
 * note : this hook will note fetch the livestream data
 */

import { useState, useEffect } from 'react';
import {
  isWithinInterval,
  isBefore,
  differenceInMilliseconds,
  addSeconds,
  parseISO,
  isValid,
} from 'date-fns';

const useLivestreamIsActive = (livestream) => {
  const id = livestream?.id;
  const start = livestream?.start;
  const durationInSeconds = livestream?.durationInSeconds;
  const [isLive, setIsLive] = useState(false);

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
      timeouts.push(
        setTimeout(() => {
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

  return isLive;
};

export default useLivestreamIsActive;
