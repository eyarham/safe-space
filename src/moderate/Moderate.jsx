import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../user/UserContextProvider';
import Users from '../user/Users';
import ModerateTabs from './ModerateTabs';

const Moderate = () => {
  const [isModerator, setIsModerator] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.data().isModerator) { setIsModerator(true) }
  }, [user]);
  if (!isModerator) return (<div>you are not authorized to view this page.</div>)

  return (
    <div>
      <h2>Moderate</h2>
      <ModerateTabs >
        <Users tabName="users" />
      </ModerateTabs>
    </div>
  )
}

export default Moderate