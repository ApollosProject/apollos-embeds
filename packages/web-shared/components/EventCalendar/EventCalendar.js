import React from "react";
import {PhospherIcon, system, utils} from "../../ui-kit";
import styled, {withTheme} from "styled-components";
import TypeStyles from "../../ui-kit/Typography/_typeStyles";


const BodyText = withTheme(styled.p`
  ${TypeStyles.BodyText}
  ${system}
  font-size: ${utils.rem('15px')};
`);

const InfoDivider = () => (
  <BodyText color="text.tertiary" mx="xs" display={{ xs: 'none', sm: 'block' }}>
    |
  </BodyText>
);

const CalendarIconWrapper = styled.span`
  margin-right: ${({ theme }) => theme.space.xxs};
  display: inline-flex;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const CalendarIcon = ({ name }) => (
  <CalendarIconWrapper>
    <PhospherIcon name={name} />
  </CalendarIconWrapper>
);

const FlexBodyText = styled(BodyText)`
  display: flex;
  align-items: center;
`;

const EventCalendar = ({ start, end, location }) =>{
  return (
    <>
      {location ? (
        <FlexBodyText color="text.secondary" mb={'xxs'}>
          <CalendarIcon name="globe" />
          {location}
        </FlexBodyText>
      ) : null}
      {start && location ? <InfoDivider/> : null}
      {start ? (
        <FlexBodyText color="text.secondary" mb={'xxs'}>
          <CalendarIcon name="calendar" />
          {start}
        </FlexBodyText>
      ) : null}
      {end && start ? <InfoDivider/> : null}
      {end ? (
        <FlexBodyText color="text.secondary" mb={'xxs'}>
          <CalendarIcon name="clock" />
          {end}
        </FlexBodyText>
      ) : null}
    </>
  );
}

export default EventCalendar;