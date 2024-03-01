import React from 'react';
import { Menu } from '@headlessui/react';
import {
  CalendarPlus,
  AppleLogo,
  GoogleLogo,
  MicrosoftOutlookLogo,
  FileArrowDown,
} from '@phosphor-icons/react';
import { ActionIcon, List, MenuLink } from './AddToCalendar.styles';
import { addSeconds, parseISO } from 'date-fns';

function convertToIcsLink({ start, duration, location, allDay, title }) {
  const startDate = parseISO(start);
  const endDate = addSeconds(startDate, duration);
  const startDateString = startDate.toISOString().replace(/-|:|\.\d+/g, '');
  const endDateString = endDate.toISOString().replace(/-|:|\.\d+/g, '');
  const locationString = (location || '').replace(/<[^>]+>/g, ' ');
  return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDateString}
DTEND:${endDateString}
SUMMARY:${title}
LOCATION:${locationString}
END:VEVENT
END:VCALENDAR`;
}

function convertToGoogleLink({ start, duration, location, allDay, title }) {
  const startDate = parseISO(start);
  const endDate = addSeconds(startDate, duration);
  const startDateString = startDate.toISOString().replace(/-|:|\.\d+/g, '');
  const endDateString = endDate.toISOString().replace(/-|:|\.\d+/g, '');
  const locationString = (location || '').replace(/<[^>]+>/g, ' ');
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateString}/${endDateString}&location=${locationString}`;
}

function convertToOutlookLink({ start, duration, location, allDay, title }) {
  const startDate = parseISO(start);
  const endDate = addSeconds(startDate, duration);
  const startDateString = startDate.toISOString().replace(/-|:|\.\d+/g, '');
  const endDateString = endDate.toISOString().replace(/-|:|\.\d+/g, '');
  const locationString = (location || '').replace(/<[^>]+>/g, ' ');
  return `https://outlook.live.com/calendar/action/compose&rru=addevent&startdt=${startDateString}&enddt=${endDateString}&subject=${title}&location=${locationString}`;
}

const AddToCalendar = ({ start, duration, allDay, location, title = 'Event' }) => {
  return (
    <Menu as="div" style={{ position: 'relative' }}>
      <ActionIcon>
        <CalendarPlus size={16} weight="bold" />
      </ActionIcon>
      <List>
        <Menu.Item>
          <MenuLink href={convertToIcsLink({ start, duration, allDay, location, title })}>
            <AppleLogo size={14} weight="fill" />
            &nbsp;Apple Calendar
          </MenuLink>
        </Menu.Item>
        <Menu.Item>
          <MenuLink
            href={convertToGoogleLink({ start, duration, allDay, location, title })}
            target="blank"
          >
            <GoogleLogo size={14} weight="fill" />
            &nbsp;Google Calendar
          </MenuLink>
        </Menu.Item>
        <Menu.Item>
          <MenuLink
            href={convertToOutlookLink({ start, duration, allDay, location, title })}
            target="blank"
          >
            <MicrosoftOutlookLogo size={14} weight="fill" />
            &nbsp;Microsoft Outlook
          </MenuLink>
        </Menu.Item>
        <Menu.Item>
          <MenuLink
            href={convertToIcsLink({ start, duration, allDay, location, title })}
            target="blank"
          >
            <FileArrowDown size={14} weight="fill" />
            &nbsp;Download .ics
          </MenuLink>
        </Menu.Item>
      </List>
    </Menu>
  );
};

export default AddToCalendar;
