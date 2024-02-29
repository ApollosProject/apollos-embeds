import React from 'react';
import { ArrowSquareOut, MapPin, CalendarPlus, Clock } from '@phosphor-icons/react';
import {
  Container,
  IconContainer,
  LineItem,
  SeparatorContainer,
  Details,
  ActionIcon,
} from './EventBlockFeature.styles';
import { addSeconds, isSameDay, parseISO } from 'date-fns';

import { useTheme } from 'styled-components';
import AddToCalendar from '../../AddToCalendar';
import { BodyText } from '../../../ui-kit';

function eventTimestampLines({ start, duration, allDay }) {
  const startDate = parseISO(start);
  const endDate = addSeconds(startDate, duration);

  // native JS .toLocaleDateString() coming in clutch!

  if (allDay) {
    // For all-day events
    if (isSameDay(startDate, endDate) || duration === 0) {
      // If the event ends on the same day or has no duration
      // e.g. "Wednesday June 24, 2024"
      return [
        startDate.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      ];
    } else {
      // For multi-day all-day events
      // e.g. "Wednesday June 24 to", "Sunday June 28, 2024"
      return [
        `${startDate.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}`,
        `to ${endDate.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}`,
      ];
    }
  } else {
    // For events with specific times
    if (isSameDay(startDate, endDate)) {
      // If the event starts and ends on the same day
      // e.g. "Wednesday June 24, 2024", "9:00am to 4:00pm CST"
      return [
        startDate.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        `${startDate.toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: 'numeric',
        })} to ${endDate.toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short',
        })}`,
      ];
    } else {
      // For events that span multiple days
      // e.g. "Wednesday June 24, 2024 5:00am to Sunday June 28, 2024 7:00pm CST"
      return [
        `${startDate.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}`,
        `to ${endDate.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short',
        })}`,
      ];
    }
  }
}

// convert address html to google map link
function convertAddressToGoogleMapLink(html) {
  const address = (html || '').replace(/<[^>]+>/g, ' ');
  if (address.startsWith('http')) return address; // handle links
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

const EventBlockFeature = ({ feature }) => {
  const { allDay, start, duration, location, title } = feature;
  const timelines = eventTimestampLines({ start, duration, allDay });
  const theme = useTheme();

  return (
    <Container>
      <LineItem>
        <IconContainer>
          <Clock size={24} fill={theme.colors.base.primary} weight="fill" />
        </IconContainer>
        <SeparatorContainer last={!location}>
          <Details>
            <BodyText>{timelines[0]}</BodyText>
            {timelines[1] ? <BodyText color="text.secondary">{timelines[1]}</BodyText> : undefined}
          </Details>
          <AddToCalendar
            allDay={allDay}
            start={start}
            duration={duration}
            location={location}
            title={title}
          />
        </SeparatorContainer>
      </LineItem>
      {location ? (
        <LineItem>
          <IconContainer>
            <MapPin size={24} fill={theme.colors.base.primary} weight="fill" />
          </IconContainer>
          <SeparatorContainer last>
            <Details>
              <BodyText dangerouslySetInnerHTML={{ __html: location }} />
            </Details>
            <ActionIcon href={convertAddressToGoogleMapLink(location)} target="blank">
              <ArrowSquareOut className="h-5 w-5" weight="bold" />
            </ActionIcon>
          </SeparatorContainer>
        </LineItem>
      ) : null}
    </Container>
  );
};

export default EventBlockFeature;
