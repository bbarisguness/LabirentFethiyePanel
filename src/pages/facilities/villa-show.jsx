/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet, useParams } from 'react-router-dom';


// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project-imports
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { APP_DEFAULT_PATH } from 'config';

// assets
import { Profile, Calendar, DollarCircle, Image, Folder, ClipboardText, ArchiveTick } from 'iconsax-react';
import { GetVilla, GetVillaName } from 'services/villaServices';

// ==============================|| PROFILE - ACCOUNT ||============================== //

export default function VillaShow() {
    const { pathname } = useLocation();
    const params = useParams();

    let selectedTab = 0;
    let breadcrumbTitle = '';
    let breadcrumbHeading = '';
    if (pathname.indexOf('summary') != -1) {
        selectedTab = 0;
    } else if (pathname.indexOf('reservation') != -1) {
        selectedTab = 1;
    } else if (pathname.indexOf('price') != -1) {
        selectedTab = 2;
    } else if (pathname.indexOf('gallery') != -1) {
        selectedTab = 3;
    } else if (pathname.indexOf('file') != -1) {
        selectedTab = 4;
    }
    // switch (pathname) {
    //     case '/apps/profiles/account/personal':
    //         breadcrumbTitle = 'Personal';
    //         breadcrumbHeading = 'Personal';
    //         selectedTab = 1;
    //         break;
    //     case '/apps/profiles/account/my-account':
    //         breadcrumbTitle = 'My Account';
    //         breadcrumbHeading = 'My Account';
    //         selectedTab = 2;
    //         break;
    //     case '/apps/profiles/account/password':
    //         breadcrumbTitle = 'Change Password';
    //         breadcrumbHeading = 'Change Password';
    //         selectedTab = 3;
    //         break;
    //     case '/apps/profiles/account/role':
    //         breadcrumbTitle = 'Role';
    //         breadcrumbHeading = 'Accountant';
    //         selectedTab = 4;
    //         break;
    //     case '/apps/profiles/account/settings':
    //         breadcrumbTitle = 'Settings';
    //         breadcrumbHeading = 'Account Settings';
    //         selectedTab = 5;
    //         break;
    //     case '/apps/profiles/account/basic':
    //     default:
    //         breadcrumbTitle = 'Basic';
    //         breadcrumbHeading = 'Basic Account';
    //         selectedTab = 0;
    // }

    const [value, setValue] = useState(selectedTab);
    const [villa, setVilla] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let breadcrumbLinks = [
        { title: 'Villa Yönetimi', to: '/facilities/villas-list' }
    ];
    if (selectedTab === 0) {
        breadcrumbLinks = [{ title: 'Villa Yönetimi', to: '/facilities/villas-list' }, { title: villa?.attributes.name, to: `/facilities/villas-show/${params.id}/summary` }, { title: 'Özet Bilgiler' }];
    }
    else if (selectedTab === 1) {
        breadcrumbLinks = [{ title: 'Villa Yönetimi', to: '/facilities/villas-list' }, { title: villa?.attributes.name, to: `/facilities/villas-show/${params.id}/summary` }, { title: 'Rezervasyonlar' }];
    }

    useEffect(() => {
        if (pathname === `/facilities/villas-show/${params.id}/summary`) {
            setValue(0);
        }
    }, [pathname]);

    

    useEffect(() => {
        if (params.id > 1)
            GetVillaName(params.id).then((res) => setVilla(res.data))
    }, [])



    return (
        <>
            <Breadcrumbs custom links={breadcrumbLinks} />
            <MainCard border={false}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
                        <Tab label="Özet Bilgiler" component={Link} to={`/facilities/villas-show/${params.id}/summary`} icon={<Profile />} iconPosition="start" />
                        <Tab
                            label="Rezervasyonlar"
                            component={Link}
                            to={`/facilities/villas-show/${params.id}/reservation`}
                            icon={<Calendar />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Müsait Tarihler"
                            component={Link}
                            to={`/facilities/villas-show/${params.id}/available-date`}
                            icon={<ArchiveTick />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Fiyatlar"
                            component={Link}
                            to={`/facilities/villas-show/${params.id}/price`}
                            icon={<DollarCircle />}
                            iconPosition="start"
                        />
                        <Tab
                            label="İçerik Yönetimi"
                            component={Link}
                            to={`/facilities/villas-show/${params.id}/content`}
                            icon={<ClipboardText />}
                            iconPosition="start"
                        />
                        <Tab label="Galeri" component={Link} to={`/facilities/villas-show/${params.id}/gallery`} icon={<Image />} iconPosition="start" />
                        <Tab label="Dosyalar" component={Link} to={`/facilities/villas-show/${params.id}/file`} icon={<Folder />} iconPosition="start" />
                    </Tabs>
                </Box>
                <Box sx={{ mt: 2.5 }}>
                    <Outlet />
                </Box>
            </MainCard>
        </>
    );
}
