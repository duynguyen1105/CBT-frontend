import React, { FC, useState } from 'react';
import Notification from './Notification';
import Setting from './Setting';

const NotificationContainer: FC = () => {

  const [ currentPane, setCurrentPane ] = useState<string>('notification');

  const handleClickNotiPane = () => setCurrentPane('setting');

  const handleClickBack = () => setCurrentPane('notification');

  if (currentPane === 'setting') {
    return (
      <Setting onClickBack={handleClickBack} />
    );
  }

  return (
    <Notification
      onClickSetting={handleClickNotiPane}
    />
  );

}

NotificationContainer.displayName = 'Header.Notification.Container';
export default NotificationContainer;