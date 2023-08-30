import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const SideNavBarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        Link: "/dashboard"
    },
    {
        title: "Explore",
        icon: <ExploreIcon />,
        Link: "/explore"
    },
    {
        title: "Account",
        icon: <AccountCircleIcon />,
        Link: "/account"
    }
]

