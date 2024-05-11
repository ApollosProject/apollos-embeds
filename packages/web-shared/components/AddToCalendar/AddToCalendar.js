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

const AddToCalendar = ({ start, duration, allDay, location, title = 'Event', icsUrl }) => {
  return (
    <Menu as="div" style={{ position: 'relative' }}>
      <ActionIcon>
        <CalendarPlus size={16} weight="bold" />
      </ActionIcon>
      <List>
        {icsUrl ? (
          <Menu.Item>
            <MenuLink href={icsUrl}>
              <AppleLogo size={14} weight="fill" />
              &nbsp;Apple Calendar
            </MenuLink>
          </Menu.Item>
        ) : null}
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
        {icsUrl ? (
          <Menu.Item>
            <MenuLink href={icsUrl} target="blank">
              <FileArrowDown size={14} weight="fill" />
              &nbsp;Download .ics
            </MenuLink>
          </Menu.Item>
        ) : null}
      </List>
    </Menu>
  );
};

export default AddToCalendar;
