import React, { useState } from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box, H3 } from '../../../ui-kit';
import Styled from './PrayerListFeature.styles';
import { Plus, X } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { backgroundColor, textColor } from 'styled-system';

function PrayerListFeature(props = {}) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    requestor: {},
    prayer: 'N/A',
  });

  const openModal = (requestor, prayer) => {
    setModalState({ isOpen: true, requestor, prayer });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, requestor: {}, prayer: 'N/A' });
  };

  // Takes in first and last name and makes them into capitalized initials
  function combineAndCapitalizeNames(firstName, lastName) {
    if (firstName === null && lastName === null) {
      return 'NA';
    }
    const capitalizedFirstName =
      firstName === null
        ? ''
        : firstName.charAt(0).toUpperCase() + firstName.slice(1);

    const capitalizedLastName =
      lastName === null
        ? ''
        : lastName.charAt(0).toUpperCase() + lastName.slice(1);

    const combinedNames =
      capitalizedFirstName.charAt(0) + capitalizedLastName.charAt(0);

    return combinedNames;
  }

  // Generate random background color
  function randomHSLA() {
    return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`;
  }

  const PrayerItemModal = ({ item, onClose }) => {
    console.log(item);
    if (!item.isOpen) return null;
    const backgroundColor = randomHSLA();

    return (
      <Styled.ModalWrapper isOpen={item.isOpen} onClick={onClose}>
        <Styled.ModalContent onClick={(e) => e.stopPropagation()}>
          <Styled.ModalIcon onClick={onClose}>
            <X size={16} weight="bold" />
          </Styled.ModalIcon>
          <Box width="100%" display="flex" justifyContent="center">
            {item.requestor?.photo !== null ? (
              <Styled.Avatar>
                <Styled.Image src={item.requestor?.photo?.uri} />
              </Styled.Avatar>
            ) : (
              <Styled.Avatar backgroundColor={backgroundColor}>
                <H3>
                  {combineAndCapitalizeNames(
                    item.requestor?.firstName,
                    item.requestor?.lastName
                  )}
                </H3>
              </Styled.Avatar>
            )}
          </Box>
          <Box fontWeight="600" py="xs">
            Pray For {item.requestor.firstName}
          </Box>
          <Box>{item.prayer}</Box>
        </Styled.ModalContent>
      </Styled.ModalWrapper>
    );
  };

  //Is this needed?
  const AddDailyPrayer = (
    <Box
      position="relative"
      display="inline-block"
      padding="2px 5px"
      onClick={openModal}
    >
      <Styled.Avatar>
        <Plus size={36} />
      </Styled.Avatar>
      <Styled.Notification />
    </Box>
  );

  return (
    <Box>
      <Styled.List>
        {AddDailyPrayer}
        {props.feature?.prayers?.map((item) => {
          const backgroundColor = randomHSLA();
          const Avatar =
            item.requestor?.photo !== null ? (
              <Styled.Avatar>
                <Styled.Image src={item.requestor?.photo?.uri} />
              </Styled.Avatar>
            ) : (
              <Styled.Avatar backgroundColor={backgroundColor}>
                <H3>
                  {combineAndCapitalizeNames(
                    item.requestor?.firstName,
                    item.requestor?.lastName
                  )}
                </H3>
              </Styled.Avatar>
            );
          return (
            <Box onClick={() => openModal(item?.requestor, item?.text)}>
              {Avatar}
            </Box>
          );
        })}
      </Styled.List>
      <PrayerItemModal item={modalState} onClose={closeModal} />
    </Box>
  );
}

PrayerListFeature.propTypes = {
  ...systemPropTypes,
};

export default PrayerListFeature;
