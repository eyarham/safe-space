import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import AdjustIcon from '@mui/icons-material/Adjust';

import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Reports from '../reports/Reports';
import Users from '../user/Users';
import Submissions from './Submissions';
import NewIcon from '../utils/NewIcon';
import React, { useEffect, useState } from 'react';
import { hasUnreviewedSub as hasUnreviewedReports } from '../reports/api';
import { hasUnreviewedSub as hasUnreviewedSpaces} from '../spaces/api';
import Reviews from '../reviews/Reviews';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ModerateTabs() {
  const [value, setValue] = useState(0);
  const [newSubs, setNewSubs] = useState(0);
  const [newReports, setNewReports] = useState(0);
  const [newReviews, setNewReviews] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
useEffect(()=>{
  hasUnreviewedReports(setNewReports);
  hasUnreviewedSpaces(setNewSubs)
  setNewReviews(false);
},[])
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="users" {...a11yProps(0)} />
          <Tab label="spaces" {...a11yProps(1)} icon={newSubs ? <NewIcon />: ''} iconPosition="end"/>
          <Tab label="reports" {...a11yProps(2)} icon={newReports ? <NewIcon />: ''} iconPosition="end"/>
          <Tab label="reviews" {...a11yProps(3)} icon={newReviews ? <NewIcon />: ''} iconPosition="end"/>
        </Tabs>

      </Box>
      <TabPanel value={value} index={0}>
        <Users />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Submissions /><AdjustIcon sx={{ color: 'orange', fill: 'currentcolor' }} ></AdjustIcon>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Reports />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Reviews />
      </TabPanel>
    </Box>
  );
}